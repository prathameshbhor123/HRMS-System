import React from 'react'
import SignUpPage from '../../Components/Auth/SignUpPage'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'

export default function SignupPage() {
    return (
        <div>
            <Navbar />
            <SignUpPage />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
