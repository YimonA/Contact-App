// import React from 'react'
import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";

import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useChangePasswordMutation } from "../redux/api/authApi";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import { useContextCustom } from "../context/stateContext";

const ChangePassword = () => {
  const { password, setPassword } = useContextCustom();
  const user = JSON.parse(Cookies.get("user"));
//   const { id } = useParams();
  const token = Cookies.get("token");
  //const { data: contact } = useGetSingleContactQuery({ id, token });
  const [changePassword,{isLoading}] = useChangePasswordMutation({
    user,
    token,
  });
  const { data } = changePassword(token,user);
  console.log("changePass",data);
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
        current_password: "",
        password: "",
        password_confirmation: "",
    },

    validate: {
    //   name: (value) =>
    //     value.length < 2 ? "Name must have at least 2 letters" : null,

    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    //   phone: hasLength({ min: 9, max: 11 }),
    },
  });

  return (
    <div className=" flex justify-center items-center w-full">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await changePassword({
              token,
              user: values,
            });
            console.log("v", values);
            console.log("t", token);

            console.log(data);
            //dispatch(addUser({ user: data?.user, token: data?.token }));

            if (data?.success) {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold mx-auto">
          Change Password</h2>
        <TextInput  label="Current Password" />
        <TextInput  label="New Password" />
        <TextInput
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
