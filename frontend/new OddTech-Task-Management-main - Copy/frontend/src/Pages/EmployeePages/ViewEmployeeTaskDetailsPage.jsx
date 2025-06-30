import React from 'react'
import ViewEmployeeTaskDetails from '../../Components/Employee/ViewEmployeeTaskDetails'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Whatsapp from '../../Components/ChatSupport/Whatsapp'
import ChatBot from '../../Components/ChatSupport/ChatBot'
export default function ViewEmployeeTaskDetailsPage() {
    return (
        <div>
            <Navbar />
            <ViewEmployeeTaskDetails />
            <Whatsapp />
            <ChatBot />
            <Footer />
        </div>
    )
}
