import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        netRevenue: 0,
        quotaCapacity: 0
    });
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                // Fetch Stats
                const statsRes = await fetch('http://localhost:5000/api/admin/stats');
                const statsData = await statsRes.json();
                if (statsData.success) setStats(statsData.stats);

                // Fetch Registrations
                const regRes = await fetch('http://localhost:5000/api/admin/registrations');
                const regData = await regRes.json();
                if (regData.success) setRegistrations(regData.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    return (
        <div className="bg-background text-on-surface font-body cyber-grid min-h-screen text-left">
            {/* Main Content Area */}
            <main className="p-6 md:p-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-headline font-bold tracking-tighter text-on-surface mb-2 uppercase italic">Command Center</h1>
                        <p className="text-on-surface-variant font-label text-sm flex items-center gap-2 font-black uppercase tracking-widest opacity-60">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            SVIT HACKATHON CORE NODE v2.0.4
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={handleLogout}
                            className="bg-error/10 border border-error/20 text-error font-label px-6 py-2 rounded-full hover:bg-error/20 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                        >
                            <span className="material-symbols-outlined text-sm">logout</span> Logout
                        </button>
                        <button className="bg-surface-container-high border border-outline-variant text-on-surface font-label px-6 py-2 rounded-full hover:bg-surface-bright transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">download</span> Export Data
                        </button>
                        <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold px-8 py-2 rounded-full shadow-[0_0_20px_rgba(0,238,252,0.3)] hover:scale-105 transition-all text-xs uppercase tracking-[0.2em]">
                            Generate Report
                        </button>
                    </div>
                </header>

                {/* Bento Grid Data Viz */}
                <section className="grid grid-cols-12 gap-6 mb-12">
                    {/* Total Registrations */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-8 rounded-2xl flex flex-col justify-between border border-white/5 border-t-2 border-t-primary/30">
                        <div className="text-left">
                            <span className="text-[10px] font-label text-primary uppercase tracking-[0.2em] mb-1 block font-black">Total Registrations</span>
                            <h3 className="text-6xl font-headline font-black text-on-surface">{stats.totalRegistrations}</h3>
                        </div>
                        <div className="mt-8 flex items-end gap-2 h-12">
                            {[0.2, 0.3, 0.4, 0.6, 1].map((op, i) => (
                                <div key={i} className="w-full bg-primary h-full rounded-sm" style={{ opacity: op, height: `${(i+1)*20}%` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-8 rounded-2xl border border-white/5 border-t-2 border-t-secondary/30 text-left">
                        <div className="text-left">
                            <span className="text-[10px] font-label text-secondary uppercase tracking-[0.2em] mb-1 block font-black">Net Revenue</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-headline font-light text-secondary-fixed">₹</span>
                                <h3 className="text-6xl font-headline font-black text-on-surface">{stats.netRevenue.toLocaleString()}</h3>
                            </div>
                            <div className="mt-6 flex items-center gap-3 text-xs font-label text-on-surface-variant font-black tracking-widest uppercase">
                                <span className="text-green-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">trending_up</span> +12.5%</span>
                                <span className="opacity-40">vs. prev phase</span>
                            </div>
                        </div>
                    </div>

                    {/* System Health / Status */}
                    <div className="col-span-12 md:col-span-12 lg:col-span-4 glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-white/5 border-t-2 border-t-tertiary/30">
                        <div className="relative w-24 h-24 mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="4"></circle>
                                <circle className="text-tertiary drop-shadow-[0_0_8px_#ff51fa]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * stats.quotaCapacity / 100)} strokeWidth="4"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-headline font-bold">{stats.quotaCapacity}%</span>
                            </div>
                        </div>
                        <h4 className="text-lg font-headline font-bold text-on-surface uppercase tracking-widest">Quota Capacity</h4>
                        <p className="text-[10px] font-label text-on-surface-variant/70 uppercase mt-1 font-black tracking-widest">{Math.floor(stats.quotaCapacity * 3.1)}/310 Spots Filled</p>
                    </div>
                </section>

                {/* Table Section */}
                <section className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative z-10">
                    <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5">
                        <h3 className="text-xl font-headline font-bold tracking-tight uppercase">Recent Registrations</h3>
                        <div className="relative w-full md:w-64">
                            <span className="absolute inset-y-0 left-3 flex items-center text-on-surface-variant">
                                <span className="material-symbols-outlined text-sm">search</span>
                            </span>
                            <input className="bg-surface-container-highest border-none text-[10px] font-black uppercase tracking-widest rounded-full pl-10 pr-6 py-2.5 w-full focus:ring-1 focus:ring-primary" placeholder="Search teams..." type="text"/>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="p-20 text-center font-black uppercase tracking-[0.5em] text-primary animate-pulse">Synchronizing Data...</div>
                        ) : (
                            <table className="w-full text-left font-body">
                                <thead className="bg-surface-container-low text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">
                                    <tr>
                                        <th className="px-8 py-4">Team Name</th>
                                        <th className="px-8 py-4">Track</th>
                                        <th className="px-8 py-4">College</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {registrations.length === 0 ? (
                                        <tr><td colSpan="5" className="px-8 py-10 text-center opacity-30 uppercase font-black tracking-widest">No registrations found in node</td></tr>
                                    ) : (
                                        registrations.map((team, idx) => (
                                            <tr key={team._id || idx} className="group hover:bg-white/5 transition-all cursor-pointer">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-headline font-bold text-xs border border-primary/20 flex-shrink-0">
                                                            {team.teamName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold">{team.teamName}</div>
                                                            <div className="text-[10px] text-on-surface-variant font-black tracking-widest uppercase opacity-40">#{team._id?.slice(-4) || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{team.track || 'General'}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 truncate max-w-[150px] inline-block">{team.college}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${team.status === 'Confirmed' ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'}`}></div>
                                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${team.status === 'Confirmed' ? 'text-green-400' : 'text-amber-400'}`}>{team.status || 'Pending'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">more_vert</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            </main>


            {/* Footer Identity */}
            <footer className="py-16 flex flex-col items-center gap-8 px-8 border-t border-white/5 bg-[#000000]">
                <div className="text-2xl font-black text-[#00F0FF] font-headline uppercase tracking-[0.3em]">SVIT HackVerse 2k26</div>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                    {['Guidelines', 'Sponsors', 'Contact Us', 'Privacy Policy'].map((link) => (
                        <a key={link} className="text-on-surface-variant hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest" href="#">{link}</a>
                    ))}
                </div>
                <p className="text-[10px] font-black tracking-[0.4em] text-on-surface-variant/30 uppercase text-center leading-loose leading-relaxed">
                    © 2026 SVIT Department of IT. <br />
                    System Status: Operational [v2.0.4]
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;

