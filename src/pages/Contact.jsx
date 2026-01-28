import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! We will get back to you shortly.');
    };

    const contactInfo = [
        { icon: <Phone className="w-6 h-6" />, title: 'Call Us', detail: '+91 98765 43210', subtitle: 'Mon-Sat, 10am-7pm' },
        { icon: <MessageCircle className="w-6 h-6" />, title: 'WhatsApp', detail: '+91 98765 43210', subtitle: 'Quick Response' },
        { icon: <Mail className="w-6 h-6" />, title: 'Email', detail: 'info@ganeshtrades.com', subtitle: '24/7 Monitoring' },
        { icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', detail: 'Mumbai, Maharashtra', subtitle: 'Head Office' },
    ];

    return (
        <div className="min-h-screen pb-20 bg-[#fafafa]">
            <div className="bg-white border-b border-gray-100 py-20 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
                    >
                        Get in <span className="text-primary">Touch</span>
                    </motion.h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">We're here to help you bring divinity to your home. Reach out for any inquiries or custom orders.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start space-x-5 hover:border-primary/30 transition-all group"
                            >
                                <div className="p-4 bg-primary/5 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                                    {info.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{info.title}</h3>
                                    <p className="text-primary font-bold my-1">{info.detail}</p>
                                    <p className="text-gray-400 text-sm font-medium">{info.subtitle}</p>
                                </div>
                            </motion.div>
                        ))}

                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-200"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>WhatsApp</span>
                            </a>
                            <a
                                href="tel:+919876543210"
                                className="bg-gray-900 hover:bg-black text-white flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-gray-200"
                            >
                                <Phone className="w-5 h-5" />
                                <span>Call Now</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white rounded-[2rem] p-10 md:p-16 border border-gray-100 shadow-sm"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center space-x-4">
                            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                            <span>Send us a Message</span>
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-600 ml-1 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-600 ml-1 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-600 ml-1 uppercase tracking-wider">Your Message</label>
                                <textarea
                                    required
                                    rows="6"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium resize-none"
                                    placeholder="Tell us what you're looking for..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full py-5 text-lg font-black tracking-wide uppercase">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Map */}
                <div className="mt-20 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl h-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120658.1132646399!2d72.78484675!3d19.082197849999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
