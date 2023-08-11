// import React from 'react'
import CreateContact from "../components/CreateContact";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const CreateContactLayout = () => {
  return (
    <div className=" container-fluid h-screen">
      <Navbar />
      <div className=" flex justify-start items-center">
        <Sidebar />
        <CreateContact />
      </div>
    </div>
  );
};

export default CreateContactLayout;
