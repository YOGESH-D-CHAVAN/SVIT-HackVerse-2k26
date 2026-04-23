import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AttendanceList = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchAttendance();
    }, [navigate]);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/attendance/list`);
            const data = await res.json();
            if (data.success) {
                setRecords(data.data);
            }
        } catch (error) {
            console.error('Error fetching attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/attendance/sync`, { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchAttendance();
            }
        } catch (error) {
            alert('Sync failed');
        } finally {
            setSyncing(false);
        }
    };

    const filteredRecords = records.filter(r => 
        r.name.toLowerCase().includes(search.toLowerCase()) || 
        r.teamName.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase())
    );

    const attendedCount = records.filter(r => r.isAttended).length;

    return (
        <div className="bg-[#05050a] text-on-surface font-body min-h-screen flex flex-col text-left">
            <Navbar />
            
            {/* Spacer for Fixed Navbar */}
            <div className="h-24 sm:h-32 md:h-40"></div>
            
            <main className="flex-grow p-4 sm:p-6 md:p-10">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 sm:mb-12">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-headline font-bold tracking-tighter uppercase italic leading-none text-primary">Attendance Log</h2>
                        <p className="text-on-surface-variant font-label text-[8px] sm:text-[10px] md:text-sm font-black uppercase tracking-widest mt-2 opacity-60">Real-time participation matrix</p>
                    </div>
                    <div className="flex flex-wrap gap-3 sm:gap-4 w-full lg:w-auto">
                        <button 
                            onClick={handleSync}
                            disabled={syncing}
                            className="flex-1 lg:flex-none bg-white/5 border border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-white/10 text-[9px] sm:text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            {syncing ? 'Syncing...' : 'Sync New Data'}
                        </button>
                        <button 
                            onClick={() => navigate('/admin/scanner')}
                            className="flex-1 lg:flex-none bg-secondary text-on-secondary px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-headline font-black text-[9px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-secondary/20"
                        >
                            Open Scanner
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5 border-t-2 border-t-primary/30">
                        <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Synced</p>
                        <h3 className="text-2xl sm:text-4xl font-headline font-black">{records.length}</h3>
                    </div>
                    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5 border-t-2 border-t-green-500/30">
                        <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-green-500 mb-1">Attended</p>
                        <h3 className="text-2xl sm:text-4xl font-headline font-black">{attendedCount}</h3>
                    </div>
                    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5 border-t-2 border-t-secondary/30 sm:col-span-2 lg:col-span-1">
                        <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Attendance Rate</p>
                        <h3 className="text-2xl sm:text-4xl font-headline font-black">
                            {records.length > 0 ? Math.round((attendedCount / records.length) * 100) : 0}%
                        </h3>
                    </div>
                </div>

                <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                    <div className="p-5 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h3 className="text-base sm:text-xl font-headline font-bold uppercase">Participants Matrix</h3>
                        <div className="relative w-full sm:w-80">
                            <span className="absolute inset-y-0 left-4 flex items-center text-on-surface-variant">
                                <span className="material-symbols-outlined text-sm">search</span>
                            </span>
                            <input 
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/5 border-none rounded-full pl-11 pr-6 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-primary placeholder:opacity-30"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left font-body min-w-[700px]">
                            <thead className="bg-white/5 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                                <tr>
                                    <th className="px-6 sm:px-8 py-4 sm:py-5">Participant</th>
                                    <th className="px-6 sm:px-8 py-4 sm:py-5">Squad</th>
                                    <th className="px-6 sm:px-8 py-4 sm:py-5">Role</th>
                                    <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Status</th>
                                    <th className="px-6 sm:px-8 py-4 sm:py-5 text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan="5" className="px-8 py-20 text-center text-primary font-black uppercase tracking-[0.4em] animate-pulse text-[10px]">Accessing Stream...</td></tr>
                                ) : filteredRecords.length === 0 ? (
                                    <tr><td colSpan="5" className="px-8 py-20 text-center opacity-30 font-black uppercase tracking-widest text-[10px]">No records found</td></tr>
                                ) : (
                                    filteredRecords.map((record) => (
                                        <tr key={record._id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 sm:px-8 py-4 sm:py-5">
                                                <div className="font-bold text-xs sm:text-sm">{record.name}</div>
                                                <div className="text-[8px] sm:text-[9px] text-on-surface-variant font-black uppercase tracking-widest opacity-40 truncate max-w-[150px]">{record.email}</div>
                                            </td>
                                            <td className="px-6 sm:px-8 py-4 sm:py-5">
                                                <div className="text-[10px] sm:text-xs font-bold text-secondary uppercase">{record.teamName}</div>
                                            </td>
                                            <td className="px-6 sm:px-8 py-4 sm:py-5">
                                                <span className={`px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest ${record.role === 'leader' ? 'bg-primary/10 text-primary' : 'bg-white/5 text-on-surface-variant'}`}>
                                                    {record.role}
                                                </span>
                                            </td>
                                            <td className="px-6 sm:px-8 py-4 sm:py-5 text-center">
                                                <div className="flex justify-center">
                                                    {record.isAttended ? (
                                                        <span className="flex items-center gap-1.5 text-green-400 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Present
                                                        </span>
                                                    ) : (
                                                        <span className="text-on-surface-variant opacity-30 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">Absent</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 sm:px-8 py-4 sm:py-5 text-right">
                                                <span className="text-[9px] sm:text-[10px] font-mono text-on-surface-variant">
                                                    {record.attendedAt ? new Date(record.attendedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AttendanceList;
