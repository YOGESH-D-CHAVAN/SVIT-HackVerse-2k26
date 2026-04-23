import React from 'react';
import Navbar from '../components/Navbar';

const SeatArrangement = () => {
    const data = [
        {"sn": 1, "teamName": "The Beast boy", "size": 1, "leaderName": "Habib shaikh", "deskNo": "D1", "location": "Programming Lab-II"},
        {"sn": 2, "teamName": "Error 404", "size": 2, "leaderName": "Paritosh kishor shirsath", "deskNo": "D2", "location": "Programming Lab-II"},
        {"sn": 3, "teamName": "Team CyberTech", "size": 2, "leaderName": "Karan Kishor Targe", "deskNo": "D3", "location": "Programming Lab-II"},
        {"sn": 4, "teamName": "The innovators", "size": 2, "leaderName": "Payal gaikwad", "deskNo": "D4", "location": "Programming Lab-II"},
        {"sn": 5, "teamName": "Innovators", "size": 3, "leaderName": "Rushikesh borude", "deskNo": "D5", "location": "Programming Lab-I"},
        {"sn": 6, "teamName": "CodeNova", "size": 3, "leaderName": "Shalini Ravindra Jadhav", "deskNo": "D6", "location": "Programming Lab-I"},
        {"sn": 7, "teamName": "TechNova", "size": 3, "leaderName": "Komal bhikaji zinjurde", "deskNo": "D7", "location": "Software Lab"},
        {"sn": 8, "teamName": "DeepThink", "size": 3, "leaderName": "Pritam Sudhakar Gaikwad", "deskNo": "D8", "location": "Software Lab"},
        {"sn": 9, "teamName": "IT-Group", "size": 3, "leaderName": "Sakshi Keshav Shinde", "deskNo": "D9", "location": "Software Lab"},
        {"sn": 10, "teamName": "Pratiksha & Group", "size": 4, "leaderName": "Pratiksha Mohan Avhad", "deskNo": "D10", "location": "Project Lab"},
        {"sn": 11, "teamName": "EXCALIBUR", "size": 4, "leaderName": "OM PRASHANT RAUT", "deskNo": "D11", "location": "Project Lab"},
        {"sn": 12, "teamName": "Team Hackers", "size": 4, "leaderName": "Shraddha Sonawane", "deskNo": "D12", "location": "Project Lab"},
        {"sn": 13, "teamName": "Bug Blasters", "size": 4, "leaderName": "Poonam Uttam Ugale", "deskNo": "D13", "location": "Project Lab"},
        {"sn": 14, "teamName": "Code karma", "size": 4, "leaderName": "Siddhika Dhairyashil Malusare", "deskNo": "D14", "location": "Project Lab"},
        {"sn": 15, "teamName": "Hackpulse", "size": 4, "leaderName": "Nupur Chandrabhan Kukade", "deskNo": "D15", "location": "Software Lab"},
        {"sn": 16, "teamName": "The Coder", "size": 4, "leaderName": "Kale Jayshree Sandip", "deskNo": "D16", "location": "Software Lab"},
        {"sn": 17, "teamName": "Team Dark", "size": 4, "leaderName": "Ishwari Bhorkade", "deskNo": "D17", "location": "Software Lab"},
        {"sn": 18, "teamName": "Oscar", "size": 5, "leaderName": "Prashant Girge", "deskNo": "D18", "location": "Project Lab"},
        {"sn": 19, "teamName": "The Hacksmith", "size": 5, "leaderName": "Yash Bhaskar Deore", "deskNo": "D19", "location": "Project Lab"},
        {"sn": 20, "teamName": "Brain Bots", "size": 5, "leaderName": "Dipali Raghunath Dhonnar", "deskNo": "D20", "location": "Project Lab"},
        {"sn": 21, "teamName": "Algorise", "size": 5, "leaderName": "Suraj Rajendra Kokane", "deskNo": "D21", "location": "Project Lab"},
        {"sn": 22, "teamName": "CodeCrafters", "size": 5, "leaderName": "Tushar Patil", "deskNo": "D22", "location": "Project Lab"},
        {"sn": 23, "teamName": "Code Titans", "size": 5, "leaderName": "Krushnali Mahendra Pekhale", "deskNo": "D23", "location": "Software Lab"},
        {"sn": 24, "teamName": "Team Skills", "size": 5, "leaderName": "Wakchaure Sanchit Sanjay", "deskNo": "D24", "location": "Software Lab"},
        {"sn": 25, "teamName": "VIP Developers", "size": 5, "leaderName": "Atharv vijay vairal", "deskNo": "D25", "location": "Software Lab"},
        {"sn": 26, "teamName": "Techno Smart", "size": 5, "leaderName": "Vishal Gorakh Satle", "deskNo": "D26", "location": "Software Lab"},
        {"sn": 27, "teamName": "Tech sparks", "size": 5, "leaderName": "Pranali Pekhale", "deskNo": "D27", "location": "Programming Lab-I"},
        {"sn": 28, "teamName": "Velocity", "size": 5, "leaderName": "Rohit Yogesh Badgujar", "deskNo": "D28", "location": "Programming Lab-I"},
        {"sn": 29, "teamName": "Axios", "size": 5, "leaderName": "Vaibhav Kailas Sonawane", "deskNo": "D29", "location": "Programming Lab-II"}
    ];

    return (
        <div className="min-h-screen bg-[#0d0d17] text-white pt-24 pb-12 px-4 md:px-8 font-sans overflow-x-hidden">
            <Navbar />
            
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#7000FF] tracking-tighter">
                        SEAT ARRANGEMENT
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Find your designated desk and location for SVIT HackVerse 2k26.
                    </p>
                </div>

                {/* Table Container */}
                <div className="relative group">
                    {/* Glowing effect around the table */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF]/20 to-[#7000FF]/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="px-6 py-4 text-[#00F0FF] font-mono text-xs tracking-widest uppercase">S.N.</th>
                                        <th className="px-6 py-4 text-[#00F0FF] font-mono text-xs tracking-widest uppercase">Team Name</th>
                                        <th className="px-6 py-4 text-[#00F0FF] font-mono text-xs tracking-widest uppercase">Leader</th>
                                        <th className="px-6 py-4 text-[#00F0FF] font-mono text-xs tracking-widest uppercase">Size</th>
                                        <th className="px-6 py-4 text-[#00F0FF] font-mono text-xs tracking-widest uppercase">Desk No</th>
                                        <th className="px-6 py-4 text-[#00F0FF] font-mono text-xs tracking-widest uppercase">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.map((team) => (
                                        <tr 
                                            key={team.sn}
                                            className="hover:bg-white/5 transition-colors group/row"
                                        >
                                            <td className="px-6 py-4 text-gray-400 font-mono text-sm">
                                                {team.sn.toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-white group-hover/row:text-[#00F0FF] transition-colors">
                                                    {team.teamName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF]"></div>
                                                    <span className="text-gray-300">{team.leaderName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-white/5 px-2 py-1 rounded text-xs text-gray-300">
                                                    {team.size} Members
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono font-bold text-[#00F0FF]">
                                                    {team.deskNo}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 group-hover/row:border-[#00F0FF]/30 transition-colors">
                                                    {team.location}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Note */}
                <div className="mt-6 md:hidden text-center text-gray-500 text-xs flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">swipe</span>
                    Scroll horizontally to see all details
                </div>
            </div>
        </div>
    );
};

export default SeatArrangement;
