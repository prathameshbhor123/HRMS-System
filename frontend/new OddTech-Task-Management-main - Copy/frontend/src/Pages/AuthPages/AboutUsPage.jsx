import React from 'react'
import AboutUs from '../../Components/Auth/AboutUs'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'

export default function AboutUsPage() {
    return (
        <div>
            <Navbar />
            <AboutUs />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
