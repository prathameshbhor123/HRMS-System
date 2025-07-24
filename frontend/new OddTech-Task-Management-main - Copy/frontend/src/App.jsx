
import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './Pages/AdminPages/AdminDashboardPage'
import PostTaskPage from './Pages/AdminPages/PostTaskPage'

import SignupPage from './Pages/AuthPages/SignupPage'
import HomePage from './Pages/AuthPages/HomePage'
import LoginPages from './Pages/AuthPages/LoginPages'
import ViewTaskDetailsPage from './Pages/AdminPages/ViewTaskDetailsPage'
import AboutUsPage from './Pages/AuthPages/AboutUsPage'
import ContactUsPage from './Pages/AuthPages/ContactUsPage'
import ViewEmployeeTaskDetailsPage from './Pages/EmployeePages/ViewEmployeeTaskDetailsPage'
import EmployeeDashboardPage from './Pages/EmployeePages/EmployeeDashboardPage'
import ProtectedRoute from './Components/ProtectedRout'
import ShowComplaintsPage from './Pages/AdminPages/ShowComplaintsPage'
import UpdateTaskPage from './Pages/AdminPages/UpdateTaskPage'
import AttendenceCapturePage from './Pages/FaceRecognitionPages/AttendenceCapturePage'
import FaceLoginPage from './Pages/FaceRecognitionPages/FaceLoginPage'
import AttendancePages from './Pages/AdminPages/AttendancePages'
import HRMSAdminPage from './Pages/HRMSPages/HRMSAdminPage'
import HRMSEmployeePage from './Pages/HRMSPages/HRMSEmployeePage'
import OAuthRedirectPage from './Pages/AuthPages/OAuthRedirectPage'
import SocialMedia from './Components/HRMS/SocialMedia'
import SocialMediaEmployee from './Components/HRMS/SocialMediaEmployee'
import InventoryAdminPage from './Pages/InventoryManagementPages/InventoryAdminPage'
import InventoryEmployeePage from './Pages/InventoryManagementPages/InventoryEmployeePage'
import EmployeeDiaryPage from './Pages/Diary/EmployeeDiaryPage'
import AppPage from './Pages/AppFolderPage/AppPage'
import EmployeeAppsPage from './Pages/EmployeePages/EmployeeAppPage/EmployeeAppsPage'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPages />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/facelogin" element={<FaceLoginPage />} />
        <Route path="/oauth2/redirect" element={<OAuthRedirectPage />} />
        <Route path="/attendance" element={<AttendenceCapturePage />} />






        {/* Admin Routes */}
        <Route
          path="/admindashboard"
          element={<ProtectedRoute element={AdminDashboardPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/signup"
          element={<ProtectedRoute element={SignupPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/posttask"
          element={<ProtectedRoute element={PostTaskPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/showcomplaints"
          element={<ProtectedRoute element={ShowComplaintsPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/updatetask/:id"
          element={<ProtectedRoute element={UpdateTaskPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/viewtaskdetails/:id"
          element={<ProtectedRoute element={ViewTaskDetailsPage} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/inventorymanagement"
          element={<ProtectedRoute element={InventoryAdminPage} allowedRoles={['ADMIN']} />}
        />

        <Route
          path="/hrmsadmin"
          element={<ProtectedRoute element={HRMSAdminPage} allowedRoles={['ADMIN']} />}
        />

        <Route
          path="/socialmedia"
          element={<ProtectedRoute element={SocialMedia} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/app"
          element={<ProtectedRoute element={AppPage} allowedRoles={['ADMIN']} />}
        />



        {/* Employee Routes */}

        <Route
          path="/employeedashboard"
          element={<ProtectedRoute element={EmployeeDashboardPage} allowedRoles={['EMPLOYEE']} />}
        />
        <Route
          path="/viewemployeetaskdetails/:id"
          element={<ProtectedRoute element={ViewEmployeeTaskDetailsPage} allowedRoles={['EMPLOYEE']} />}
        />
        <Route
          path="/face"
          element={<ProtectedRoute element={AttendenceCapturePage} allowedRoles={['EMPLOYEE']} />}
        />

        <Route
          path="/hrmsemployee"
          element={<ProtectedRoute element={HRMSEmployeePage} allowedRoles={['EMPLOYEE']} />}
        />



        <Route
          path="/socialmediaemployee"
          element={<ProtectedRoute element={SocialMediaEmployee} allowedRoles={['EMPLOYEE']} />}
        />

        <Route
          path="/inventoryemployee"
          element={<ProtectedRoute element={InventoryEmployeePage} allowedRoles={['EMPLOYEE']} />}
        />

        <Route
          path="/empdiary"
          element={<ProtectedRoute element={EmployeeDiaryPage} allowedRoles={['EMPLOYEE']} />}
        />
        <Route
          path="/employeeapps"
          element={<ProtectedRoute element={EmployeeAppsPage} allowedRoles={['EMPLOYEE']} />}
        />

      </Routes>
    </>
  )
}

export default App
