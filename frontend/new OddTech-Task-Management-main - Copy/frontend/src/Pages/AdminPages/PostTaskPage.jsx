import React from 'react'
import PostTask from '../../Components/Admin/PostTask'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'

export default function PostTaskPage() {
    return (
        <div>
            <Navbar />
            <PostTask />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
