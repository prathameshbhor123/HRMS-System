import React from 'react'
import InventoryEmployee from '../../Components/Inventory/InventoryEmployee/InventoryEmployee'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/NavBar/Navbar'

const InventoryEmployeePage = () => {
    return (
        <div>
            <Navbar />
            <InventoryEmployee />
            <Footer />
        </div>
    )
}

export default InventoryEmployeePage
