import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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

            <Navbar />

            <main className="pt-20 relative z-20">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-24 md:pt-32 text-center overflow-hidden animate-fade-up">
                    {/* Localized Hero Code Background */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden scale-110">
                        <div className="flex flex-col gap-4 text-[10px] md:text-[12px] font-mono text-primary leading-none animate-code-scroll select-none rotate-[-5deg]">
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

                    <div className="relative z-10 w-full max-w-6xl mx-auto">
                        <div className="mb-6 md:mb-8 flex flex-col items-center">
                            <span className="font-headline text-[10px] md:text-sm font-bold tracking-[0.3em] md:tracking-[0.5em] text-on-surface-variant mb-2 md:mb-4 opacity-60 uppercase animate-pulse">SVIT PRESENTS</span>
                            <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                                <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-primary/30"></div>
                                <span className="font-headline text-sm md:text-2xl font-extrabold tracking-[0.2em] md:tracking-[0.3em] text-primary opacity-90 uppercase text-center">State-Level Competition</span>
                                <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-primary/30"></div>
                            </div>
                            <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl lg:text-[8.5rem] font-black tracking-tighter leading-none text-on-surface drop-shadow-[0_0_30px_rgba(0,240,255,0.2)] uppercase">
                                SVIT HackVerse<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> 2k26</span>
                            </h1>
                        </div>
                        <p className="font-headline text-lg md:text-3xl font-medium max-w-4xl mx-auto mb-6 text-on-surface-variant leading-tight px-4">
                         Engineering the Future: <span className="text-primary-dim">Intelligent</span>, <span className="text-secondary-fixed-dim">Sustainable</span>, and <span className="text-tertiary-dim">Transformative</span> Solutions
                        </p>
                        <div className="inline-block bg-primary/10 border border-primary/20 px-4 md:px-6 py-2 rounded-full mb-10 md:mb-12">
                            <p className="text-primary font-bold text-[10px] md:text-base tracking-widest uppercase flex items-center gap-2 md:gap-3">
                                <span className="material-symbols-outlined text-sm md:text-[18px] animate-spin">settings</span>
                                Solve Real Industry Problems • Win Cash Prizes By TenAI
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
                            <Link to="/register" className="animate-pulse-custom bg-gradient-to-br from-primary to-primary-container text-on-primary text-lg md:text-xl font-black px-8 md:px-12 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-4 hover:brightness-110 transition-all shadow-xl shadow-primary/30 active:scale-95">
                                <span className="material-symbols-outlined text-xl md:text-2xl">rocket_launch</span>
                                REGISTER NOW
                            </Link>
                            <a 
                                href="/SVIT_Sponcership-Details Document.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#11111a] border border-white/10 text-on-surface text-lg md:text-xl font-black px-8 md:px-12 py-4 md:py-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all active:scale-95 text-center justify-center"
                            >
                                <span className="material-symbols-outlined text-xl md:text-2xl">description</span>
                                BROCHURE
                            </a>
                        </div>
                    </div>
                </section>

                {/* Event Timeline */}
                <section id="timeline" className="py-16 md:py-32 px-4 sm:px-8 bg-[#08080f]/80 backdrop-blur-sm relative border-y border-white/5 animate-fade-up">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 md:mb-20">
                            <h2 className="font-headline text-4xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 uppercase">Event <span className="text-primary">Timeline</span></h2>
                            <div className="h-1.5 w-24 md:w-32 bg-primary mx-auto rounded-full"></div>
                        </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                {[
                                    { label: "Registration Deadline", value: "22 APR 2026", color: "error", icon: "alarm" },
                                    { label: "Hackathon Dates", value: "24th – 25th APR", color: "primary", icon: "calendar_today" },
                                    { label: "Timing", value: "24th 9:00 AM to 25th 9:00 PM", color: "secondary", icon: "schedule" }
                                ].map((item, idx) => (
                                    <div key={idx} className="glass-card p-8 md:p-12 rounded-[24px] md:rounded-[40px] border border-white/10 flex flex-col items-center text-center hover:scale-105 hover:bg-white/[0.03] transition-all group">
                                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-${item.color}/10 flex items-center justify-center mb-6 md:mb-8 text-${item.color} group-hover:rotate-12 transition-transform`}>
                                            <span className="material-symbols-outlined text-3xl md:text-4xl">{item.icon}</span>
                                        </div>
                                        <p className="text-on-surface-variant text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-4">{item.label}</p>
                                        <p className="text-on-surface font-black text-xl md:text-3xl leading-tight">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                    </div>
                </section>

                {/* Prizes Section */}
                <section id="benefits" className="py-16 md:py-32 px-4 sm:px-8 relative overflow-hidden animate-fade-up">
  <div className="max-w-7xl mx-auto flex flex-col items-center">
    
    {/* Heading */}
    <div className="text-center mb-12 md:mb-20">
      <h2 className="font-headline text-4xl md:text-7xl font-black text-on-surface mb-2 md:mb-4 uppercase tracking-tighter">
        REWARDS & <span className="text-secondary">BENEFITS</span>
      </h2>
      <p className="text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs">
        Powered by TenAI’s Consulting India Pvt. Ltd.
      </p>
    </div>

    {/* CASH PRIZE TEASER CARD */}
    <div className="w-full max-w-5xl mb-12 md:mb-16">
      <div className="glass-card p-8 md:p-14 rounded-[32px] md:rounded-[48px] border-2 border-primary relative text-center shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden group">
        
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent animate-glow-pulse pointer-events-none"></div>

        <span className="material-symbols-outlined text-primary text-5xl md:text-7xl mb-4 md:mb-6 relative z-10 animate-float">
          emoji_events
        </span>

        <h3 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 relative z-10 uppercase italic">
          Exciting Cash Prizes
        </h3>

        <p className="text-base md:text-xl font-semibold text-secondary mb-4 md:mb-6 relative z-10">
          Win big rewards for your innovation
        </p>

        <p className="text-xs md:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed relative z-10 px-2 uppercase tracking-wide font-bold opacity-70">
          Top-performing teams will be awarded attractive cash prizes along with exclusive goodies and recognition.
        </p>

        
      </div>
    </div>

    {/* Benefits Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">

      {/* Accelerator Program */}
      <div className="glass-card p-6 md:p-8 rounded-[24px] md:rounded-[40px] border-t-4 border-primary/30 group hover:scale-105 transition-all relative overflow-hidden text-left">
        <span className="material-symbols-outlined text-primary text-4xl md:text-5xl mb-4 md:mb-6">
          rocket_launch
        </span>
        <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-tight">Accelerator Program Support</h4>
        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-80 uppercase tracking-wide font-bold">
          Top 2 teams will get complimentary access to TenAI’s Accelerator Program including mentorship, product development guidance, and structured startup support.
        </p>
      </div>

      {/* Internship Opportunities */}
      <div className="glass-card p-6 md:p-8 rounded-[24px] md:rounded-[40px] border-t-4 border-secondary/30 group hover:scale-105 transition-all relative overflow-hidden text-left">
        <span className="material-symbols-outlined text-secondary text-4xl md:text-5xl mb-4 md:mb-6">
          work
        </span>
        <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-tight">Internship Opportunities</h4>
        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-80 uppercase tracking-wide font-bold">
          High-potential participants, even beyond winners, will be considered for internships through interviews and skill-based assessments.
        </p>
      </div>

      {/* Financial Support */}
      <div className="glass-card p-6 md:p-8 rounded-[24px] md:rounded-[40px] border-t-4 border-green-400/30 group hover:scale-105 transition-all relative overflow-hidden text-left">
        <span className="material-symbols-outlined text-green-400 text-4xl md:text-5xl mb-4 md:mb-6">
          volunteer_activism
        </span>
        <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-tight">Support for Deserving Students</h4>
        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-80 uppercase tracking-wide font-bold">
          Selected financially deserving students will receive internship opportunities along with access to the Accelerator Program based on evaluation.
        </p>
      </div>

      {/* Leaderboard Opportunities */}
      <div className="glass-card p-6 md:p-8 rounded-[24px] md:rounded-[40px] border-t-4 border-yellow-400/30 group hover:scale-105 transition-all relative overflow-hidden text-left">
        <span className="material-symbols-outlined text-yellow-400 text-4xl md:text-5xl mb-4 md:mb-6">
          leaderboard
        </span>
        <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-tight">Leaderboard-Based Careers</h4>
        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-80 uppercase tracking-wide font-bold">
          Consistent performers in hackathons will be recognized and may receive internship or job opportunities via enterprise partnerships.
        </p>
      </div>

      {/* Industry Support */}
      <div className="glass-card p-6 md:p-8 rounded-[24px] md:rounded-[40px] border-t-4 border-orange-400/30 group hover:scale-105 transition-all relative overflow-hidden text-left">
        <span className="material-symbols-outlined text-orange-400 text-4xl md:text-5xl mb-4 md:mb-6">
          engineering
        </span>
        <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 uppercase tracking-tight">Industry Consultancy Support</h4>
        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-80 uppercase tracking-wide font-bold">
          TenAI provides consultancy and end-to-end solution development support for real-world problem statements and sponsors.
        </p>
      </div>

    </div>
  </div>
</section>

                {/* Partnered Industries */}
                <section id="partners" className="py-16 md:py-32 px-4 sm:px-8 border-t border-white/5 animate-fade-up">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 md:mb-20">
                            <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter">PARTNERED <span className="text-primary">INDUSTRIES</span></h2>
                            <p className="text-on-surface-variant font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs mt-2 md:mt-4 opacity-60">Growth through collaboration</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                { name: "Pravara Rural Education Society", logo: "/svitlogo.webp" },
                                { name: "TenAI Consulting", logo: "/TenAI.png" },
                                { name: "Pravara Infotech", logo: "/infotech.png" }
                            ].map((company, idx) => (
                                <div key={idx} className="glass-card p-8 md:p-10 rounded-[20px] md:rounded-[32px] border border-white/10 flex flex-col items-center justify-center text-center hover:bg-primary/[0.05] hover:border-primary/20 transition-all group">
                                    <div className="h-16 md:h-24 flex items-center justify-center mb-4 md:mb-6">
                                        <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <span className="font-headline font-black text-on-surface group-hover:text-primary transition-colors uppercase tracking-widest text-[10px] md:text-sm">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sponsors Section */}
                <section id="sponsors" className="py-16 md:py-32 px-4 sm:px-8 bg-[#08080f]/40 relative overflow-hidden animate-fade-up">
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"></div>
                    </div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-12 md:mb-20">
                            <h2 className="font-headline text-4xl md:text-7xl font-black text-on-surface mb-2 md:mb-4 uppercase tracking-tighter">
                                OUR <span className="text-secondary">SPONSORS</span>
                            </h2>
                            <p className="text-on-surface-variant font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs opacity-60">Empowering the next generation of innovators</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="w-full max-w-2xl px-2">
                                <div className="glass-card p-8 md:p-16 rounded-[32px] md:rounded-[48px] border-2 border-secondary/30 relative text-center shadow-[0_0_50px_rgba(213,117,255,0.1)] overflow-hidden group hover:border-secondary/60 transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    
                                    <div className="h-20 md:h-32 flex items-center justify-center mb-6 md:mb-10">
                                        <img src="/TenAI.png" alt="TenAI" className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 uppercase tracking-tighter">TenAI Consulting</h3>
                                    <p className="text-on-surface-variant text-sm md:text-lg mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto uppercase font-bold tracking-wide opacity-70">
                                        Leading the charge in intelligent solutions and sustainable digital transformation.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                        <a 
                                            href="https://studio.tenais.in/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-secondary text-on-secondary px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm"
                                        >
                                            <span className="material-symbols-outlined text-sm md:text-base">language</span>
                                            Visit Website
                                        </a>
                                        <a 
                                            href="https://play.google.com/store/apps/details?id=com.tenais.tenaisstudio&pli=1" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-white/5 border border-white/10 text-on-surface px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm"
                                        >
                                            <span className="material-symbols-outlined text-sm md:text-base">phone_android</span>
                                            Get App
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info & Participation */}
                <section className="py-16 md:py-32 px-4 sm:px-8 bg-[#08080f]/60 animate-fade-up">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                        <div className="glass-card p-8 md:p-12 rounded-[24px] md:rounded-[40px] border border-white/10 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-primary mb-6 md:mb-8 group-hover:animate-bounce">
                                <span className="material-symbols-outlined text-3xl md:text-4xl">groups</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black mb-4 uppercase">Who Can Participate?</h3>
                            <p className="text-on-surface-variant text-sm md:text-lg leading-relaxed mb-6 font-bold uppercase tracking-wide opacity-70">
                                Open to all engineering and technology students across the state.
                            </p>
                            <div className="bg-primary/20 px-6 md:px-8 py-3 rounded-xl md:rounded-2xl border border-primary/30">
                                <p className="text-primary font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-[10px] md:text-sm">Team Size: 1 – 5 Members</p>
                            </div>
                        </div>
                        <div className="glass-card p-8 md:p-12 rounded-[24px] md:rounded-[40px] border border-white/10 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-secondary mb-6 md:mb-8 group-hover:animate-bounce">
                                <span className="material-symbols-outlined text-3xl md:text-4xl">payments</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black mb-4 uppercase">Registration Fee?</h3>
                            <p className="text-on-surface-variant text-sm md:text-lg leading-relaxed mb-6 font-bold uppercase tracking-wide opacity-70">
                                Registration fee of ₹200 per student. Invest in your innovation and secure your spot!
                            </p>
                            <div className="bg-secondary/20 px-6 md:px-8 py-3 rounded-xl md:rounded-2xl border border-secondary/30">
                                <p className="text-secondary font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-[10px] md:text-sm">₹200 PER STUDENT</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-16 md:py-32 px-4 sm:px-8 border-t border-white/5 animate-fade-up">
                    <div className="max-w-4xl mx-auto glass-card p-8 md:p-20 rounded-[32px] md:rounded-[64px] border border-white/10 shadow-2xl relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="mb-10 md:mb-16">
                                <h3 className="font-headline text-3xl md:text-4xl font-black mb-2 md:mb-6 uppercase tracking-tighter">FOR <span className="text-primary">QUERIES</span></h3>
                                <p className="text-on-surface-variant font-black tracking-widest uppercase text-[10px] md:text-xs opacity-60">Reach out to our organizing team</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-left">
                                <div className="space-y-2 md:space-y-4">
                                    <p className="text-[8px] md:text-[10px] text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Coordinator</p>
                                    <h4 className="text-lg md:text-2xl font-black text-on-surface uppercase">Prof. Rushikesh Bhalerao</h4>
                                    <a href="tel:+919561508626" className="text-primary font-black text-base md:text-lg hover:drop-shadow-[0_0_8px_#8ff5ff] transition-all flex items-center gap-2 md:gap-3">
                                        <span className="material-symbols-outlined text-sm md:text-base">call</span>
                                        +91 95615 08626
                                    </a>
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <p className="text-[8px] md:text-[10px] text-secondary font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Lead Organizer</p>
                                    <h4 className="text-lg md:text-2xl font-black text-on-surface uppercase font-bold">Dr. Rahul Dhokane</h4>
                                    <a href="tel:+918668428388" className="text-secondary font-black text-base md:text-lg hover:drop-shadow-[0_0_8px_#d575ff] transition-all flex items-center gap-2 md:gap-3">
                                        <span className="material-symbols-outlined text-sm md:text-base">call</span>
                                        +91 86684 28388
                                    </a>
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <p className="text-[8px] md:text-[10px] text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Student Coordinator</p>
                                    <h4 className="text-lg md:text-2xl font-black text-on-surface uppercase font-bold">Prathmesh Gangurde</h4>
                                    <a href="tel:+919970694027" className="text-primary font-black text-base md:text-lg hover:drop-shadow-[0_0_8px_#8ff5ff] transition-all flex items-center gap-2 md:gap-3">
                                        <span className="material-symbols-outlined text-sm md:text-base">call</span>
                                        +91 99706 94027
                                    </a>
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <p className="text-[8px] md:text-[10px] text-secondary font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Technical Team</p>
                                    <h4 className="text-lg md:text-2xl font-black text-on-surface uppercase font-bold">Yogesh Chavan</h4>
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <p className="text-[8px] md:text-[10px] text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Technical Team</p>
                                    <h4 className="text-lg md:text-2xl font-black text-on-surface uppercase font-bold">Pravin Pagar</h4>
                                </div>
                            </div>
                            <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/5 flex flex-col items-center gap-6 md:gap-8">
                                <p className="text-[8px] md:text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-40">Organized By</p>
                                <p className="text-lg md:text-3xl font-black text-on-surface text-center leading-tight uppercase tracking-tighter">DEPARTMENT OF INFORMATION TECHNOLOGY</p>
                                <div className="flex gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all pointer-events-none">
                                    <span className="text-sm md:text-xl font-bold italic tracking-tighter uppercase">Powered by SVIT Nasik</span>
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
               
                <div className="text-on-surface-variant opacity-30 text-[10px] font-bold tracking-[0.3em] uppercase text-center max-w-lg leading-[2.5]">
                    © 2026 SVIT Department of IT. <br />
                    Engineered with pure innovation.
                </div>
            </footer>
        </div>
    );
};


export default LandingPage;
