import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const Auth = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (mobileNumber.length < 10) return setError('Please enter a valid 10-digit number');

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
                const data = await response.json();
                setError(data.message || 'Request failed');
            }
        } catch (err) {
            console.error('FETCH ERROR:', err);
            setError('Cannot connect to shop server. Please ensure the backend is running.');
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

            if (response.ok) {
                login(data.user, data.token);
                navigate('/');
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Verification failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 bg-gray-50/30">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl"
            >
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 mb-1">Login / Sign up</h1>
                    <p className="text-gray-400 text-sm font-medium">
                        {step === 1 ? 'Enter your 10-digit mobile number. We\'ll send an OTP.' : `Verify OTP sent to +91 ${mobileNumber}`}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-black uppercase tracking-widest mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP} className="space-y-6">
                    {step === 1 ? (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile number</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="tel"
                                    required
                                    maxLength="10"
                                    autoFocus
                                    className="w-full bg-primary/5 border-2 border-transparent focus:border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-all font-bold text-gray-700 tracking-widest"
                                    placeholder="9999999999"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <label className="text-center block text-[10px] font-black text-gray-400 uppercase tracking-widest">Enter 4-digit code</label>
                            <input
                                type="text"
                                required
                                maxLength="4"
                                autoFocus
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 text-center focus:outline-none focus:border-primary/50 transition-all font-black text-4xl tracking-[1em] text-primary"
                                placeholder="0000"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            />
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-primary font-black text-xs uppercase tracking-widest hover:underline"
                            >
                                Change Number
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 rounded-2xl text-base font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            <>
                                <span>{step === 1 ? 'Send OTP' : 'Verify & Continue'}</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-400 text-[10px] font-medium leading-relaxed">
                    No password. OTP only. Kirana shop — simple & <br /> secure.
                </p>
            </motion.div>

            <Link to="/" className="mt-8 text-primary font-black text-xs uppercase tracking-widest hover:underline opacity-60 hover:opacity-100 transition-opacity">
                ← Back to home
            </Link>
        </div>
    );
};

export default Auth;
