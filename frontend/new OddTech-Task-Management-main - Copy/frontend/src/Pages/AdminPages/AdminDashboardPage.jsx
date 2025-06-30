import React from 'react'
import AdminDashboard from '../../Components/Admin/AdminDashboard.jsx'
import Navbar from '../../Components/NavBar/Navbar.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import Whatsapp from '../../Components/ChatSupport/Whatsapp.jsx'
import ChatBot from '../../Components/ChatSupport/ChatBot.jsx'
export default function AdminServicePage() {
    return (
        <div>
            <Navbar />
            <AdminDashboard />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
