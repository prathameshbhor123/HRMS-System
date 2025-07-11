import React from 'react'
import InventoryDashboard from '../../Components/Inventory/InventoryManagement/InventoryDashboard'
// Importing the InventoryDashboard component from the InventoryAdmin folder    

import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/NavBar/Navbar'
export default function InventoryAdminPage() {
    return (
        <div>
            <Navbar />
            <InventoryDashboard />
            <Footer />
        </div>
    )
}
