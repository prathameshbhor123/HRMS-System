import React from 'react'
import Login from '../../Components/Auth/Login'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'
export default function LoginPages() {
    return (
        <div>
            <Navbar />
            <Login />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
