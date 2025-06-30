import React from 'react'
import ContactUs from '../../Components/Auth/ContactUs'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'

export default function ContactUsPage() {
    return (
        <div>
            <Navbar />
            <ContactUs />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
