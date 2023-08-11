// import React from 'react'
import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";

const UpdateContact = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data: contact } = useGetSingleContactQuery({ id, token });
  const [updateContact, { isLoading }] = useUpdateContactMutation({
    id,
    contact,
    token,
  });
  const nav = useNavigate();
  console.log("clg", contact?.contact?.name);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: hasLength({ min: 9, max: 11 }),
    },
  });

  return (
    <div className=" flex justify-center items-center w-full">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await updateContact({
              id,
              token,
              contact: values,
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
          Edit Contact
        </h2>
        <TextInput
          value={contact?.contact?.name}
          label="Enter your Name..."
        />
        <TextInput
          value={contact?.contact?.email}
          label="Enter your Email..."
        />
        <TextInput
          value={contact?.contact?.phone}
          label="Enter your Phone..."
        />
        <TextInput
          value={contact?.contact?.address}
          label="Enter your Address..."
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
