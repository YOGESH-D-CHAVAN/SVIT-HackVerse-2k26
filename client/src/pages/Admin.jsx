import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [adminId, setAdminId] = useState('');
    const [authKey, setAuthKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminId, authKey }),
            });

            const data = await response.json();

            if (data.success) {
                // Store the token in localStorage
                localStorage.setItem('adminToken', data.token);
                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Connection error. Please ensure the backend server is running.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary min-h-screen flex flex-col overflow-x-hidden relative">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/5 blur-[120px] rounded-full"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8ff5ff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            {/* Header / Brand Section */}
            <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-20 bg-[#0d0d17]/60 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-primary font-headline uppercase">SVIT</Link>
                    <div className="h-6 w-[1px] bg-outline-variant/30"></div>
                    <span className="text-[10px] md:text-sm font-label tracking-widest text-on-surface-variant uppercase font-black">Admin Console</span>
                </div>
                <div className="hidden md:flex gap-8">
                    {['System Status', 'Resources'].map((item) => (
                        <a key={item} className="font-label text-[10px] font-black tracking-[0.3em] text-on-surface-variant hover:text-primary transition-all duration-300 uppercase" href="#">{item}</a>
                    ))}
                </div>
            </header>

            {/* Main Content: Login Portal */}
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 pt-24 z-10">
                <div className="relative w-full max-w-md">
                    {/* Glow Halo Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-tertiary to-primary rounded-xl blur-2xl opacity-20"></div>
                    
                    {/* Login Card */}
                    <div className="relative bg-surface-container/80 backdrop-blur-[24px] rounded-xl glass-edge p-6 sm:p-8 md:p-10 kinetic-glow border border-white/5">
                        <div className="mb-8 md:mb-10 text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold tracking-tighter mb-2 italic uppercase">SVIT HackVerse 2k26</h1>
                            <div className="flex items-center justify-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#ff51fa]"></span>
                                <span className="text-[9px] md:text-[10px] font-label tracking-[0.3em] text-tertiary uppercase font-black">2026 EDITION</span>
                            </div>
                        </div>

                        <form className="space-y-6 text-left" onSubmit={handleLogin}>
                            {error && (
                                <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-[10px] font-bold uppercase tracking-widest animate-pulse">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-[9px] md:text-[10px] font-label font-black text-primary tracking-[0.3em] uppercase ml-1" htmlFor="admin_id">
                                    Access Identity
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg">fingerprint</span>
                                    <input 
                                        className="w-full bg-surface-container-highest/50 border-0 border-b-2 border-outline-variant text-on-surface pl-12 pr-4 py-4 rounded-t-lg focus:ring-0 focus:border-primary focus:bg-surface-container-highest/80 transition-all duration-300 placeholder:text-on-surface-variant/30 font-bold text-sm md:text-base" 
                                        id="admin_id" 
                                        placeholder="ADMIN_SERIAL_NUMBER" 
                                        type="text" 
                                        value={adminId}
                                        onChange={(e) => setAdminId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[9px] md:text-[10px] font-label font-black text-primary tracking-[0.3em] uppercase ml-1" htmlFor="auth_key">
                                    Authorization Key
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg">key</span>
                                    <input 
                                        className="w-full bg-surface-container-highest/50 border-0 border-b-2 border-outline-variant text-on-surface pl-12 pr-4 py-4 rounded-t-lg focus:ring-0 focus:border-primary focus:bg-surface-container-highest/80 transition-all duration-300 placeholder:text-on-surface-variant/30 font-bold text-sm md:text-base" 
                                        id="auth_key" 
                                        placeholder="••••••••••••" 
                                        type="password" 
                                        value={authKey}
                                        onChange={(e) => setAuthKey(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                                <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer group">
                                    <input className="w-4 h-4 rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary focus:ring-offset-0 transition-all" type="checkbox"/>
                                    <span className="group-hover:text-on-surface transition-colors">Remember Session</span>
                                </label>
                                <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">Emergency Reset?</a>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full mt-4 group relative flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 md:py-5 rounded-xl font-headline font-black tracking-tight text-base md:text-lg shadow-[0_0_20px_rgba(0,238,252,0.3)] hover:shadow-[0_0_35px_rgba(0,238,252,0.5)] active:scale-[0.98] transition-all duration-300 overflow-hidden disabled:opacity-50"
                            >
                                <span className="relative z-10 uppercase">{loading ? 'Verifying...' : 'Initialize System'}</span>
                                <span className="material-symbols-outlined relative z-10 transition-transform group-hover:translate-x-1">terminal</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                            </button>
                        </form>

                        {/* System Metadata */}
                        <div className="mt-8 md:mt-10 pt-6 border-t border-white/5 flex justify-between items-end text-left">
                            <div>
                                <p className="text-[7px] md:text-[8px] font-label text-on-surface-variant/50 tracking-[0.3em] uppercase font-black">Security Protocol</p>
                                <p className="text-[9px] md:text-[10px] font-label text-on-surface-variant tracking-[0.2em] uppercase font-black">AES-256-GCM ACTIVE</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[7px] md:text-[8px] font-label text-on-surface-variant/50 tracking-[0.3em] uppercase font-black">Node Location</p>
                                <p className="text-[9px] md:text-[10px] font-label text-on-surface-variant tracking-[0.2em] uppercase font-black">SVIT_SERVER_01</p>
                            </div>
                        </div>
                    </div>

                    {/* Supporting Info */}
                    <div className="mt-8 text-center px-4">
                        <p className="text-on-surface-variant text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40 leading-relaxed">
                            Restricted area. Unauthorized access will be logged and reported to system root.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-16 flex flex-col items-center gap-8 px-8 mt-auto z-10 border-t border-white/5 bg-[#000000]">

                <div className="flex flex-col items-center gap-2">
                    <span className="text-xl font-black text-primary font-headline tracking-tighter uppercase">SVIT IT</span>
                    <p className="text-[10px] font-black text-on-surface-variant/30 tracking-[0.4em] uppercase">© 2026 Department of Information Technology</p>
                </div>
            </footer>

            {/* Decorative Pulse Component */}
            <div className="fixed bottom-8 left-8 flex items-center gap-3 z-20">
                <div className="relative w-2 h-2">
                    <div className="absolute inset-0 rounded-full bg-tertiary animate-ping opacity-75"></div>
                    <div className="relative w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#ff51fa]"></div>
                </div>
                <span className="text-[10px] font-label text-on-surface-variant tracking-[0.3em] uppercase font-black">System Online</span>
            </div>
        </div>
    );
};

export default Admin;
