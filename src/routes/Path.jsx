import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ContactTable from "../components/ContactTable";
import Error from "../pages/Error";
import Profile from "../components/Profile";
import ChangePassword from "../components/ChangePassword";
import CreateContact from "../components/CreateContact";
import UpdateContact from "../components/UpdateContact";

const Path = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard view={""}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/contacts"
          element={<Dashboard view={<ContactTable />} />}
        />
        <Route path="/profile" element={<Dashboard view={<Profile />} />} />
        <Route path="/change-password" element={<Dashboard view={<ChangePassword />} />} />

        <Route path="/create" element={<Dashboard view={<CreateContact />} />} />
        <Route path="/update/:id" element={<Dashboard view={<UpdateContact />} />} />
        {/* <Route path="/user/:id" element={<Dashboard view={} />} /> */}
        <Route path={"/*"} element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Path;

//https://rizes-organization.gitbook.io/contactapi/?fbclid=IwAR3iLjWec7o9GGpTlkz1rlwHeSPXh-79Tc8QPFSQUe_LE8VIsPW0Fe6lk0k
