// import React, { useState } from "react";
// import { BiHelpCircle } from "react-icons/bi";
// import { BsClockHistory } from "react-icons/bs";
// import { FiSettings } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { BiSolidUserDetail } from "react-icons/bi";
import {BsPlusLg} from "react-icons/bs";
import {BiStar} from "react-icons/bi";
import {BiLogOutCircle} from "react-icons/bi";
import {BiSolidLock} from "react-icons/bi";
import {BiUserCircle} from "react-icons/bi"
import {  useContextCustom } from '../context/stateContext'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { removeUser } from "../redux/services/authSlice";
import Cookies from "js-cookie";
import { useState } from "react";

const Sidebar = () => {
    const {showSidebar}=useContextCustom();
  
  const token = Cookies.get("token");
  console.log(token);

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

  const [menuItems] = useState([
    {
      icon: <BiUserCircle size={'1.8rem'}/>,
      content: "Profile",
      link:"/profile",
    },
    {
      icon: <BiSolidUserDetail size={'1.8rem'}/>,
      content: "Contacts",
      link:"/contacts",
    },
    // {
    //   icon: <BsClockHistory size={'1.5rem'}/>,
    //   content: "Recent",
    //   link:"",
    // },
    // {
    //   icon: <BiStar size={'1.8rem'}/>,
    //   content: "Favorite",
    //   link:"",

    // },
    
    // {
    //   icon: <BiTrash size={'1.5rem'}/>,
    //   content: "Trash",
    //   link:"",

    // },
    // {
    //   icon: <BiHelpCircle size={'1.8rem'}/>,
    //   content: "Help",
    //   link:"",

    // },
    // {
    //   icon: <FiSettings size={'1.5rem'}/>,
    //   content: "Setting",
    //   link:"",
    // },
    // {
    //   icon: <BiSolidLock size={'1.5rem'}/>,
    //   content: "Change Password",
    //   link:"/change-password",
    // }
  ]);

  return (
    <div className={`${showSidebar? "sm:w-[50%] md:w-[270px]":"w-0 -translate-x-[300px]"} h-[90%] border-2 duration-[1000ms] ease-in-out bg-white z-20 mt-1`}>
      <Link to={"/create"}>        <button
            className="my-5 w-[90%] h-[65px] bg-blue-700 hover:bg-blue-800 flex items-center gap-3 border-2 rounded-full mx-auto text-white p-3 "
          >
            <BsPlusLg size={'1.8rem'}/>
            CREATE CONTACT
          </button>
          </Link>
      <ul className="">
        {menuItems.map((menu,index) => (
          <div key={index} className="p-3 hover:bg-blue-700 hover:text-white duration-300 ease-in-out">
            <Link to={menu.link}>
            <li className=" flex items-center gap-5 ps-2 cursor-pointer">
              {menu.icon}
              <span className="py-2 text-lg font-medium">{menu.content}</span>
            </li>
            </Link>

          </div>
        ))}
        <div className="p-3 hover:bg-blue-700 hover:text-white duration-300 ease-in-out">
            <li className=" flex items-center gap-5 ps-2 cursor-pointer" onClick={logoutHandler}>
            <BiLogOutCircle size={'1.5rem'}/>              <span className="py-2 text-lg font-medium">Logout</span>
            </li>
          </div>
      </ul>
    </div>
  );
};

export default Sidebar;
