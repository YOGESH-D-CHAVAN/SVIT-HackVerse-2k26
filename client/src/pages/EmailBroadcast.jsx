import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EmailBroadcast = () => {
    const navigate = useNavigate();
    const [emailSubject, setEmailSubject] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [testEmail, setTestEmail] = useState('panditprathamesh97@gmail.com');
    const [emailResults, setEmailResults] = useState([]);
    const [stats, setStats] = useState({ totalRegistrations: 0 });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        const fetchStats = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/api/admin/stats`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) setStats(data.stats);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [navigate]);

    const handleSendEmail = async (isTest = false) => {
        if (!emailSubject || !emailMessage) {
            alert('Please enter subject and message.');
            return;
        }

        setEmailLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/api/admin/send-bulk-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({
                    subject: emailSubject,
                    message: emailMessage,
                    testEmail: isTest ? testEmail : null
                }),
            });

            const data = await response.json();
            if (data.success) {
                if (!isTest) {
                    setEmailResults(data.results || []);
                    alert(`${data.message} Sent: ${data.stats?.sent}, Failed: ${data.stats?.failed}`);
                } else {
                    alert(data.message);
                }
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Email error:', error);
            alert('Failed to send email.');
        } finally {
            setEmailLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d17] text-white pt-24 pb-12 px-4 md:px-8 font-sans overflow-x-hidden cyber-grid">
            <Navbar />
            
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#7000FF] tracking-tighter">
                            BROADCAST CENTER
                        </h1>
                        <p className="text-gray-400 mt-2 font-mono text-sm tracking-widest uppercase opacity-60">
                            System Node: Announcement Broadcaster v1.0
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="bg-white/5 border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Command Center
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Main Form */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00F0FF]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] ml-1">Email Subject</label>
                                <input 
                                    type="text" 
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    placeholder="Enter formal subject line..."
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00F0FF] transition-all text-sm font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] ml-1">Message Content</label>
                                <textarea 
                                    rows="10"
                                    value={emailMessage}
                                    onChange={(e) => setEmailMessage(e.target.value)}
                                    placeholder="Compose your professional announcement here..."
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00F0FF] transition-all text-sm resize-none leading-relaxed"
                                ></textarea>
                            </div>

                            {/* Test Section */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-fixed ml-1">Security Verification (Test Send)</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input 
                                        type="email" 
                                        value={testEmail}
                                        onChange={(e) => setTestEmail(e.target.value)}
                                        className="flex-grow bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary transition-all text-xs font-mono"
                                        placeholder="test@example.com"
                                    />
                                    <button 
                                        onClick={() => handleSendEmail(true)}
                                        disabled={emailLoading}
                                        className="bg-secondary/10 text-secondary border border-secondary/20 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-sm">test_run</span>
                                        {emailLoading ? 'Running...' : 'Run Test'}
                                    </button>
                                </div>
                            </div>

                            {/* Broadcast Button */}
                            <div className="pt-4 space-y-4">
                                <button 
                                    onClick={() => {
                                        if(window.confirm(`Are you sure you want to broadcast this message to ALL registered participants?`)) {
                                            setEmailResults([]);
                                            handleSendEmail(false);
                                        }
                                    }}
                                    disabled={emailLoading}
                                    className="w-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-4 text-sm"
                                >
                                    {emailLoading ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">sync</span>
                                            Broadcasting to {stats.totalRegistrations} Teams...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">podcasts</span>
                                            Initialize Global Broadcast
                                        </>
                                    )}
                                </button>
                                <p className="text-[9px] text-gray-500 text-center uppercase font-bold tracking-[0.2em] italic opacity-50">
                                    Final broadcast will iterate through the master participant list. Total target nodes: {stats.totalRegistrations}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Transmission Log Section */}
                    {emailResults.length > 0 && (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 animate-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#00F0FF]">terminal</span>
                                    TRANSMISSION LOG
                                </h3>
                                <div className="flex gap-4">
                                    <span className="text-[10px] font-mono text-green-400">SUCCESS: {emailResults.filter(r => r.status === 'Success').length}</span>
                                    <span className="text-[10px] font-mono text-error">FAILED: {emailResults.filter(r => r.status !== 'Success').length}</span>
                                </div>
                            </div>
                            
                            <div className="max-h-[400px] overflow-y-auto bg-black/40 border border-white/5 rounded-2xl divide-y divide-white/5 scrollbar-hide">
                                {emailResults.map((res, i) => (
                                    <div key={i} className="px-6 py-4 flex justify-between items-center group hover:bg-white/5 transition-all">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-bold text-gray-200">{res.name}</span>
                                            <span className="text-[10px] text-gray-500 font-mono tracking-tight">{res.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {res.status === 'Success' ? (
                                                <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                                    <span className="text-[9px] font-black text-green-400 uppercase tracking-tighter">Delivered</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 bg-error/10 px-3 py-1 rounded-full border border-error/20" title={res.error}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                                                    <span className="text-[9px] font-black text-error uppercase tracking-tighter">Failed</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailBroadcast;
