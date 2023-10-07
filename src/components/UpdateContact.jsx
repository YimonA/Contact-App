// import React from 'react'
import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";
import { useEffect, useState } from "react";

const UpdateContact = () => {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data: contact } = useGetSingleContactQuery({ id, token });
  const [updateContact, { isLoading }] = useUpdateContactMutation();
  const nav = useNavigate();

  useEffect(() => {
    setName(contact?.contact?.name);
    setPhone(contact?.contact?.phone);
    setEmail(contact?.contact?.email);
    setAddress(contact?.contact?.address);
  }, [contact]);
  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await updateContact({
        id,
        token,
        contact: {
          name,
          phone: Number(phone),
          email,
          address,
        },
      });
      console.log("dd", response);
      console.log("dd", contact);
      //dispatch(addUser({ user: data?.user, token: data?.token }));

      if (response?.data?.success) {
        nav("/contacts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20 flex justify-center items-center w-full">
      <form
        onSubmit={editHandler}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold mx-auto">
          Edit Contact
        </h2>
        <TextInput
        type="password"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          label="Enter Name..."
        />
        <TextInput
        type="password"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          label="Enter Email..."
        />
        <TextInput
        type="password"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
          label="Enter Phone..."
        />
        <TextInput
          value={address}
          onChange={(event) => setAddress(event.currentTarget.value)}
          label="Enter Address..."
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
            "Edit"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateContact;
