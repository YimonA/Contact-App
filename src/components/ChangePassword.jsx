// import React from 'react'
import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";

import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useChangePasswordMutation } from "../redux/api/authApi";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import { useContextCustom } from "../context/stateContext";
import { useState } from "react";

const ChangePassword = () => {
  const [currentPW, setCurrentPW] = useState();
  const [pw, setPW] = useState();
  const [confirmPW, setConfirmPW] = useState();

  const { password, setPassword } = useContextCustom();
  const user = JSON.parse(Cookies.get("user"));
  //   const { id } = useParams();
  const token = Cookies.get("token");
  //const { data: contact } = useGetSingleContactQuery({ id, token });
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const nav = useNavigate();

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword({
        token,
        user: {
          current_password: currentPW,
          password: pw,
          password_confirmation: confirmPW,
        },
      });
      console.log("user", user);

      console.log("response", response);
      //dispatch(addUser({ user: data?.user, token: data?.token }));

      if (response?.data?.success) {
        nav("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center items-center w-full">
      <form
        onSubmit={changePasswordHandler}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold mx-auto">
          Change Password
        </h2>
        <PasswordInput
          value={currentPW}
          onChange={(event) => setCurrentPW(event.currentTarget.value)}
          label="Current Password"
        />
        <PasswordInput
          value={pw}
          onChange={(event) => setPW(event.currentTarget.value)}
          label="New Password"
        />
        <PasswordInput
          value={confirmPW}
          onChange={(event) => setConfirmPW(event.currentTarget.value)}
          label="Password Confirmation"
        />
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-700 text-white px-4 py-2 font-medium rounded-md"
        >
          {isLoading ? (
            <div className=" flex justify-center items-center gap-1">
              <Loader color="white" size="xs" />
              <span>Loading....</span>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
