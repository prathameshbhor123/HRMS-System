import React from 'react'
import Home from '../../Components/Auth/Home'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'
export default function HomePage() {
    return (
        <div>
            <Navbar />
            <Home />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
