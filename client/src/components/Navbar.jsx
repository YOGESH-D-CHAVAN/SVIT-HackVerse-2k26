import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isSpecialPage = location.pathname !== '/';

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0d0d17]/60 backdrop-blur-xl flex justify-between items-center px-8 h-20 font-headline tracking-tight text-on-surface border-b border-white/5">
            <div className="flex items-baseline gap-2 group cursor-pointer">
                <Link to="/" className="text-2xl font-bold tracking-tighter text-[#00F0FF] group-hover:drop-shadow-[0_0_8px_#00F0FF] transition-all">
                    SVIT HackVerse 2k26
                </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
                {[
                    { name: 'Timeline', path: '/#timeline' },
                    { name: 'Prizes', path: '/#benefits' },
                    { name: 'Partners', path: '/#partners' },
                    { name: 'Guidelines', path: '/guidelines' },
                    { name: 'Contact', path: '/#contact' },
                ].map((item) => (
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
            <Link 
                to={isSpecialPage ? "/" : "/register"} 
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-2.5 rounded-full font-bold tracking-tight hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20 text-xs uppercase tracking-widest"
            >
                {isSpecialPage ? "Back Home" : "Register Now"}
            </Link>
        </nav>
    );
};

export default Navbar;
