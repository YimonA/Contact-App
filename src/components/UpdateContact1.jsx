// import React from 'react'
import { Loader, TextInput } from "@mantine/core";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";
import { useEffect, useState } from "react";

const UpdateContact1 = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data: contact } = useGetSingleContactQuery({ id, token });
  const [updateContact, { isLoading }] = useUpdateContactMutation();
  const nav = useNavigate();
  const [editContact, setEditContact] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditContact((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setEditContact(contact?.contact);
  }, [contact]);

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await updateContact({
        id,
        token,
        contact: editContact,
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
  console.log("editContact", editContact);

  return (
    <div className="pt-20 flex justify-center items-center w-full">
      <form
        onSubmit={editHandler}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold mx-auto">
          Edit Contact
        </h2>
        <label htmlFor="">Name</label>

        <input
          type="text"
          name="name"
          value={editContact?.name}
          onChange={handleInputChange}
          className="input-style"
          required
        />
        <label htmlFor="">Email</label>

        <input
          type="email"
          name="email"
          value={editContact?.email}
          onChange={handleInputChange}
          className="input-style"
          required
        />
        <label htmlFor="">Phone</label>
        <input
          type="number"
          name="phone"
          value={editContact?.phone}
          onChange={handleInputChange}
          className="input-style"
          required
        />
        <label htmlFor="">Address</label>

        <input
          type="text"
          name="address"
          value={editContact?.address}
          onChange={handleInputChange}
          className="input-style"
          required
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

export default UpdateContact1;
