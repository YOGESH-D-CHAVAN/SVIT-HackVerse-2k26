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

            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Registration & Payment Submitted Successfully!' });
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
            <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
                {/* Background Ambient Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                {/* Central Payment Container */}
                <div className="w-full max-w-4xl glass-panel rounded-[48px] relative z-10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center backdrop-blur-3xl border border-white/5">
                    {/* Left Side: QR & Amount */}
                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter uppercase">Secure <span className="text-primary text-outline">Payment</span></h2>
                            <p className="text-on-surface-variant font-black text-xs uppercase tracking-widest opacity-80">Registration for Team: <span className="text-primary">{teamName}</span></p>
                            <p className="text-on-surface-variant font-medium text-sm">Scan the QR code to finish your registration</p>
                        </div>
                        
                        {/* QR Code Container */}
                        <div className="relative group p-4">
                            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500 animate-glow-pulse"></div>
                            <div className="relative w-64 h-64 bg-surface-container-highest/50 p-6 rounded-3xl border border-primary/30 flex items-center justify-center backdrop-blur-md">
                                <img 
                                    alt="Payment QR Code" 
                                    className="w-full h-full object-contain filter invert brightness-150 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWJvZeA-r2MzI5m_jORuOuEoTkGUTRQfxTjEmQdtIpCxXkZXGcjH62N8wlLK1N3p09AlywIdXSBYeYi2cQQ4q5zCu7_XiERVX01i1gtR0V8FKYt24oNx51GbDtEe6RbXXYdXrvyutNBrdBNM5WxqA79r07Xdui2ayAOsGoefjMD912cUyTfe_7OEEVAn-qkOPMxeU_KVqzKigOl_ZjxfceuwaLD5BTPCD6Ivn4s9iduuYaGLkAEqsIjxu4SIf1RdpnBSJj0W5bYw"
                                />
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest/50 px-8 py-5 rounded-2xl border border-outline-variant/30 backdrop-blur-sm shimmer-edge text-center">
                            <span className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Payable Amount (₹200 x {teamSize})</span>
                            <span className="text-4xl font-headline font-black text-primary tracking-tighter">₹{totalFee.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Right Side: Submission Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-10 text-left">
                        {message.text && (
                            <div className={`p-4 rounded-xl text-xs font-black uppercase tracking-widest ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {message.text}
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
                            <div className="group relative border-2 border-dashed border-outline-variant/40 rounded-2xl p-10 transition-all hover:border-primary/40 hover:bg-primary/5 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden shimmer-edge">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-32 object-contain rounded-lg" />
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-primary/10">
                                            <span className="material-symbols-outlined text-primary text-3xl" data-weight="fill">cloud_upload</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-on-surface font-black uppercase text-xs tracking-widest">Drop screenshot here</p>
                                            <p className="text-[10px] text-on-surface-variant font-bold mt-1">PNG, JPG up to 5MB</p>
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
                        <div className="pt-4 relative">
                            <div className="absolute -inset-2 bg-primary blur-xl opacity-20 pulse-effect"></div>
                            <button 
                                type="submit"
                                disabled={loading}
                                className="relative w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-black text-xl rounded-2xl uppercase tracking-tighter hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                <span>{loading ? 'Processing...' : 'Submit Verification'}</span>
                                <span className="material-symbols-outlined text-2xl">arrow_circle_right</span>
                            </button>
                        </div>

                        {/* Info Note */}
                        <div className="flex items-start gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                            <span className="material-symbols-outlined text-secondary text-xl">info</span>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed font-bold uppercase tracking-widest opacity-60">
                                Verification typically takes 2-4 hours. You will receive an email once your registration status is updated to "Confirmed".
                            </p>
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
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                        {['Guidelines', 'Sponsors', 'Contact Us', 'Privacy'].map((link) => (
                            <a key={link} className="text-on-surface-variant inline-block font-black uppercase text-xs tracking-widest hover:text-primary transition-all underline-offset-8" href="#">{link}</a>
                        ))}
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
