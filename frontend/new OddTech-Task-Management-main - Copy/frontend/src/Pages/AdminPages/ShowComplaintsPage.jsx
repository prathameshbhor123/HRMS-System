import React from 'react'
import ShowComplaints from '../../Components/Admin/ShowComplaints'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'
export default function ShowComplaintsPage() {
    return (
        <div>
            <ShowComplaints />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
