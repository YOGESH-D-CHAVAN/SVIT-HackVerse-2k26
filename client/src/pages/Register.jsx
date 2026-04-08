import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [teamSize, setTeamSize] = useState(1);
    const [college, setCollege] = useState('');
    const [leaderEmail, setLeaderEmail] = useState('');
    const [leaderPhone, setLeaderPhone] = useState('');
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...members];
        if (!newMembers[index]) newMembers[index] = {};
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const registrationData = {
                teamName,
                teamSize,
                college,
                leaderEmail,
                leaderPhone,
                members: members.slice(0, teamSize - 1)
            };

            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Registration Successful! Redirecting to payment...' });
                
                // Redirect to payment after 2 seconds
                setTimeout(() => {
                    navigate('/payment', { state: { teamSize, teamName } });
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Registration failed.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Connection error. Is the server running?' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-body text-on-surface min-h-screen flex flex-col bg-surface-dim selection:bg-primary selection:text-on-primary">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-[#0d0d17]/60 backdrop-blur-xl border-b border-white/5">
                <Link to="/" className="text-2xl font-bold tracking-tighter text-[#00F0FF] font-headline hover:drop-shadow-[0_0_8px_#00F0FF] transition-all uppercase">SVIT HackVerse 2k26</Link>
                <div className="hidden md:flex gap-8 items-center">
                    {['Guidelines', 'Schedule', 'Mentors'].map((item) => (
                        <a key={item} className="font-headline tracking-tight text-on-surface-variant hover:text-[#00F0FF] transition-all duration-300 uppercase text-xs font-bold tracking-widest" href="#">{item}</a>
                    ))}
                    <Link to="/" className="bg-[#00F0FF] text-[#005d63] px-6 py-2 font-bold font-headline rounded-lg active:scale-95 duration-150 transition-all text-xs uppercase tracking-widest">Home</Link>
                </div>
            </nav>

            <div className="flex flex-1 pt-20">
                <main className="flex-1 p-6 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-glow-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary rounded-full blur-[120px] animate-glow-pulse delay-700"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto animate-fade-up">
                        <div className="mb-10 text-left">
                            <h1 className="text-5xl md:text-6xl font-headline font-bold text-on-surface tracking-tighter mb-4 uppercase">Team <span className="text-primary text-outline">Registration</span></h1>
                            <p className="text-on-surface-variant max-w-xl font-medium">Assemble your squad for the ultimate 48-hour sprint. Ensure all member details are accurate for physical badge printing.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-10 rounded-[32px] shadow-2xl space-y-10 border border-white/5 relative overflow-hidden backdrop-blur-3xl">
                            {message.text && (
                                <div className={`p-4 rounded-xl text-xs font-black uppercase tracking-widest ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="space-y-3">
                                    <label className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] opacity-70">Team Name</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="Cyber_Ninjas" 
                                        type="text" 
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] opacity-70">Team Size</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((size) => (
                                            <button
                                                type="button"
                                                key={size}
                                                onClick={() => setTeamSize(size)}
                                                className={`flex-1 py-3 rounded-xl font-headline font-black transition-all ${teamSize === size ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105' : 'bg-surface-container-highest/30 border border-outline-variant/30 text-on-surface-variant hover:border-primary/50'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-3">
                                    <label className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] opacity-70">College / Institution Name</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="Pravara Sir Visvesvaraya Institute of Technology" 
                                        type="text" 
                                        value={college}
                                        onChange={(e) => setCollege(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] opacity-70">Leader Mobile No.</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold font-mono" 
                                        placeholder="+91 XXXXX XXXXX" 
                                        type="tel" 
                                        value={leaderPhone}
                                        onChange={(e) => setLeaderPhone(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] opacity-70">Leader Email Address</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="leader@college.edu" 
                                        type="email" 
                                        value={leaderEmail}
                                        onChange={(e) => setLeaderEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {teamSize > 1 && (
                                <div className="pt-8 border-t border-white/5 space-y-8 animate-fade-up text-left">
                                    <h3 className="font-headline font-black text-xl mb-6 flex items-center gap-3 uppercase">
                                        <span className="material-symbols-outlined text-primary">groups</span>
                                        Additional Squad Members
                                    </h3>
                                    <div className="space-y-6">
                                        {Array.from({ length: teamSize - 1 }).map((_, i) => (
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/[0.02] p-6 rounded-2xl border border-white/5 relative group hover:border-primary/20 transition-all text-left">
                                                <div className="absolute -top-3 -left-3 bg-primary text-on-primary w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-lg">0{i + 2}</div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black opacity-60">Full Name</label>
                                                    <input 
                                                        required
                                                        className="w-full bg-surface-container-highest/50 border border-outline-variant/20 rounded-lg px-4 py-2 text-sm focus:border-primary focus:ring-0 transition-all font-bold" 
                                                        type="text" 
                                                        placeholder={`Member ${i + 2} Name`} 
                                                        onChange={(e) => handleMemberChange(i, 'name', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black opacity-60">Email Address</label>
                                                    <input 
                                                        required
                                                        className="w-full bg-surface-container-highest/50 border border-outline-variant/20 rounded-lg px-4 py-2 text-sm focus:border-primary focus:ring-0 transition-all font-bold" 
                                                        type="email" 
                                                        placeholder="member@college.edu" 
                                                        onChange={(e) => handleMemberChange(i, 'email', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-bold uppercase tracking-widest">
                                    <div className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_#ff51fa]"></div>
                                    Portal closing in 4 days
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <Link to="/payment" className="flex-1 md:flex-none border border-white/10 text-on-surface px-8 py-5 font-headline font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                                        Payment Info
                                    </Link>
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 md:flex-none bg-gradient-to-r from-primary to-primary-container text-on-primary px-12 py-5 font-headline font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {loading ? 'Processing...' : 'Complete Registration'}
                                        <span className="material-symbols-outlined">how_to_reg</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="w-full py-16 bg-[#000000] border-t border-white/5 flex flex-col items-center gap-8 px-8 mt-auto z-50">
                <Link to="/" className="text-2xl font-black text-[#00F0FF] font-headline uppercase tracking-[0.3em] hover:text-white transition-all">SVIT HackVerse 2k26</Link>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                    {['Guidelines', 'Sponsors', 'Contact Us', 'Privacy'].map((link) => (
                        <a key={link} className="font-body text-xs font-black tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase" href="#">{link}</a>
                    ))}
                </div>
                <div className="text-[10px] font-black tracking-[0.4em] text-on-surface-variant/30 uppercase text-center leading-loose">
                    © 2026 SVIT Department of IT. <br />
                    Engineered for the elite.
                </div>
            </footer>
        </div>
    );
};

export default Register;
