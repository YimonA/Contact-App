// import React from 'react'
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProfileLayout = () => {
  return (
<div className=" container-fluid h-screen">
      <Navbar />
      <div className=" flex justify-start items-center">
        <Sidebar />
        <Profile />
      </div>
    </div>  )
}

export default ProfileLayout