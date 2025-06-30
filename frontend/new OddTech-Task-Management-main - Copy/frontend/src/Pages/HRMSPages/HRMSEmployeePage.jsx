import React from 'react'
import HRMSEmployee from '../../Components/HRMS/HRMSEmployee'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'

export default function HRMSEmployeePage() {
    return (
        <div>
            <Navbar />
            <HRMSEmployee />
            <Footer />
        </div>
    )
}
