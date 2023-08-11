// import React from "react";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contactApi";

const UserInfo = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data } = useGetSingleContactQuery({ id, token });

  console.log(data);
  return (
    <div className=" flex justify-center items-center w-full">
      <div className=" flex flex-col items-center gap-5 p-7 shadow-lg w-96">
        <img
          src={
            data?.contact?.photo === null
              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              : data?.contact?.photo
          }
          width={"150px"}
          alt=""
        />
        <p>{data?.contact?.name}</p>
        <p>{data?.contact?.email}</p>
        <p>{data?.contact?.phone}</p>
        <p>{data?.contact?.address}</p>
        <Link to={"/"}>
          <button type="submit" className=" bg-blue-700 text-white px-4 py-1 w-80">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
