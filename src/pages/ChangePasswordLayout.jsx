// import React from 'react'
import ChangePassword from "../components/ChangePassword";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ChangePasswordLayout = () => {
  return (
    <div className=" container-fluid h-screen">
      <Navbar />
      <div className=" flex justify-start items-center">
        <Sidebar />
        <ChangePassword />
      </div>
    </div>
  );
};

export default ChangePasswordLayout;
