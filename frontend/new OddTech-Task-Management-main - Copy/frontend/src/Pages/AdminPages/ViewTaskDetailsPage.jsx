import React from 'react'
import ViewTaskDetails from '../../Components/Admin/ViewTaskDetails'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'
export default function ViewTaskDetailsPage() {
    return (
        <div>
            <Navbar />
            <ViewTaskDetails />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
