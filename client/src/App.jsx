import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Guidelines from './pages/Guidelines';
import MyQRCode from './pages/MyQRCode';
import AttendanceScanner from './pages/AttendanceScanner';
import AttendanceList from './pages/AttendanceList';
import SeatArrangement from './pages/SeatArrangement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/my-qr" element={<MyQRCode />} />
        <Route path="/admin/scanner" element={<AttendanceScanner />} />
        <Route path="/admin/attendance-list" element={<AttendanceList />} />
        <Route path="/seat-arrangement" element={<SeatArrangement />} />

      </Routes>
    </Router>
  );
}

export default App;
