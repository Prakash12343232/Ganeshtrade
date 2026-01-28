import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <span className="text-xl font-bold">Ganesh Trades</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium quality religious idols and puja accessories. Bringing divinity and elegance to your sacred spaces.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg transition-colors group">
                                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg transition-colors group">
                                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg transition-colors group">
                                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors text-sm">Products</Link></li>
                            <li><Link to="/order" className="text-gray-400 hover:text-primary transition-colors text-sm">Cart & Orders</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Shipping Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Return Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Phone className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">info@ganeshtrades.com</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">Mumbai, Maharashtra, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
                    <p>© 2024 Ganesh Trades. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span>Built by Your Dev Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
