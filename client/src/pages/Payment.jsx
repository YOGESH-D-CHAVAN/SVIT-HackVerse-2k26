import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modem from '../components/modem';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        teamSize = 1, 
        teamName = 'Your Team',
        college,
        leaderName,
        leaderEmail,
        leaderPhone,
        members = []
    } = location.state || {};
    
    // Updated fee: 200 per member
    const totalFee = teamSize * 200;

    const [transactionId, setTransactionId] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!transactionId || !file) {
            setMessage({ type: 'error', text: 'Transaction ID and Payment Proof are mandatory.' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formData = new FormData();
            formData.append('teamName', teamName);
            formData.append('teamSize', teamSize);
            formData.append('college', college);
            formData.append('leaderName', leaderName);
            formData.append('leaderEmail', leaderEmail);
            formData.append('leaderPhone', leaderPhone);
            formData.append('transactionId', transactionId);
            formData.append('members', JSON.stringify(members));
            formData.append('paymentProof', file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Registration & Payment Submitted Successfully! Please join the official WhatsApp group.' });
                setShowModal(true);
            } else {
                setMessage({ type: 'error', text: data.message || 'Submission failed.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Connection error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
            {/* Main Content Canvas */}
            <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 md:p-12">
                {/* Background Ambient Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-primary/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>
                
                {/* Central Payment Container */}
                <div className="w-full max-w-5xl glass-panel rounded-[24px] md:rounded-[48px] relative z-10 p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center backdrop-blur-3xl border border-white/5 shadow-2xl animate-fade-up">
                    {/* Left Side: QR & Amount */}
                    <div className="flex flex-col items-center text-center space-y-6 md:space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter uppercase italic leading-none">
                                Secure <span className="text-primary text-outline">Payment</span>
                            </h2>
                            <div className="space-y-2">
                                <p className="text-on-surface-variant font-black text-[10px] md:text-xs uppercase tracking-widest opacity-80">Registration for Team: <span className="text-primary">{teamName}</span></p>
                                <p className="text-on-surface-variant font-medium text-xs md:text-sm">Scan the QR code to finish your registration</p>
                            </div>
                        </div>
                        
                        {/* QR Code Container */}
                        <div className="relative group p-2 md:p-4">
                            <div className="absolute -inset-2 md:-inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500 animate-glow-pulse"></div>
                            <div className="relative w-48 h-48 md:w-64 md:h-64 bg-surface-container-highest/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-primary/30 flex items-center justify-center backdrop-blur-md">
                                <img 
                                    alt="Payment QR Code" 
                                    className="w-full h-full object-contain filter invert brightness-150 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" 
                                    src="/SBI Collect QR Code.png"
                                />
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest/50 px-6 md:px-10 py-4 md:py-6 rounded-2xl border border-outline-variant/30 backdrop-blur-sm shimmer-edge text-center w-full md:w-auto">
                            <span className="text-on-surface-variant text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Payable Amount (₹200 x {teamSize})</span>
                            <span className="text-3xl md:text-4xl font-headline font-black text-primary tracking-tighter">₹{totalFee.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Right Side: Submission Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-8 md:space-y-10 text-left">
                        {message.text && (
                            <div className={`p-4 rounded-xl text-xs font-black uppercase tracking-widest ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {message.text}
                                {message.type === 'success' && (
                                    <div className="mt-3 bg-white/5 p-3 rounded-lg border border-primary/20">
                                        <p className="text-[10px] text-primary font-black uppercase tracking-wider mb-2">Mandatory Action:</p>
                                        <p className="text-[9px] text-on-surface-variant font-medium mb-3 normal-case tracking-normal">Please join the official WhatsApp group for further process, event guidelines, and team communication.</p>
                                        <a 
                                            href="https://chat.whatsapp.com/Kxdryykp65XFpSWNnY7P8W?mode=gi_t" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="bg-primary/20 text-primary px-3 py-2 rounded-lg hover:bg-primary/30 transition-all flex items-center justify-center gap-2 w-full font-bold lowercase tracking-normal"
                                        >
                                            join: whatsapp.com/Kxdryykp65XFpSWNnY7P8W
                                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Transaction ID Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] opacity-70">Transaction Reference</label>
                            <div className="relative neon-glow transition-all duration-300">
                                <input 
                                    required
                                    className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold font-mono" 
                                    placeholder="Enter 12-digit UPI Transaction ID" 
                                    type="text" 
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-50">fingerprint</span>
                            </div>
                        </div>

                        {/* Drag & Drop Upload */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] opacity-70">Proof of Payment</label>
                            <div className="group relative border-2 border-dashed border-outline-variant/40 rounded-2xl p-6 md:p-10 transition-all hover:border-primary/40 hover:bg-primary/5 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden shimmer-edge min-h-[150px]">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-32 md:h-40 object-contain rounded-lg" />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-primary/10">
                                            <span className="material-symbols-outlined text-primary text-2xl md:text-3xl" data-weight="fill">cloud_upload</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-on-surface font-black uppercase text-[10px] md:text-xs tracking-widest">Drop screenshot here</p>
                                            <p className="text-[9px] md:text-[10px] text-on-surface-variant font-bold mt-1 uppercase">PNG, JPG up to 5MB</p>
                                        </div>
                                    </>
                                )}
                                <input 
                                    required
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        {/* Submit Button with Pulse */}
                        <div className="pt-4 relative space-y-4">
                            <div className="text-center md:text-right px-2">
                                <div className={`flex items-center justify-center md:justify-end gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${loading ? 'text-primary animate-pulse' : 'text-red-500'}`}>
                                    <span className="material-symbols-outlined text-sm">{loading ? 'sync' : 'emergency'}</span>
                                    <p className="leading-relaxed">
                                        {loading ? "Verifying Payment... Please do not refresh" : "Keep this open for verification"}
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-2 bg-primary blur-xl opacity-20 pulse-effect"></div>
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full py-4 md:py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-black text-lg md:text-xl rounded-2xl uppercase tracking-tighter hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <span>{loading ? 'Processing...' : 'Submit Verification'}</span>
                                    {loading ? (
                                        <span className="material-symbols-outlined animate-spin text-xl md:text-2xl">refresh</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-xl md:text-2xl">arrow_circle_right</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {showModal && (
                <Modem 
                    teamName={teamName} 
                    onClose={() => setShowModal(false)} 
                />
            )}

            {/* Shell Footer */}
            <footer className="w-full py-16 bg-[#000000] border-t border-white/5 flex flex-col items-center gap-8 px-8 relative z-40">
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12">
                    <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
                        <span className="text-2xl font-black text-[#00F0FF] font-headline uppercase tracking-widest">SVIT HackVerse 2k26</span>
                        <p className="text-on-surface-variant font-black uppercase text-[10px] tracking-[0.4em] opacity-40 leading-loose">© 2026 SVIT Department of IT. <br /> Engineered for excellence.</p>
                    </div>

                </div>
                <div className="mt-8 pt-8 border-t border-white/5 w-full max-w-6xl flex justify-center">
                    <div className="flex gap-8">
                        {['public', 'mail'].map((icon) => (
                            <div key={icon} className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-lg">{icon}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Payment;
