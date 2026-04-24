import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '../components/Navbar';

const MyQRCode = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [participant, setParticipant] = useState(null);

    const handleFetchQR = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setToken('');
        setParticipant(null);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            
            // 1. Get the token by email
            const tokenRes = await fetch(`${apiUrl}/api/attendance/token/${email}`);
            const tokenData = await tokenRes.json();

            if (!tokenData.success) {
                throw new Error(tokenData.message || 'No record found for this email. Make sure your registration is confirmed.');
            }

            const userToken = tokenData.token;
            setToken(userToken);

            // 2. Get participant info by token to show on screen
            const infoRes = await fetch(`${apiUrl}/api/attendance/info/${userToken}`);
            const infoData = await infoRes.json();

            if (infoData.success) {
                setParticipant(infoData.data);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-body text-on-surface min-h-screen bg-[#05050a] flex flex-col relative overflow-hidden">
            <Navbar />
            
            {/* Spacer for Fixed Navbar */}
            <div className="h-24 sm:h-32 md:h-40"></div>
            
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 z-10">
                <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white/5 backdrop-blur-2xl text-center shadow-2xl animate-fade-up">
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-primary uppercase italic tracking-tighter mb-2">attendance Pass</h2>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant mb-6 sm:mb-8 opacity-60">Retrieve your unique attendance QR</p>

                    {!token ? (
                        <form onSubmit={handleFetchQR} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 ml-1">Registered Email</label>
                                <input 
                                    required
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-xl font-headline font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Fetching...' : 'Generate QR Code'}
                            </button>
                            {error && <p className="text-red-400 text-xs font-bold uppercase tracking-widest animate-shake mt-4">{error}</p>}
                        </form>
                    ) : (
                        <div className="space-y-6 sm:space-y-8 animate-fade-up">
                            <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl inline-block shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <QRCodeSVG 
                                    value={token} 
                                    size={window.innerWidth < 400 ? 160 : 200}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            
                            {participant && (
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-on-surface uppercase tracking-tight">{participant.name}</h3>
                                    <p className="text-secondary font-black text-xs uppercase tracking-[0.2em]">{participant.teamName}</p>
                                    <div className="pt-4 flex justify-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${participant.role === 'leader' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/20 text-secondary border border-secondary/30'}`}>
                                            {participant.role}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${participant.isAttended ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                            {participant.isAttended ? 'Checked In' : 'Not Checked In'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={() => setToken('')}
                                className="text-on-surface-variant hover:text-primary text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
                            >
                                ← Try another email
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="py-8 text-center opacity-30 text-[9px] font-black tracking-[0.4em] uppercase">
                SVIT HackVerse 2k26 • Attendance System
            </footer>
        </div>
    );
};

export default MyQRCode;
