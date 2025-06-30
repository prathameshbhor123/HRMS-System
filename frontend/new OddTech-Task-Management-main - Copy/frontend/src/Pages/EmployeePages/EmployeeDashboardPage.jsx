import React from 'react'
import EmployeeDashboard from '../../Components/Employee/EmployeeDashboard'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'

export default function EmployeeDashboardPage() {
    return (
        <div>
            <Navbar />
            <EmployeeDashboard />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
