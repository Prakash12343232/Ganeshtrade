import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, MessageCircle, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Cart', path: '/order' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white border-b border-gray-100 py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-white font-black text-xl">G</span>
                        </div>
                        <div>
                            <span className="text-xl font-black text-gray-900 block leading-none">Ganesh Trades</span>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Kirana Shop</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-bold transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-500'}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link to="/order" className="relative p-3 bg-gray-100 rounded-full hover:bg-primary/5 transition-colors group">
                            <ShoppingCart className={`w-6 h-6 transition-colors group-hover:text-primary ${location.pathname === '/order' ? 'text-primary' : 'text-gray-600'}`} />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white">{cartCount}</span>
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-gray-400 uppercase leading-none">Hello,</span>
                                    <span className="text-xs font-black text-gray-900">{user?.mobileNumber}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-3 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-primary py-2.5 px-6 text-sm">
                                <UserIcon className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Right */}
                    <div className="md:hidden flex items-center gap-3">
                        <Link to="/order" className="relative p-2.5 bg-gray-100 rounded-full">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white">{cartCount}</span>
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-1">
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {isAuthenticated && (
                                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <UserIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Welcome</p>
                                        <p className="font-black text-gray-900">{user?.mobileNumber}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block text-xl font-black transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-gray-400'}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                                {!isAuthenticated ? (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="btn-primary w-full py-4"
                                    >
                                        <UserIcon className="w-5 h-5" />
                                        <span>Login / Cleanup</span>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="btn-call w-full py-4 border-red-100 bg-red-50 text-red-500 hover:bg-red-100"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
