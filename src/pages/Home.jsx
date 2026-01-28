import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Clock, MapPin, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { API_URL } from '../config';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products`);
                const data = await res.json();
                setFeaturedProducts(data.slice(0, 5));
            } catch (e) { console.error(e); }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-primary/5 py-12 md:py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Welcome to Ganesh Trades</span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                            Fresh Groceries <br className="hidden md:block" /> Delivered to your <br /> <span className="text-primary italic">Doorstep.</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0">
                            Your neighborhood grocery shop for all daily essentials. Best quality, lowest prices.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/products" className="btn-primary py-4 px-10 text-lg">
                                <ShoppingBag className="w-5 h-5" />
                                <span>Shop Catalog</span>
                            </Link>
                            <a href="https://wa.me/919876543210" className="btn-whatsapp py-4 px-10 text-lg">
                                <MessageCircle className="w-5 h-5" />
                                <span>Quick Order</span>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-5 h-5 text-primary" />
                                <span className="text-sm font-bold">8:00 AM - 10:00 PM</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span className="text-sm font-bold">Near Temple Road, Mumbai</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="relative hidden md:block"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                            alt="Grocery Store"
                            className="rounded-3xl shadow-2xl border-4 border-white"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                            <p className="text-primary font-black text-3xl">Free Delivery</p>
                            <p className="text-gray-500 font-bold">Above ₹500 Orders</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Items */}
            <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Daily Essentials</h2>
                        <p className="text-gray-500">Popular items picked by your neighbors.</p>
                    </div>
                    <Link to="/products" className="border-b-2 border-primary text-primary font-bold pb-1 flex items-center gap-2 hover:gap-3 transition-all">
                        <span>See All Products</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                    {featuredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Category Section */}
            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-black text-gray-900">Browse by Category</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Rice / Atta / Dal', 'Oil / Ghee', 'Masala', 'Snacks'].map(cat => (
                        <Link
                            key={cat}
                            to={`/products?category=${cat}`}
                            className="bg-white p-8 rounded-2xl border border-gray-200 text-center hover:border-primary hover:shadow-lg transition-all group"
                        >
                            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{cat}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
