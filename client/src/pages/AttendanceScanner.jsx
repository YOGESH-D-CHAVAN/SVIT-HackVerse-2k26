import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Navbar from '../components/Navbar';

const AttendanceScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    useEffect(() => {
        // Initialize the scanner only once
        if (!html5QrCodeRef.current) {
            html5QrCodeRef.current = new Html5Qrcode("reader");
        }

        const startScanner = async () => {
            try {
                // Check if already scanning to prevent double start
                if (html5QrCodeRef.current.isScanning) {
                    await html5QrCodeRef.current.stop();
                }

                await html5QrCodeRef.current.start(
                    { facingMode: "environment" }, // Rear camera
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    (decodedText) => {
                        // Success callback
                        handleScanSuccess(decodedText);
                    },
                    (errorMessage) => {
                        // Silent error - QR code not found in frame
                    }
                );
            } catch (err) {
                console.error("Camera start error:", err);
                setStatus({ type: 'error', message: 'Unable to start camera. Please ensure permissions are granted.' });
            }
        };

        // Small delay to ensure DOM element is ready
        const timer = setTimeout(() => {
            if (!scanResult) startScanner();
        }, 500);

        return () => {
            clearTimeout(timer);
            if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                html5QrCodeRef.current.stop().catch(err => console.error("Stop error:", err));
            }
        };
    }, [scanResult]);

    const handleScanSuccess = async (result) => {
        // Stop scanning once a result is found
        if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
            try {
                await html5QrCodeRef.current.stop();
            } catch (e) {
                console.error("Failed to stop scanner", e);
            }
        }
        setScanResult(result);
        handleVerifyToken(result);
    };

    const handleVerifyToken = async (token) => {
        setLoading(true);
        setStatus({ type: '', message: '' });
        setParticipant(null);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/attendance/info/${token}`);
            const data = await res.json();

            if (data.success) {
                setParticipant(data.data);
            } else {
                setStatus({ type: 'error', message: data.message || 'Invalid Token' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Connection Error' });
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAttendance = async () => {
        if (!participant) return;
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/attendance/mark/${participant.token}`, {
                method: 'POST'
            });
            const data = await res.json();

            if (data.success) {
                setStatus({ type: 'success', message: `Successfully marked attendance for ${participant.name}` });
                setParticipant({ ...participant, isAttended: true });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to mark attendance' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Connection Error' });
        } finally {
            setLoading(false);
        }
    };

    const resetScanner = () => {
        setScanResult(null);
        setParticipant(null);
        setStatus({ type: '', message: '' });
    };

    return (
        <div className="font-body text-on-surface min-h-screen bg-[#05050a] flex flex-col relative overflow-hidden">
            <Navbar />
            
            {/* Spacer for Fixed Navbar */}
            <div className="h-24 sm:h-32 md:h-40"></div>
            
            <main className="flex-grow flex flex-col items-center p-4 sm:p-6 z-10">
                <div className="w-full max-w-2xl glass-panel p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white/5 backdrop-blur-2xl shadow-2xl animate-fade-up">
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-secondary uppercase italic tracking-tighter mb-2">Gate Control</h2>
                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant opacity-60">Scan Participant Pass</p>
                    </div>

                    <div className={`${scanResult ? 'hidden' : 'block'}`}>
                        <div id="reader" className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 aspect-square sm:aspect-video flex items-center justify-center relative">
                            <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl pointer-events-none"></div>
                            <div className="text-primary text-[10px] font-black uppercase tracking-widest animate-pulse z-20">Initializing Secure Stream...</div>
                        </div>
                    </div>

                    {scanResult && (
                        <div className="space-y-6 animate-fade-up">
                            {loading && (
                                <div className="text-center py-10">
                                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    <p className="mt-4 text-xs font-black uppercase tracking-widest text-primary">Verifying Data...</p>
                                </div>
                            )}

                            {participant && (
                                <div className="bg-white/5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Participant Name</p>
                                            <h4 className="text-xl sm:text-2xl font-black text-on-surface uppercase tracking-tight">{participant.name}</h4>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Squad / Team</p>
                                            <h4 className="text-lg sm:text-xl font-bold text-secondary uppercase tracking-tight">{participant.teamName}</h4>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Role</p>
                                            <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${participant.role === 'leader' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/20 text-secondary border border-secondary/30'}`}>
                                                {participant.role}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Current Status</p>
                                            <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${participant.isAttended ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                                {participant.isAttended ? 'Present / Checked In' : 'Absent / Pending'}
                                            </span>
                                        </div>
                                    </div>

                                    {!participant.isAttended && (
                                        <button 
                                            onClick={handleMarkAttendance}
                                            disabled={loading}
                                            className="w-full bg-green-500 text-white py-5 rounded-2xl font-headline font-black text-xl uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 active:scale-[0.98]"
                                        >
                                            Confirm Attendance
                                        </button>
                                    )}

                                    <button 
                                        onClick={resetScanner}
                                        className="w-full bg-white/5 border border-white/10 text-on-surface-variant py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                                    >
                                        Scan Next Participant
                                    </button>
                                </div>
                            )}

                            {status.message && (
                                <div className={`p-6 rounded-2xl text-center font-black uppercase tracking-[0.2em] text-xs ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {status.message}
                                    {status.type === 'error' && (
                                        <button onClick={resetScanner} className="block mx-auto mt-4 underline opacity-60">Try Again</button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AttendanceScanner;
