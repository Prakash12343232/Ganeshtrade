import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { Phone, CheckCircle, Clock, Truck, MessageCircle, CreditCard, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const AdminOrders = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialFilter = queryParams.get('filter') || 'All';

    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState(initialFilter);
    const { token } = useAuth();

    useEffect(() => { fetchOrders(); }, []);

    const fetchOrders = async () => {
        const res = await fetch(`${API_URL}/api/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
    };

    const updateOrder = async (id, updates) => {
        await fetch(`${API_URL}/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(updates)
        });
        fetchOrders();
    };

    const sendWhatsApp = (order, type) => {
        const mobile = `91${order.user.mobileNumber}`;
        let message = '';

        switch (type) {
            case 'accept':
                message = `Namaste! Aapka Ganesh Trades ka order accept ho gaya hai. Hum jald hi delivery karenge. Dhanyawad!`;
                break;
            case 'deliver':
                message = `Namaste! Aapka order deliver ho gaya hai. Asha hai aapko sab pasand aaya hoga. Phir milenge! - Ganesh Trades`;
                break;
            case 'reminder':
                message = `Namaste! Aapka ₹${order.totalAmount} ka payment pending hai. Kripya ise jald hi pay kar dein. Dhanyawad! - Ganesh Trades`;
                break;
            default: message = `Hello! Connecting from Ganesh Trades.`;
        }

        window.open(`https://wa.me/${mobile}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const filteredOrders = orders.filter(o => {
        if (filter === 'udhari') return o.status === 'Delivered' && o.paymentStatus === 'Pending';
        if (filter === 'All') return true;
        return o.status === filter;
    });

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <div className="ml-64 p-8 w-full">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Orders & Udhaari</h1>
                        <p className="text-gray-500 font-bold">Manage customer orders and track payments.</p>
                    </div>
                    <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                        {['All', 'Pending', 'Delivered', 'udhari'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {f === 'udhari' ? 'Pending Payments' : f}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="space-y-6">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 italic font-bold text-gray-400">
                            No orders matching this filter.
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-10 items-start hover:border-primary/20 transition-all">
                                <div className="flex-grow w-full">
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                                            {order.status}
                                        </span>
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.paymentStatus === 'Pending' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {order.paymentStatus === 'Pending' ? 'Payment Unpaid' : 'Payment Received'}
                                        </span>
                                        <span className="text-gray-300 text-xs font-bold ml-auto">{new Date(order.createdAt).toLocaleString()}</span>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                            +91 {order.user?.mobileNumber}
                                            <button onClick={() => sendWhatsApp(order, 'default')} className="text-[#25D366] hover:scale-110 transition-transform">
                                                <MessageCircle size={24} fill="#25D366" strokeWidth={0} />
                                            </button>
                                        </h3>
                                        <p className="text-gray-400 font-bold text-sm mt-1">{order.items.length} items ordered</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-50 mb-6">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-xs font-bold">
                                                <span className="text-gray-500">{item.name} x {item.quantity} {item.unit}</span>
                                                <span className="text-gray-900 font-black">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grand Total</p>
                                            <p className="text-3xl font-black text-primary">₹{order.totalAmount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Practical Admin Actions */}
                                <div className="w-full lg:w-72 space-y-3 p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Shop Action</p>

                                    {order.status === 'Pending' && (
                                        <button
                                            onClick={() => { updateOrder(order._id, { status: 'Accepted' }); sendWhatsApp(order, 'accept'); }}
                                            className="w-full bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary/20 font-black py-4 rounded-2xl transition-all text-xs uppercase shadow-sm"
                                        >
                                            Accept & Msg WhatsApp
                                        </button>
                                    )}

                                    {order.status === 'Accepted' && (
                                        <button
                                            onClick={() => { updateOrder(order._id, { status: 'Delivered' }); sendWhatsApp(order, 'deliver'); }}
                                            className="w-full bg-green-600 text-white font-black py-4 rounded-2xl transition-all text-xs uppercase shadow-lg shadow-green-100"
                                        >
                                            Complete Delivery
                                        </button>
                                    )}

                                    {order.status === 'Delivered' && order.paymentStatus === 'Pending' && (
                                        <button
                                            onClick={() => sendWhatsApp(order, 'reminder')}
                                            className="w-full bg-red-600 text-white font-black py-4 rounded-2xl transition-all text-xs uppercase shadow-lg shadow-red-100 flex items-center justify-center gap-2"
                                        >
                                            <AlertCircle size={16} /> Send Udhaari Msg
                                        </button>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <button
                                            onClick={() => updateOrder(order._id, { paymentStatus: 'Paid' })}
                                            className={`p-4 rounded-2xl flex flex-col items-center gap-1 border-2 transition-all ${order.paymentStatus === 'Paid' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-100 text-gray-400 hover:border-blue-100'}`}
                                        >
                                            <CreditCard size={18} />
                                            <span className="text-[8px] font-black uppercase">Mark Paid</span>
                                        </button>
                                        <a
                                            href={`tel:+91${order.user?.mobileNumber}`}
                                            className="p-4 bg-black text-white rounded-2xl flex flex-col items-center gap-1 hover:bg-gray-800 transition-all font-black"
                                        >
                                            <Phone size={18} />
                                            <span className="text-[8px] uppercase font-black">Normal Call</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
