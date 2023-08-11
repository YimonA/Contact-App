// import React from 'react'
import Navbar from "../components/Navbar";
import ContactTable from "../components/ContactTable";
import Sidebar from "../components/Sidebar";

const UserInfoLayout = () => {
  return (
    <div className=" container-fluid h-screen">
      <Navbar />
      <div className=" flex justify-start items-center">
        <Sidebar />
        <ContactTable />
      </div>
    </div>
  );
};

export default UserInfoLayout;
