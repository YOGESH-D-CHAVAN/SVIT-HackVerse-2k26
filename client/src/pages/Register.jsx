import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [teamSize, setTeamSize] = useState(1);
    const [college, setCollege] = useState('');
    const [leaderName, setLeaderName] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const phoneRegex = /^[0-9]{10}$/;

        // Validate Leader
        if (!gmailRegex.test(leaderEmail)) {
            setMessage({ type: 'error', text: 'Leader Email must be a @gmail.com address.' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!phoneRegex.test(leaderPhone)) {
            setMessage({ type: 'error', text: 'Leader Phone Number must be exactly 10 digits.' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Validate Members
        for (let i = 0; i < teamSize - 1; i++) {
            const member = members[i];
            if (!member?.name || !member?.email) {
                setMessage({ type: 'error', text: `Please provide all details for Operative 0${i + 2}.` });
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            if (!gmailRegex.test(member.email)) {
                setMessage({ type: 'error', text: `Operative 0${i + 2} Email must be a @gmail.com address.` });
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        }

        setLoading(true);
        
        const registrationData = {
            teamName,
            teamSize,
            college,
            leaderName,
            leaderEmail,
            leaderPhone,
            members: members.slice(0, teamSize - 1)
        };

        // Simulate a slight delay
        setTimeout(() => {
            navigate('/payment', { state: registrationData });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="font-body text-on-surface min-h-screen flex flex-col bg-surface-dim selection:bg-primary selection:text-on-primary overflow-x-hidden">
            <Navbar />

            <div className="flex-grow relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 pt-24">
                {/* Background Ambient Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>
                
                {/* Central Registration Container */}
                <div className="w-full max-w-5xl glass-panel rounded-[24px] md:rounded-[48px] relative z-10 p-6 sm:p-8 md:p-10 backdrop-blur-3xl border border-white/5 shadow-2xl animate-fade-up">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-headline font-bold text-on-surface tracking-tighter uppercase italic leading-none">
                            Operationalize <span className="text-primary text-outline">Taskforce</span>
                        </h2>
                        <p className="mt-4 text-on-surface-variant font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-60">Initialize registration for SVIT HackVerse 2k26</p>
                    </div>

                    {/* Step-by-Step Payment Instructions */}
                    <div className="mb-12 bg-primary/5 border border-primary/20 rounded-[32px] p-6 md:p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                                    <span className="material-symbols-outlined text-3xl">info</span>
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-headline font-black uppercase tracking-tighter text-primary">Pre-Registration Protocol</h3>
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-70">Read instructions thoroughly before proceeding</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                <div className="space-y-4">
                                    {[
                                        { s: "01", t: "Open SBI Collect Portal", link: "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=4628563" },
                                        { s: "02", t: "Type in search: SIR VISVESWARAYA INSTITUTE OF TECHNOLOGY" },
                                        { s: "03", t: "Click Payment Category: Select TECHX-26" },
                                        { s: "04", t: "Enter Name of the student" },
                                        { s: "05", t: "Select activity to participate" },
                                        { s: "06", t: "Enter College Name" },
                                        { s: "07", t: "Enter Email ID of participant" },
                                        { s: "08", t: "Enter Mobile Number of participant" },
                                        { s: "--", t: "Remark: Optional" },
                                        { s: "09", t: "Hostel Fee (If campus stay required)" }
                                    ].map((step, i) => (
                                        <div key={i} className={`flex gap-4 group/item ${step.s === '--' ? 'opacity-50 ml-6' : ''}`}>
                                            <span className="text-primary font-mono font-black text-xs mt-1">[{step.s}]</span>
                                            {step.link ? (
                                                <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors flex items-center gap-2">
                                                    {step.t} <span className="material-symbols-outlined text-xs">open_in_new</span>
                                                </a>
                                            ) : (
                                                <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-on-surface opacity-80 group-hover/item:opacity-100 transition-opacity">{step.t}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { s: "10", t: "Food Charges (If required for mess)" },
                                        { s: "11", t: "Registration Fee: ₹200 per group per activity" },
                                        { s: "12", t: "Enter Remitter (student making payment) Name" },
                                        { s: "13", t: "Enter Remitter Mobile Number" },
                                        { s: "14", t: "Enter Captcha Verification" },
                                        { s: "15", t: "Click on Next Phase" },
                                        { s: "16", t: "Make Online Payment" },
                                        { s: "17", t: "Print Receipt" },
                                        { s: "18", t: "Upload the payment screenshot on next page (Payment Page) and complete the registration" }
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4 group/item">
                                            <span className="text-primary font-mono font-black text-xs mt-1">[{step.s}]</span>
                                            <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-on-surface opacity-80 group-hover/item:opacity-100 transition-opacity">{step.t}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 p-4 rounded-2xl bg-primary/10 border border-primary/30 text-center relative group-hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all">
                                <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary animate-pulse">
                                    ⚠️ MANDATORY: READ ALL STEPS ABOVE BEFORE PROCEEDING TO FILL THE FORM
                                </p>
                            </div>
                        </div>
                    </div>

                    {message.text && (
                        <div className={`mb-8 p-4 rounded-xl text-xs font-black uppercase tracking-widest animate-shake ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-sm">{message.type === 'success' ? 'check_circle' : 'warning'}</span>
                                {message.text}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                        {/* Section 1: Core Logistics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-70">Team Designation / Squad Name</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 md:py-5 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="ENTER SQUAD NAME" 
                                        type="text" 
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-70">Knowledge Base (College)</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 md:py-5 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="COLLEGE / INSTITUTE NAME" 
                                        type="text" 
                                        value={college}
                                        onChange={(e) => setCollege(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            {/* Team Size Matrix */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary opacity-70">SQUAD Size Matrix</label>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    {[1, 2, 3, 4, 5].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setTeamSize(size)}
                                            className={`flex-1 min-w-[60px] py-4 md:py-5 rounded-xl border-2 transition-all font-headline font-black text-lg ${teamSize === size ? 'bg-secondary text-on-secondary border-secondary shadow-[0_0_15px_rgba(213,117,255,0.4)]' : 'bg-surface-container-highest/20 border-white/5 text-on-surface-variant hover:border-secondary/30'}`}
                                        >
                                            0{size}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[9px] text-on-surface-variant font-bold italic opacity-50 text-right uppercase tracking-widest">Select deployment scale</p>
                            </div>
                        </div>

                        {/* Section 2: Leadership Comms */}
                        <div className="bg-white/[0.02] p-6 md:p-8 rounded-3xl border border-white/5 space-y-8 md:space-y-10 group hover:bg-white/[0.04] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">shield_person</span>
                                </div>
                                <h3 className="text-xl font-headline font-bold uppercase tracking-tighter">SQUAD Leader Comms</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-50">Full Identity</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="LEADER NAME" 
                                        type="text" 
                                        value={leaderName}
                                        onChange={(e) => setLeaderName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-50">Secure Email</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="COMM_CHANNEL@GMAIL.COM" 
                                        type="email" 
                                        value={leaderEmail}
                                        onChange={(e) => setLeaderEmail(e.target.value)}
                                        pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
                                        title="Please use a valid @gmail.com address"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-50">Signal Contact</label>
                                    <input 
                                        required
                                        className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary focus:outline-none transition-all font-bold" 
                                        placeholder="10-DIGIT MOBILE NUMBER" 
                                        type="tel" 
                                        value={leaderPhone}
                                        onChange={(e) => setLeaderPhone(e.target.value)}
                                        pattern="[0-9]{10}"
                                        minLength="10"
                                        maxLength="10"
                                        title="Phone number must be exactly 10 digits"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Additional Squad Members (Dynamic) */}
                        {teamSize > 1 && (
                            <div className="animate-fade-up">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                                        <span className="material-symbols-outlined">group_add</span>
                                    </div>
                                    <h3 className="text-xl font-headline font-bold uppercase tracking-tighter">Additional SQUAD Members</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                    {[...Array(teamSize - 1)].map((_, idx) => (
                                        <div key={idx} className="p-5 md:p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-5 hover:bg-white/[0.03] transition-all">
                                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">OPERATIVE 0{idx + 2}</span>
                                                <span className="material-symbols-outlined text-sm text-secondary opacity-40">token</span>
                                            </div>
                                            <div className="space-y-4">
                                                <input 
                                                    required
                                                    className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-lg px-4 py-3 md:py-4 text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-secondary focus:outline-none transition-all font-bold" 
                                                    placeholder={`MEMBER ${idx + 2} NAME`} 
                                                    type="text" 
                                                    value={members[idx]?.name || ''}
                                                    onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                                                />
                                                <input 
                                                    required
                                                    className="w-full bg-surface-container-highest/30 border border-outline-variant/30 rounded-lg px-4 py-3 md:py-4 text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-secondary focus:outline-none transition-all font-bold" 
                                                    placeholder={`MEMBER ${idx + 2} GMAIL ADDRESS`} 
                                                    type="email" 
                                                    value={members[idx]?.email || ''}
                                                    onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                                                    pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
                                                    title="Please use a valid @gmail.com address"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                            <div className="flex items-center gap-3 text-on-surface-variant animate-pulse w-full md:w-auto justify-center md:justify-start">
                                <span className="material-symbols-outlined text-red-500 animate-pulse">emergency</span>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center md:text-left">
                                    All personal data is encrypted via root access protocol.
                                </p>
                            </div>
                            <div className="w-full md:w-auto">
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full md:w-auto bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-black text-xl px-12 md:px-16 py-5 rounded-2xl uppercase tracking-tighter transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.05] active:scale-95'}`}
                                >
                                    <span>{loading ? 'Processing...' : 'Proceed to Payment'}</span>
                                    <span className={`material-symbols-outlined text-2xl ${loading ? 'animate-spin' : ''}`}>{loading ? 'sync' : 'payments'}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer Identity */}
            <footer className="py-16 flex flex-col items-center gap-8 px-8 border-t border-white/5 bg-[#000000] mt-auto">
                <Link to="/" className="text-2xl font-black text-[#00F0FF] font-headline uppercase tracking-[0.3em] hover:text-white transition-all">SVIT HackVerse 2k26</Link>
                <div className="text-[10px] font-black tracking-[0.4em] text-on-surface-variant/30 uppercase text-center leading-loose">
                    © 2026 SVIT Department of IT. <br />
                    Engineered for the elite.
                </div>
            </footer>
        </div>
    );
};

export default Register;
