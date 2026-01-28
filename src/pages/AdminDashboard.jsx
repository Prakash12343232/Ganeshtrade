import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { ShoppingBag, Users, IndianRupee, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ todayOrders: 0, pendingOrders: 0, totalSales: 0, totalCustomers: 0, pendingPayments: 0 });
    const { token } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/admin/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setStats(data);
            } catch (e) { console.error('Stats fail', e); }
        };
        fetchStats();
    }, [token]);

    const statCards = [
        { name: "Today's Orders", value: stats.todayOrders, icon: <ShoppingBag />, color: 'bg-primary' },
        { name: "Today's Sales", value: `₹${stats.totalSales}`, icon: <TrendingUp />, color: 'bg-green-600' },
        { name: "Pending Payments", value: stats.pendingPayments, icon: <AlertCircle />, color: 'bg-red-500' },
        { name: "Total Customers", value: stats.totalCustomers, icon: <Users />, color: 'bg-blue-600' },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <div className="ml-64 p-8 w-full">
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-gray-900">Vyapaar Dashboard</h1>
                    <p className="text-gray-500 font-bold">Monitor your daily kirana sales and payments.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((card, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
                            <div className={`${card.color} text-white p-4 rounded-2xl shadow-lg ring-4 ring-gray-50`}>
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{card.name}</p>
                                <p className="text-2xl font-black text-gray-900 leading-none">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Today's Sales Box */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 mb-2">Today's Sales Summary</h2>
                            <p className="text-gray-400 text-sm font-bold mb-8">Everything sold since 8:00 AM.</p>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="space-y-1">
                                <p className="text-4xl font-black text-primary">₹{stats.totalSales}</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Value</p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <div className="text-right">
                                    <p className="text-2xl font-black text-gray-900">{stats.todayOrders}</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Orders Handled</p>
                                </div>
                                <button
                                    onClick={() => alert(`Report for Today:\nTotal Sales: ₹${stats.totalSales}\nTotal Orders: ${stats.todayOrders}`)}
                                    className="text-[10px] font-black text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5 transition-all"
                                >
                                    Download Summary
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pending Payments Alert */}
                    <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                                    <AlertCircle size={20} />
                                </div>
                                <h2 className="text-xl font-black text-red-900">Check Udhaari</h2>
                            </div>
                            <p className="text-red-700/60 text-sm font-bold mb-8">You have items delivered but not paid yet.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-4xl font-black text-red-600">{stats.pendingPayments}</p>
                            <button
                                onClick={() => window.location.href = '/admin/orders?filter=udhari'}
                                className="bg-red-600 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                            >
                                View List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
