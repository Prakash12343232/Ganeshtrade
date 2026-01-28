import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

import { API_URL } from '../config';

const Products = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get('category') || 'All';

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products`);
                const data = await res.json();
                setProducts(data);
            } catch (e) {
                console.error('Fetch error', e);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', 'Rice / Atta / Dal', 'Oil / Ghee', 'Masala', 'Snacks', 'Daily Essentials'];

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery, products]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-20 bg-gray-50">
            <div className="bg-white border-b border-gray-100 pt-10 pb-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-black text-gray-900 mb-6 font-primary">Our Grocery Store</h1>

                    <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${selectedCategory === cat
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Item (name)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all font-bold text-gray-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-xl font-black text-gray-900 mb-2">Item not available</h2>
                        <p className="text-gray-500 mb-6">Call us to check if we can arrange it for you!</p>
                        <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="text-primary font-black underline">See all items</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
