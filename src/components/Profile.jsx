// import React from "react";
import Cookies from "js-cookie";
import { BiSolidLock } from "react-icons/bi";
import { Link } from "react-router-dom";

const Profile = () => {
  const profile = JSON.parse(Cookies.get("profile"));
  console.log("profile", profile.user);
  return (
    <div className=" flex justify-center items-center w-full">
      <div className=" flex flex-col items-center gap-5 p-7 shadow-lg w-[500px]">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          width={"150px"}
          alt=""
        />
        <p>Name: {profile?.user?.name}</p>
        <p>Email: {profile?.user?.email}</p>
        <p>Email_verified_at: {profile?.user?.email_verified_at}</p>
        <p>Created_at: {profile?.user?.created_at}</p>
        <p>Updated_at: {profile?.user?.updated_at}</p>
        <Link to={"/change-password"}>
          <button className="flex items-center gap-3 px-5 py-3 rounded-md text-lg font-medium bg-blue-700 text-white">
            <BiSolidLock size={"1.5rem"} />
            Change Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
