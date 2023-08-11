// import React from 'react'
import UpdateContact from "../components/UpdateContact";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UpdateContactLayout = () => {
  return (
    <div className=" container-fluid h-screen">
      <Navbar />
      <div className=" flex justify-start items-center">
        <Sidebar />
        <UpdateContact />
      </div>
    </div>
  );
};

export default UpdateContactLayout;
