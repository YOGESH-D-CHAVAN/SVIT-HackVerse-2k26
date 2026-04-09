import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modem = ({ teamName, onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#000000]/80 backdrop-blur-xl animate-fade-in text-left">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="relative w-full max-w-lg glass-panel p-10 rounded-[40px] border border-primary/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] text-center space-y-8 animate-scale-up">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <span className="material-symbols-outlined text-primary text-5xl animate-bounce">rocket_launch</span>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-headline font-black text-on-surface uppercase tracking-tighter italic">
                        Deployment <span className="text-primary">Success!</span>
                    </h2>
                    <div className="h-0.5 w-16 bg-primary mx-auto rounded-full"></div>
                    <p className="text-on-surface-variant font-medium leading-relaxed">
                        Greetings, <span className="text-on-surface font-black uppercase text-primary">{teamName}</span>! Your squad has been successfully registered in the SVIT HackVerse 2k26 node.
                    </p>
                </div>

                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                    <p className="text-sm font-headline font-black uppercase tracking-[0.2em] text-tertiary">
                        All the best for the competition!
                    </p>
                </div>

                <button 
                    onClick={() => {
                        onClose();
                        navigate('/');
                    }}
                    className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-black text-lg rounded-2xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                >
                    Return to Mission Control
                    <span className="material-symbols-outlined">home</span>
                </button>
            </div>
        </div>
    );
};

export default Modem;
