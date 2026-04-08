import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-[#05050a] text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen overflow-x-hidden relative">
            {/* Global Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] animate-scanline bg-gradient-to-b from-transparent via-primary/20 to-transparent h-[100px] w-full"></div>

            {/* Background Code Scroll Layer */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 overflow-hidden select-none">
                <div className="flex flex-wrap gap-8 text-[10px] font-mono text-primary leading-tight animate-code-scroll w-[200%]">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="whitespace-pre">
                            {`import { neural_link } from '@cyber/core';\nconst hack = async () => {\n  await infiltrate('08ff-hack');\n  launch_rocket(100);\n};\n// SECURITY OVERRIDE\nsystem.level = 'SVIT_HV';\nwhile(true) {\n  innovate();\n}`}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Robots/Assets */}
            <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Robot 1 */}
                <div className="absolute top-1/4 left-[10%] animate-float transition-all duration-[8000ms] opacity-20">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
                    </svg>
                </div>
                {/* Robot 2 */}
                <div className="absolute top-2/3 right-[15%] animate-float transition-all duration-[10000ms] delay-1000 opacity-20">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary">
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v4M8 15h.01M16 15h.01" />
                    </svg>
                </div>
                {/* Robot 3 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse pointer-events-none select-none">
                    <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
                </div>
            </div>

            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-[#0d0d17]/60 backdrop-blur-xl flex justify-between items-center px-8 h-20 w-full font-headline tracking-tight text-on-surface border-b border-white/5">
                <div className="flex items-baseline gap-2 group cursor-pointer">
                    <span className="text-2xl font-bold tracking-tighter text-[#00F0FF] group-hover:drop-shadow-[0_0_8px_#00F0FF] transition-all">SVIT HackVerse 2k26</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {['Timeline', 'Prizes', 'Partners', 'Contact'].map((item) => (
                        <a key={item} className="text-on-surface-variant hover:text-[#00F0FF] transition-all duration-300 font-bold uppercase text-xs tracking-widest relative group" href={`#${item.toLowerCase()}`}>
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F0FF] group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                </div>
                <Link to="/register" className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full font-bold tracking-tight hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20">
                    Register Now
                </Link>
            </nav>

            <main className="pt-20 relative z-20">
                {/* Hero Section */}
                <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 pt-24 md:pt-32 text-center overflow-hidden animate-fade-up">
                    {/* Localized Hero Code Background */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden scale-110">
                        <div className="flex flex-col gap-4 text-[12px] font-mono text-primary leading-none animate-code-scroll select-none rotate-[-5deg]">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <div key={i} className="flex gap-12 whitespace-nowrap">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <span key={j}>
                                            {`void ignite() { while(status == READY) { process.data('SVIT_HV'); upload.payload(65535); system.pulse(); } } // TERMINAL_${i}_${j} `}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {/* Radial gradient to fade code away from center */}
                        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent, #05050a 70%)"></div>
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto">
                        <div className="mb-8 flex flex-col items-center">
                            <span className="font-headline text-sm font-bold tracking-[0.5em] text-on-surface-variant mb-4 opacity-60 uppercase animate-pulse">SVIT PRESENTS</span>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[2px] w-12 bg-primary/30"></div>
                                <span className="font-headline text-xl md:text-2xl font-extrabold tracking-[0.3em] text-primary opacity-90 uppercase">State-Level Competition</span>
                                <div className="h-[2px] w-12 bg-primary/30"></div>
                            </div>
                            <h1 className="font-headline text-6xl md:text-[8.5rem] font-black tracking-tighter leading-none text-on-surface drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                                SVIT HackVerse<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> 2k26</span>
                            </h1>
                        </div>
                        <p className="font-headline text-xl md:text-3xl font-medium max-w-4xl mx-auto mb-6 text-on-surface-variant leading-tight">
                         Engineering the Future: <span className="text-primary-dim">Intelligent</span>, <span className="text-secondary-fixed-dim">Sustainable</span>, and <span className="text-tertiary-dim">Transformative</span> Solutions
                        </p>
                        <div className="inline-block bg-primary/10 border border-primary/20 px-6 py-2 rounded-full mb-12">
                            <p className="text-primary font-bold text-sm md:text-base tracking-widest uppercase flex items-center gap-3">
                                <span className="material-symbols-outlined text-[18px] animate-spin">settings</span>
                                Solve Real Industry Problems • Win Cash Prizes By Winjit
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/register" className="animate-pulse-custom bg-gradient-to-br from-primary to-primary-container text-on-primary text-xl font-black px-12 py-5 rounded-2xl flex items-center gap-4 hover:brightness-110 transition-all shadow-xl shadow-primary/30 active:scale-95">
                                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                                REGISTER NOW
                            </Link>
                            <button className="bg-[#11111a] border border-white/10 text-on-surface text-xl font-black px-12 py-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all active:scale-95">
                                <span className="material-symbols-outlined text-2xl">description</span>
                                BROCHURE
                            </button>
                        </div>
                    </div>
                </section>

                {/* Event Timeline */}
                <section id="timeline" className="py-32 px-8 bg-[#08080f]/80 backdrop-blur-sm relative border-y border-white/5 animate-fade-up">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 uppercase">Event <span className="text-primary">Timeline</span></h2>
                            <div className="h-1.5 w-32 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {[
                                { date: "10 MAR 2026", task: "Registration Opens", color: "primary", icon: "how_to_reg" },
                                { date: "28 MAR 2026", task: "Registration Deadline", color: "error", icon: "alarm" },
                                { date: "9 APR 2026", task: "Solution Submission", color: "secondary", icon: "upload_file" },
                                { date: "11 APR 2026", task: "Screening Rounds", color: "primary", icon: "filter_alt" },
                                { date: "18 APR 2026", task: "Grand Finale", color: "tertiary", icon: "workspace_premium" }
                            ].map((item, idx) => (
                                <div key={idx} className="glass-card p-10 rounded-[32px] border border-white/10 flex flex-col items-center text-center hover:scale-105 hover:bg-white/[0.03] transition-all group">
                                    <div className={`w-16 h-16 rounded-2xl bg-${item.color}/10 flex items-center justify-center mb-6 text-${item.color} group-hover:rotate-12 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <p className="text-on-surface font-black text-xl mb-2">{item.date}</p>
                                    <p className="text-on-surface-variant text-sm font-bold tracking-widest uppercase">{item.task}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Prizes Section */}
                <section id="prizes" className="py-32 px-8 relative overflow-hidden animate-fade-up">
                    <div className="max-w-7xl mx-auto flex flex-col items-center">
                        <div className="text-center mb-20">
                            <h2 className="font-headline text-5xl md:text-7xl font-black text-on-surface mb-4 uppercase tracking-tighter">WIN BIG <span className="text-secondary">PRIZES</span></h2>
                            <p className="text-primary font-black uppercase tracking-[0.5em] text-xs">Innovation rewarded in cash</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12 w-full max-w-6xl h-auto items-end">
                            {/* 2nd Prize */}
                            <div className="glass-card p-8 lg:p-12 rounded-[40px] text-center border-t-4 border-slate-400/30 group hover:scale-105 transition-all order-2 md:order-1 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-400/5 to-transparent"></div>
                                <span className="material-symbols-outlined text-slate-400 text-5xl mb-6 relative z-10">workspace_premium</span>
                                <h4 className="text-xl font-bold mb-2 relative z-10">2nd Prize</h4>
                                <p className="text-4xl lg:text-5xl font-black text-secondary mb-6 tracking-tighter relative z-10">₹15,000</p>
                                <div className="bg-white/5 py-3 rounded-2xl relative z-10">
                                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Goodies Included</p>
                                </div>
                            </div>
                            {/* 1st Prize */}
                            <div className="glass-card p-10 lg:p-16 rounded-[48px] text-center border-2 border-primary relative shadow-[0_0_50px_rgba(0,240,255,0.15)] transform scale-105 md:scale-110 z-10 order-1 md:order-2 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent animate-glow-pulse"></div>
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-8 py-1.5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-lg">GRAND WINNER</div>
                                <span className="material-symbols-outlined text-primary text-7xl lg:text-8xl mb-8 relative z-10 animate-float" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                <h4 className="text-2xl font-black mb-4 relative z-10">1st Prize</h4>
                                <p className="text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-8 tracking-tighter relative z-10 shadow-primary/50">₹25,000</p>
                                <p className="text-xs text-on-primary bg-primary/20 py-2 rounded-xl font-black tracking-widest uppercase relative z-10">Ultimate Innovator</p>
                            </div>
                            {/* 3rd Prize */}
                            <div className="glass-card p-8 lg:p-12 rounded-[40px] text-center border-t-4 border-orange-400/30 group hover:scale-105 transition-all order-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-orange-400/5 to-transparent"></div>
                                <span className="material-symbols-outlined text-orange-400 text-5xl mb-6 relative z-10">military_tech</span>
                                <h4 className="text-xl font-bold mb-2 relative z-10">3rd Prize</h4>
                                <p className="text-4xl lg:text-5xl font-black text-secondary mb-6 tracking-tighter relative z-10">₹10,000</p>
                                <div className="bg-white/5 py-3 rounded-2xl relative z-10">
                                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Goodies Included</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partners & Industries */}
                <section id="partners" className="py-32 px-8 border-t border-white/5 animate-fade-up">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="font-headline text-5xl font-black uppercase tracking-tighter">PARTNERED <span className="text-primary">INDUSTRIES</span></h2>
                            <p className="text-on-surface-variant font-black uppercase tracking-[0.5em] text-xs mt-4">Solving challenges for the best</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                "Chemito Infotech", "Neelay Industries",
                                "Aerogravity", "Pentas Insulations",
                                "Avani Engg.", "Vayitree Solutions",
                                "Samarth Developers", "Enorme Control"
                            ].map((company, idx) => (
                                <div key={idx} className="bg-white/[0.02] border border-white/5 p-8 rounded-[24px] flex items-center justify-center text-center hover:bg-primary/[0.05] hover:border-primary/20 transition-all cursor-default group">
                                    <span className="font-headline font-black text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest text-sm">{company}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Info & Participation */}
                <section className="py-32 px-8 bg-[#08080f]/60 animate-fade-up">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="glass-card p-12 rounded-[40px] border border-white/10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:animate-bounce">
                                <span className="material-symbols-outlined text-4xl">groups</span>
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase">Who Can Participate?</h3>
                            <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-medium">
                                Open to all engineering and technology students across the state.
                            </p>
                            <div className="bg-primary/20 px-8 py-3 rounded-2xl border border-primary/30">
                                <p className="text-primary font-black tracking-[0.2em] uppercase text-sm">Team Size: 1 – 5 Members</p>
                            </div>
                        </div>
                        <div className="glass-card p-12 rounded-[40px] border border-white/10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center text-secondary mb-8 group-hover:animate-bounce">
                                <span className="material-symbols-outlined text-4xl">payments</span>
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase">Registration Fee?</h3>
                            <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-medium">
                                Registration fee of ₹1,000 per student. Invest in your innovation and secure your spot!
                            </p>
                            <div className="bg-secondary/20 px-8 py-3 rounded-2xl border border-secondary/30">
                                <p className="text-secondary font-black tracking-[0.2em] uppercase text-sm">₹1,000 PER TEAM</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-32 px-8 border-t border-white/5 animate-fade-up">
                    <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-[64px] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="text-center mb-16">
                                <h3 className="font-headline text-4xl font-black mb-6 uppercase tracking-tighter">FOR <span className="text-primary">QUERIES</span></h3>
                                <p className="text-on-surface-variant font-bold tracking-widest uppercase text-xs">Reach out to our organizing team</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Coordinator</p>
                                    <h4 className="text-2xl font-black text-on-surface">Prof. Rushikesh Bhalerao</h4>
                                    <a href="tel:+919561508626" className="text-primary font-black text-lg hover:drop-shadow-[0_0_8px_#8ff5ff] transition-all flex items-center gap-3">
                                        <span className="material-symbols-outlined">call</span>
                                        +91 95615 08626
                                    </a>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] text-secondary font-black uppercase tracking-[0.4em]">Lead Organizer</p>
                                    <h4 className="text-2xl font-black text-on-surface">Dr. Rahul Dhokane</h4>
                                    <a href="tel:+918668428388" className="text-secondary font-black text-lg hover:drop-shadow-[0_0_8px_#d575ff] transition-all flex items-center gap-3">
                                        <span className="material-symbols-outlined">call</span>
                                        +91 86684 28388
                                    </a>
                                </div>
                            </div>
                            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center gap-8">
                                <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.5em]">Organized By</p>
                                <p className="text-2xl md:text-3xl font-black text-on-surface text-center leading-tight">DEPARTMENT OF INFORMATION TECHNOLOGY</p>
                                <div className="flex gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all pointer-events-none">
                                    <span className="text-xl font-bold italic tracking-tighter">Powered by Winjit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#020205] py-20 flex flex-col items-center gap-10 px-8 border-t border-white/5 relative z-30">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-4xl font-black text-primary tracking-tighter uppercase relative group cursor-default">
                        SVIT HackVerse 2k26
                        <div className="absolute -inset-2 bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all rounded-full"></div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-on-surface-variant font-black uppercase text-[12px] tracking-[0.2em] relative z-10">
                    {['Guidelines', 'Sponsors', 'Contact', 'Privacy'].map((link) => (
                        <a key={link} className="hover:text-primary transition-colors cursor-pointer" href="#">{link}</a>
                    ))}
                </div>
                <div className="text-on-surface-variant opacity-30 text-[10px] font-bold tracking-[0.3em] uppercase text-center max-w-lg leading-[2.5]">
                    © 2026 SVIT Department of IT. <br />
                    Engineered with pure innovation.
                </div>
            </footer>
        </div>
    );
};


export default LandingPage;
