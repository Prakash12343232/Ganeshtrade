import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const AdminLogin = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const ADMIN_MOBILE = "9999999999";

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (mobileNumber !== ADMIN_MOBILE) {
            return setError('Access Denied. Only Shop Owner can login here.');
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber }),
            });

            if (response.ok) {
                setStep(2);
            } else {
                setError('Service busy. Try again.');
            }
        } catch (err) {
            setError('Connect server failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber, otp }),
            });

            const data = await response.json();

            if (response.ok && data.isAdmin) {
                login(data.user, data.token);
                navigate('/admin', { replace: true });
            } else {
                setError('Invalid OTP or Not Admin');
            }
        } catch (err) {
            setError('Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white p-10 rounded-[2.5rem] border-2 border-primary/10 shadow-2xl shadow-primary/5"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Shop Owner</h1>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Administrative Secure Login</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP} className="space-y-6">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Owner Mobile</label>
                            <input
                                type="tel"
                                required
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/30 font-black text-xl tracking-[0.2em] text-gray-700"
                                placeholder="999..."
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <label className="text-center block text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Key (OTP)</label>
                            <input
                                type="text"
                                required
                                maxLength="4"
                                autoFocus
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 text-center focus:outline-none focus:border-primary/50 transition-all font-black text-4xl tracking-[1em] text-primary"
                                placeholder="0000"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl"
                    >
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            <>
                                <span>{step === 1 ? 'Authorize Access' : 'Enter Dashboard'}</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
