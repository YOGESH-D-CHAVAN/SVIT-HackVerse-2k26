import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isSpecialPage = location.pathname !== '/';

    const menuItems = [
        { name: 'Timeline', path: '/#timeline' },
        { name: 'Prizes', path: '/#benefits' },
        { name: 'Partners', path: '/#partners' },
        { name: 'Guidelines', path: '/guidelines' },
        { name: 'Seating Arrangement', path: '/seat-arrangement' },
        { name: 'My QR', path: '/my-qr' },
        { name: 'Contact', path: '/#contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-[100] bg-[#0d0d17]/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-8 h-20 font-headline tracking-tight text-on-surface border-b border-white/5">
            <div className="flex items-center gap-3">
                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-dim hover:bg-white/10 transition-all border border-white/5"
                >
                    <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
                </button>
                
                <Link to="/" onClick={() => setIsOpen(false)} className="text-xl md:text-2xl font-bold tracking-tighter text-[#00F0FF] hover:drop-shadow-[0_0_8px_#00F0FF] transition-all truncate max-w-[150px] sm:max-w-none">
                    SVIT HackVerse 2k26
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                    item.path.startsWith('/#') ? (
                        <a 
                            key={item.name} 
                            href={item.path} 
                            className="text-on-surface-variant hover:text-[#00F0FF] transition-all duration-300 font-bold uppercase text-xs tracking-widest relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F0FF] group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ) : (
                        <NavLink 
                            key={item.name} 
                            to={item.path} 
                            className={({ isActive }) => `text-on-surface-variant hover:text-[#00F0FF] transition-all duration-300 font-bold uppercase text-xs tracking-widest relative group ${isActive ? 'text-[#00F0FF]' : ''}`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#00F0FF] transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </NavLink>
                    )
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Link 
                    to={isSpecialPage ? "/" : "/register"} 
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 md:px-8 py-2.5 rounded-full font-bold tracking-tight hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20 text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap"
                >
                    {isSpecialPage ? "Back Home" : "Register Now"}
                </Link>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`absolute top-full left-0 w-full bg-[#0d0d17]/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-500 overflow-hidden md:hidden ${isOpen ? 'max-h-[500px] py-8 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                <div className="flex flex-col items-center gap-6">
                    {menuItems.map((item) => (
                        <a 
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className="text-on-surface-variant hover:text-primary font-bold uppercase text-sm tracking-[0.2em] transition-all"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
