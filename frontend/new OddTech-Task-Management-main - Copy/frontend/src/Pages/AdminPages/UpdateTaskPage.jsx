import React from 'react'
import UpdateTask from '../../Components/Admin/UpdateTask'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'
export default function UpdateTaskPage() {
    return (
        <div>
            <UpdateTask />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
