import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        netRevenue: 0
    });
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                // Fetch Stats
                const statsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`);
                const statsData = await statsRes.json();
                if (statsData.success) setStats(statsData.stats);

                // Fetch Registrations
                const regRes = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/registrations`);
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

    const handleExport = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/export`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'SVIT_HackVerse_Registrations.xlsx';
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert('Failed to generate report.');
            }
        } catch (error) {
            console.error('Export error:', error);
            alert('An error occurred during export.');
        }
    };

    return (
        <div className="bg-background text-on-surface font-body cyber-grid min-h-screen text-left">
            {/* Main Content Area */}
            <main className="p-4 sm:p-6 md:p-10">
                {/* Header */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 md:mb-12">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold tracking-tighter text-on-surface mb-2 uppercase italic leading-none">Command Center</h1>
                        <p className="text-on-surface-variant font-label text-[10px] md:text-sm flex items-center gap-2 font-black uppercase tracking-widest opacity-60">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            SVIT HACKATHON CORE NODE v2.0.4
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-4 items-center w-full lg:w-auto">
                        <button 
                            onClick={handleLogout}
                            className="flex-1 lg:flex-none bg-error/10 border border-error/20 text-error font-label px-4 md:px-6 py-2.5 rounded-full hover:bg-error/20 transition-all flex items-center justify-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined text-sm md:text-base">logout</span> Logout
                        </button>
                        <button 
                            onClick={handleExport}
                            className="flex-[2] lg:flex-none bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold px-6 md:px-10 py-2.5 rounded-full shadow-[0_0_20px_rgba(0,238,252,0.3)] hover:scale-105 active:scale-95 transition-all text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3"
                        >
                            <span className="material-symbols-outlined text-sm md:text-base">assessment</span> Export Master Report
                        </button>
                    </div>
                </header>

                {/* Bento Grid Data Viz */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                    {/* Total Registrations */}
                    <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between border border-white/5 border-t-2 border-t-primary/30 min-h-[160px] md:min-h-[200px]">
                        <div className="text-left">
                            <span className="text-[9px] md:text-[10px] font-label text-primary uppercase tracking-[0.2em] mb-1 block font-black">Total Registrations</span>
                            <h3 className="text-4xl md:text-6xl font-headline font-black text-on-surface">{stats.totalRegistrations}</h3>
                        </div>
                        <div className="mt-4 md:mt-8 flex items-end gap-1 md:gap-2 h-8 md:h-12">
                            {[0.2, 0.3, 0.4, 0.6, 1].map((op, i) => (
                                <div key={i} className="w-full bg-primary h-full rounded-sm" style={{ opacity: op, height: `${(i+1)*20}%` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue */}
                    <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 border-t-2 border-t-secondary/30 text-left min-h-[160px] md:min-h-[200px]">
                        <div className="text-left">
                            <span className="text-[9px] md:text-[10px] font-label text-secondary uppercase tracking-[0.2em] mb-1 block font-black">Net Revenue</span>
                            <div className="flex items-baseline gap-1 md:gap-2">
                                <span className="text-2xl md:text-4xl font-headline font-light text-secondary-fixed">₹</span>
                                <h3 className="text-4xl md:text-6xl font-headline font-black text-on-surface">{stats.netRevenue.toLocaleString()}</h3>
                            </div>
                            <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3 text-[10px] font-label text-on-surface-variant font-black tracking-widest uppercase">
                                <span className="text-green-400 flex items-center gap-1"><span className="material-symbols-outlined text-xs md:text-sm">trending_up</span> +12.5%</span>
                                <span className="opacity-40">vs. prev phase</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Table Section */}
                <section className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative z-10">
                    <div className="px-6 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/5">
                        <h3 className="text-lg md:text-xl font-headline font-bold tracking-tight uppercase">Recent Registrations</h3>
                        <div className="relative w-full sm:w-64">
                            <span className="absolute inset-y-0 left-3 flex items-center text-on-surface-variant">
                                <span className="material-symbols-outlined text-sm">search</span>
                            </span>
                            <input className="bg-surface-container-highest border-none text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full pl-10 pr-6 py-2 md:py-2.5 w-full focus:ring-1 focus:ring-primary placeholder:opacity-50" placeholder="Search teams..." type="text"/>
                        </div>
                    </div>
                    <div className="overflow-x-auto scrollbar-hide">
                        {loading ? (
                            <div className="p-12 md:p-20 text-center font-black uppercase text-xs md:text-sm tracking-[0.3em] md:tracking-[0.5em] text-primary animate-pulse">Synchronizing Data...</div>
                        ) : (
                            <table className="w-full text-left font-body min-w-[600px]">
                                <thead className="bg-surface-container-low text-[9px] md:text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-black">
                                    <tr>
                                        <th className="px-6 md:px-8 py-3 md:py-4">Team Name</th>
                                        <th className="px-6 md:px-8 py-3 md:py-4">Team Size</th>
                                        <th className="px-6 md:px-8 py-3 md:py-4 text-right">Leader Mobile</th>
                                        <th className="px-6 md:px-8 py-3 md:py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {registrations.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 md:px-8 py-8 md:py-10 text-center opacity-30 uppercase font-black tracking-widest text-[10px]">No registrations found in node</td></tr>
                                    ) : (
                                        registrations.map((team, idx) => (
                                            <tr 
                                                key={team._id || idx} 
                                                onClick={() => setSelectedTeam(team)}
                                                className="group hover:bg-white/5 transition-all cursor-pointer"
                                            >
                                                <td className="px-6 md:px-8 py-4 md:py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary font-headline font-bold text-[10px] md:text-xs border border-primary/20 flex-shrink-0 group-hover:bg-primary/20 transition-all">
                                                            {team.teamName.charAt(0)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-xs md:text-sm font-bold truncate max-w-[120px] md:max-w-none">{team.teamName}</div>
                                                            <div className="text-[8px] md:text-[10px] text-on-surface-variant font-black tracking-widest uppercase opacity-40">#{team._id?.slice(-4) || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-4 md:py-5">
                                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 font-mono">{team.teamSize} Members</span>
                                                </td>
                                                <td className="px-6 md:px-8 py-4 md:py-5 text-right">
                                                    <span className="text-xs md:text-sm font-bold text-primary font-mono">{team.leaderPhone}</span>
                                                </td>
                                                <td className="px-6 md:px-8 py-4 md:py-5 text-right">
                                                    <button className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-lg md:text-xl">visibility</button>
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

            {/* Registration Details Modal */}
            {selectedTeam && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#000000]/80 backdrop-blur-xl animate-fade-in text-left">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-white/5 rounded-3xl shadow-2xl p-6 md:p-10 animate-scale-up scrollbar-hide">
                        <button 
                            onClick={() => setSelectedTeam(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <div className="flex flex-col gap-10">
                            {/* Header */}
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block italic">Detailed Registration Profile</span>
                                <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-on-surface">{selectedTeam.teamName}</h2>
                                <p className="text-on-surface-variant font-black uppercase text-[10px] tracking-widest mt-2">{selectedTeam.college}</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Left Column: Team Info */}
                                <div className="space-y-8">
                                    {/* Leader Info */}
                                    <div className="space-y-4">
                                        <h3 className="font-headline font-black text-xs uppercase tracking-widest text-[#00F0FF] flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">person</span> Leader Information
                                        </h3>
                                        <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                            <p className="text-sm font-bold">{selectedTeam.leaderName}</p>
                                            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">{selectedTeam.leaderEmail}</p>
                                            <p className="text-[10px] text-primary font-black uppercase tracking-widest">{selectedTeam.leaderPhone}</p>
                                        </div>
                                    </div>

                                    {/* Members Info */}
                                    {selectedTeam.members && selectedTeam.members.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="font-headline font-black text-xs uppercase tracking-widest text-[#00F0FF] flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">groups</span> Squad Members
                                            </h3>
                                            <div className="space-y-3">
                                                {selectedTeam.members.map((member, i) => (
                                                    <div key={i} className="bg-white/5 p-4 rounded-xl space-y-1">
                                                        <p className="text-xs font-bold">{member.name}</p>
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                            <span className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest">{member.email}</span>
                                                            <span className="text-[9px] text-primary font-black uppercase tracking-widest">{member.phone}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl">
                                            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Track</p>
                                            <p className="text-xs font-bold uppercase">{selectedTeam.track || 'General'}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl">
                                            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Status</p>
                                            <p className="text-xs font-bold uppercase text-amber-400">{selectedTeam.status}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Payment & Proof */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="font-headline font-black text-xs uppercase tracking-widest text-[#00F0FF] flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">receipt_long</span> Payment Verification
                                        </h3>
                                        <div className="bg-white/5 p-4 rounded-xl space-y-4 border border-white/5">
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Transaction ID</p>
                                                <p className="text-sm font-bold font-mono text-primary">{selectedTeam.transactionId || 'NOT_FOUND'}</p>
                                            </div>
                                            
                                            {selectedTeam.paymentProof ? (
                                                <div className="space-y-3">
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant">Proof of Payment</p>
                                                    <div className="relative group overflow-hidden rounded-xl border border-white/10 hover:border-primary/50 transition-all cursor-zoom-in">
                                                        <img 
                                                            src={`${import.meta.env.VITE_API_URL}${selectedTeam.paymentProof}`} 
                                                            alt="Payment Proof" 
                                                            className="w-full h-auto max-h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                                                            onClick={() => window.open(`${import.meta.env.VITE_API_URL}${selectedTeam.paymentProof}`, '_blank')}
                                                        />
                                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center pointer-events-none">
                                                            <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-[9px] text-on-surface-variant/50 uppercase text-center font-bold tracking-widest italic">Click image to enlarge</p>
                                                </div>
                                            ) : (
                                                <div className="h-32 bg-surface-container-highest/20 rounded-xl flex items-center justify-center text-xs text-on-surface-variant font-bold uppercase tracking-[0.2em] italic">
                                                    Screenshot Missing
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {/* Footer Identity */}
            <footer className="py-16 flex flex-col items-center gap-8 px-8 border-t border-white/5 bg-[#000000]">
                <div className="text-2xl font-black text-[#00F0FF] font-headline uppercase tracking-[0.3em]">SVIT HackVerse 2k26</div>

                <p className="text-[10px] font-black tracking-[0.4em] text-on-surface-variant/30 uppercase text-center leading-loose leading-relaxed">
                    © 2026 SVIT Department of IT. <br />
                    System Status: Operational [v2.0.4]
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;

