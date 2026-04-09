import React from 'react';
import Navbar from '../components/Navbar';

const Guidelines = () => {
    const sections = [
        {
            title: "Event Rules",
            icon: "gavel",
            rules: [
                "The hackathon is a 48-hour event. Teams must submit their projects before the deadline.",
                "All work must be original and created during the event period.",
                "Teams can use open-source libraries but must declare them in their submission.",
                "Decisions made by the judges are final and binding."
            ]
        },
        {
            title: "Participation Guidelines",
            icon: "how_to_reg",
            rules: [
                "Open to all engineering and technology students currently enrolled in a recognized institution.",
                "Team size must be between 1 to 5 members.",
                "Cross-college teams are permitted and encouraged.",
                "Each participant must carry a valid college ID card during the grand finale."
            ]
        },
        {
            title: "Code of Conduct",
            icon: "verified_user",
            rules: [
                "Respect all participants, mentors, and organizers.",
                "SVIT HackVerse is committed to providing a harassment-free experience for everyone.",
                "Plagiarism or use of pre-existing intellectual property without authorization is strictly prohibited.",
                "Maintain professional decorum throughout the duration of the event."
            ]
        }
    ];

    return (
        <div className="bg-[#05050a] text-on-surface font-body min-h-screen overflow-x-hidden relative">
            <Navbar />
            
            {/* Background elements to match Landing Page */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-glow-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-glow-pulse delay-700"></div>
            </div>

            <main className="pt-32 pb-20 px-8 relative z-10 max-w-5xl mx-auto animate-fade-up">
                <div className="text-center mb-16">
                    <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 uppercase">
                        HackVerse <span className="text-primary">Guidelines</span>
                    </h1>
                    <div className="h-1.5 w-32 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <div key={idx} className="glass-card p-8 md:p-12 rounded-[40px] border border-white/10 hover:border-primary/20 transition-all group">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">{section.icon}</span>
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter">{section.title}</h2>
                            </div>
                            <ul className="space-y-4">
                                {section.rules.map((rule, ridx) => (
                                    <li key={ridx} className="flex gap-4 text-on-surface-variant text-lg leading-relaxed">
                                        <span className="text-primary font-bold mt-1">▹</span>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm mb-8 opacity-60">Ready to build the future?</p>
                    <a href="/register" className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-12 py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30">
                        Join the HackVerse
                    </a>
                </div>
            </main>

            {/* Reuse footer from LandingPage or simplified version */}
            <footer className="bg-[#020205] py-20 flex flex-col items-center gap-10 px-8 border-t border-white/5 relative z-30">
                <div className="text-on-surface-variant opacity-30 text-[10px] font-bold tracking-[0.3em] uppercase text-center max-w-lg leading-[2.5]">
                    © 2026 SVIT Department of IT. <br />
                    Engineered with pure innovation.
                </div>
            </footer>
        </div>
    );
};

export default Guidelines;
