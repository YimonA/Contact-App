// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Routeguard from "../components/Routeguard";
import UserInfoLayout from "../pages/UserInfoLayout";
import CreateContactLayout from "../pages/CreateContactLayout";
import UpdateContactLayout from "../pages/UpdateContactLayout";
import ProfileLayout from "../pages/ProfileLayout";
import ChangePasswordLayout from "../pages/ChangePasswordLayout";

const Path = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Routeguard>
              <Dashboard />
            </Routeguard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileLayout />} />
        <Route path="//change-password" element={<ChangePasswordLayout />} />

        <Route path="/create" element={<CreateContactLayout />} />
        <Route path="/update/:id" element={<UpdateContactLayout />} />
        <Route path="/user/:id" element={<UserInfoLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Path;

//https://rizes-organization.gitbook.io/contactapi/?fbclid=IwAR3iLjWec7o9GGpTlkz1rlwHeSPXh-79Tc8QPFSQUe_LE8VIsPW0Fe6lk0k
