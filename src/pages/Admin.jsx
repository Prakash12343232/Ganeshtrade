import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Package,
    ShoppingCart,
    Users,
    Plus,
    Search,
    Edit,
    Trash,
    LayoutDashboard,
    MoreVertical
} from 'lucide-react';
import { products } from '../data/products';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('products');

    const stats = [
        { title: 'Total Revenue', value: '₹1.2M', icon: <BarChart3 className="w-5 h-5" />, color: 'bg-orange-50 text-primary' },
        { title: 'New Orders', value: '48', icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
        { title: 'Catalog Size', value: products.length, icon: <Package className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
        { title: 'Active Users', value: '2.4k', icon: <Users className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    ];

    return (
        <div className="min-h-screen pb-20 bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-4 pt-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-4">
                            <LayoutDashboard className="text-primary w-8 h-8" />
                            Control <span className="text-primary italic">Panel</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Monitoring Ganesh Trades performance.</p>
                    </div>
                    <button className="btn-primary flex items-center space-x-3 py-4">
                        <Plus className="w-5 h-5" />
                        <span className="font-black">Inventory Plus</span>
                    </button>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl ${s.color}`}>
                                    {s.icon}
                                </div>
                                <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg">+14%</span>
                            </div>
                            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{s.title}</h3>
                            <p className="text-3xl font-black text-gray-900">{s.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex bg-white p-2 rounded-2xl border border-gray-100 mb-10 w-fit">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Live Orders
                    </button>
                </div>

                {/* Content Area */}
                {activeTab === 'products' ? (
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-6 bg-gray-50/50">
                            <div className="relative flex-grow lg:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Filter inventory..."
                                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/10 shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-50">
                                        <th className="px-8 py-6">Product Item</th>
                                        <th className="px-8 py-6">Category</th>
                                        <th className="px-8 py-6">Unit Price</th>
                                        <th className="px-8 py-6">Status</th>
                                        <th className="px-8 py-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map((p) => (
                                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-5">
                                                    <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                                                    <span className="font-bold text-gray-900">{p.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6"><span className="text-gray-500 font-medium text-sm">{p.category}</span></td>
                                            <td className="px-8 py-6 text-gray-900 font-black">₹{p.price}</td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full uppercase">Active</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end space-x-3">
                                                    <button className="p-3 hover:bg-white rounded-xl text-gray-400 hover:text-primary border border-transparent hover:border-gray-100 transition-all shadow-hover"><Edit className="w-4 h-4" /></button>
                                                    <button className="p-3 hover:bg-white rounded-xl text-gray-400 hover:text-red-500 border border-transparent hover:border-gray-100 transition-all shadow-hover"><Trash className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                        <div className="space-y-6">
                            {[1, 2, 3].map((order) => (
                                <div key={order} className="flex items-center justify-between p-8 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all group">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                            <ShoppingCart className="w-8 h-8 text-primary/40" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900">#G-TRD-492{order}</h4>
                                            <p className="text-gray-500 text-sm font-bold">Client: Aditi Sharma</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center space-x-12">
                                        <div className="hidden md:block text-right">
                                            <p className="text-gray-900 font-black text-xl">₹4,999</p>
                                            <p className="text-gray-400 text-[10px] font-black uppercase">Paid Online</p>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-white p-2 px-4 rounded-full border border-gray-100">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Packing</span>
                                        </div>
                                        <button className="p-3 text-gray-300 hover:text-gray-900 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
