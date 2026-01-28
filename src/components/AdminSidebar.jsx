import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { name: 'Daily Report', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'All Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
        { name: 'Pending Payments', path: '/admin/orders?filter=udhari', icon: <CreditCard size={20} /> },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 flex flex-col p-6 z-50">
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-primary/20">G</div>
                <div>
                    <h2 className="text-lg font-black text-gray-900 leading-none">Admin Shop</h2>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Management</p>
                </div>
            </div>

            <nav className="flex-grow space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${location.pathname + location.search === item.path || (location.pathname === item.path && item.path === '/admin')
                                ? 'bg-primary/5 text-primary'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="pt-6 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 p-4 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
                >
                    <LogOut size={20} />
                    <span>Logout Shop</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
