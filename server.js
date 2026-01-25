import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const ADMIN_MOBILE = "9999999999";
const otpStore = new Map();

// --- IN-MEMORY FALLBACK DB ---
let db = {
    users: [],
    products: [
        { _id: "1", name: "Aashirvaad Atta", category: "Rice / Atta / Dal", price: 380, unit: "10kg", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop", description: "Fresh Atta" },
        { _id: "2", name: "Fortune Oil", category: "Oil / Ghee", price: 145, unit: "1L", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=400&auto=format&fit=crop", description: "Refined Oil" }
    ],
    orders: []
};

let useMongoDB = false;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        useMongoDB = true;
    })
    .catch(err => {
        console.warn('⚠️ MongoDB not detected. Switching to MOCK MODE.');
    });

// --- MIDDLEWARES ---
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

const adminOnly = (req, res, next) => {
    if (req.user.mobileNumber !== ADMIN_MOBILE) return res.status(403).json({ message: 'Admin access denied' });
    next();
};

// --- ROUTES ---

app.post('/api/send-otp', (req, res) => {
    const { mobileNumber } = req.body;
    const otp = '1234';
    otpStore.set(mobileNumber, { otp, expires: Date.now() + 5 * 60 * 1000 });
    res.status(200).json({ message: 'OTP sent (1234)' });
});

app.post('/api/verify-otp', async (req, res) => {
    const { mobileNumber, otp } = req.body;
    const stored = otpStore.get(mobileNumber);
    if (!stored || stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    otpStore.delete(mobileNumber);

    try {
        let user;
        if (useMongoDB) {
            user = await User.findOne({ mobileNumber });
            if (!user) { user = new User({ mobileNumber }); await user.save(); }
        } else {
            user = db.users.find(u => u.mobileNumber === mobileNumber);
            if (!user) { user = { _id: Date.now().toString(), mobileNumber }; db.users.push(user); }
        }
        const token = jwt.sign({ userId: user._id, mobileNumber: user.mobileNumber }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token, user, isAdmin: mobileNumber === ADMIN_MOBILE });
    } catch (e) { res.status(500).json({ message: 'Error during login' }); }
});

app.get('/api/products', async (req, res) => {
    if (useMongoDB) res.json(await Product.find());
    else res.json(db.products);
});

app.post('/api/products', authenticate, adminOnly, async (req, res) => {
    if (useMongoDB) { const p = new Product(req.body); await p.save(); res.json(p); }
    else { const p = { ...req.body, _id: Date.now().toString() }; db.products.push(p); res.json(p); }
});

app.delete('/api/products/:id', authenticate, adminOnly, async (req, res) => {
    if (useMongoDB) { await Product.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
    else { db.products = db.products.filter(p => p._id !== req.params.id); res.json({ message: 'Deleted' }); }
});

// Orders
app.post('/api/orders', authenticate, async (req, res) => {
    if (useMongoDB) { const o = new Order({ ...req.body, user: { mobileNumber: req.user.mobileNumber } }); await o.save(); res.json(o); }
    else { const o = { ...req.body, _id: Date.now().toString(), status: 'Pending', paymentStatus: 'Pending', createdAt: new Date(), user: { mobileNumber: req.user.mobileNumber } }; db.orders.push(o); res.json(o); }
});

app.get('/api/orders', authenticate, adminOnly, async (req, res) => {
    if (useMongoDB) res.json(await Order.find().sort({ createdAt: -1 }));
    else res.json([...db.orders].sort((a, b) => b.createdAt - a.createdAt));
});

app.patch('/api/orders/:id', authenticate, adminOnly, async (req, res) => {
    const { status, paymentStatus } = req.body;
    if (useMongoDB) {
        const o = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(o);
    } else {
        const o = db.orders.find(ord => ord._id === req.params.id);
        if (o) {
            if (status) o.status = status;
            if (paymentStatus) o.paymentStatus = paymentStatus;
        }
        res.json(o);
    }
});

// Admin Stats
app.get('/api/admin/stats', authenticate, adminOnly, async (req, res) => {
    if (useMongoDB) {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const orderCount = await Order.countDocuments({ createdAt: { $gte: today } });
        const pendingOrders = await Order.countDocuments({ status: 'Pending' });
        const totalSales = await Order.aggregate([{ $match: { createdAt: { $gte: today }, status: { $ne: 'Cancelled' } } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]);
        const pendingPayments = await Order.countDocuments({ status: 'Delivered', paymentStatus: 'Pending' });
        res.json({
            todayOrders: orderCount,
            pendingOrders,
            totalSales: totalSales[0]?.total || 0,
            totalCustomers: await User.countDocuments(),
            pendingPayments
        });
    } else {
        const today = new Date().toDateString();
        const todayOrders = db.orders.filter(o => new Date(o.createdAt).toDateString() === today);
        res.json({
            todayOrders: todayOrders.length,
            pendingOrders: db.orders.filter(o => o.status === 'Pending').length,
            totalSales: todayOrders.filter(o => o.status !== 'Cancelled').reduce((a, b) => a + b.totalAmount, 0),
            totalCustomers: db.users.length,
            pendingPayments: db.orders.filter(o => o.status === 'Delivered' && o.paymentStatus === 'Pending').length
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
