import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', unit: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const { token } = useAuth();

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId ? `${API_URL}/api/products/${editingId}` : `${API_URL}/api/products`;
        const method = editingId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setShowModal(false);
            setFormData({ name: '', category: '', price: '', unit: '', description: '' });
            setEditingId(null);
            fetchProducts();
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        await fetch(`${API_URL}/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchProducts();
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <div className="ml-64 p-8 w-full">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Manage Inventory</h1>
                        <p className="text-gray-500 font-bold">Add, Edit or Remove items from your store.</p>
                    </div>
                    <button
                        onClick={() => { setEditingId(null); setFormData({ name: '', category: '', price: '', unit: '', description: '' }); setShowModal(true); }}
                        className="btn-primary"
                    >
                        <Plus size={20} />
                        <span>Add New Item</span>
                    </button>
                </header>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <th className="px-8 py-6">Item Details</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Price</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((p) => (
                                <tr key={p._id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                                            <div>
                                                <p className="font-bold text-gray-900 leading-none mb-1">{p.name}</p>
                                                <p className="text-[10px] font-black text-gray-400">{p.unit}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-500">{p.category}</td>
                                    <td className="px-8 py-6 font-black text-primary text-xl">₹{p.price}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setEditingId(p._id); setFormData(p); setShowModal(true); }}
                                                className="p-3 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 rounded-xl text-gray-400 hover:text-primary transition-all"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="p-3 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 rounded-xl text-gray-400 hover:text-red-500 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900">
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-black text-gray-900 mb-8">{editingId ? 'Update Item' : 'New Kirana Item'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Product Name</label>
                                    <input required className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/40 font-bold" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Category</label>
                                    <select required className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/40 font-bold" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="">Select</option>
                                        <option value="Rice / Atta / Dal">Rice / Atta / Dal</option>
                                        <option value="Oil / Ghee">Oil / Ghee</option>
                                        <option value="Masala">Masala</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Daily Essentials">Daily Essentials</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Unit (e.g. 1kg)</label>
                                    <input required className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/40 font-bold" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Price (₹)</label>
                                    <input type="number" required className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/40 font-black text-2xl text-primary" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                            </div>
                            <button type="submit" className="w-full btn-primary py-5 rounded-[1.5rem] mt-4 font-black tracking-widest uppercase">
                                {editingId ? 'Update Inventory' : 'Add to Catalog'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
