// import React from "react";
import Cookies from "js-cookie";
import { useContextCustom } from "../context/stateContext";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import {BiSolidLock} from "react-icons/bi";

import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { removeUser } from "../redux/services/authSlice";
import { useNavigate } from "react-router-dom";
// import {useGetUserProfileQuery} from "../redux/api/userProfileApi";

const Navbar = () => {
  const { setShowSidebar, showSidebar } = useContextCustom();

  //const { user } = useSelector((state) => state.authSlice);
  //const { token } = useSelector((state) => state.authSlice);
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  console.log(token);

  // const {data}=useGetUserProfileQuery(token);
  // console.log("now",data);

  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) {
      nav("/login");
    }
    console.log(data);
  };

  return (
    <div>
      <div className=" p-5 shadow-md flex justify-between items-center">
        <div className=" flex gap-1 items-center">
          <AiOutlineClose
            size={"1.5rem"}
            onClick={() => setShowSidebar(false)}
            className={`${
              showSidebar ? "" : "hidden"
            } hover:cursor-pointer p-2 w-12 h-12 rounded-full hover:bg-slate-200`}
          />
          <BiMenu
            size={"2rem"}
            onClick={() => setShowSidebar(true)}
            className={`${
              showSidebar ? "hidden" : ""
            } hover:cursor-pointer p-2 w-12 h-12 rounded-full hover:bg-slate-200`}
          />
          <h2 className=" text-xl font-bold text-blue-700">CONTACT App</h2>
        </div>
        <div className=" flex gap-5 items-center">
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
          <button
            onClick={logoutHandler}
            className={`hover:cursor-pointer p-2 w-12 h-12 rounded-full hover:bg-slate-200 flex justify-center items-center`}          >
            <BiSolidLock size={"1.5rem"}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
