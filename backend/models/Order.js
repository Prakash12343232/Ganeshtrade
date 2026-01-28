import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        mobileNumber: String,
        name: String,
        address: String,
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: Number,
            quantity: Number,
            unit: String,
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
