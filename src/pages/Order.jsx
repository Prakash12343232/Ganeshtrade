import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowLeft, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Order = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleWhatsAppOrder = () => {
        const shopPhone = "919876543210"; // Replace with real number
        const itemsList = cart.map(item => `- ${item.name} (${item.unit}) x ${item.quantity} = ₹${item.price * item.quantity}`).join('%0A');
        const total = Math.round(cartTotal);

        const message = `*NEW ORDER FROM GANESH TRADES WEBSITE*%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Amount: ₹${total}*%0A%0A*Name:* %0A*Address:* %0A%0APlease confirm the order!`;

        window.open(`https://wa.me/${shopPhone}?text=${message}`, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-xs">Add some groceries to your cart and place order easily via WhatsApp.</p>
                <Link to="/products" className="btn-primary">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Go to Shop</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-primary" />
                    <span>Review your Items</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence mode='popLayout'>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-xl object-cover"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.name}</h3>
                                        <p className="text-gray-500 text-xs mb-3">{item.unit}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:text-primary font-bold"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:text-primary font-bold"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 p-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Checkout Box */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl sticky top-24">
                            <h2 className="text-xl font-black text-gray-900 mb-6">Order Total</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-bold">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-bold">
                                    <span>Delivery</span>
                                    <span className="text-green-600">Calculated on call</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                    <span className="text-gray-900 font-bold">Total Amount</span>
                                    <span className="text-2xl font-black text-primary">₹{cartTotal}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleWhatsAppOrder}
                                    className="btn-whatsapp w-full py-4 text-lg"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Order on WhatsApp</span>
                                </button>
                                <a
                                    href="tel:+919876543210"
                                    className="btn-call w-full py-4 flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>Call to Order</span>
                                </a>
                            </div>

                            <p className="mt-6 text-[10px] text-gray-400 font-bold text-center uppercase tracking-widest">
                                Fast Delivery within 30-60 Mins
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
