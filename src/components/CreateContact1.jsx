import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../redux/api/contactApi";
import { useState } from "react";

const CreateContact1 = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("contact", contact);

    try {
      const { data } = await createContact({ token, contact });
      console.log("contact", contact);
      console.log("t", token);

      console.log("data", data);

      //dispatch(addUser({ user: data?.user, token: data?.token }));

      if (data?.success) {
        nav("/contacts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if (name.includes("Obj_in_Obj")) {
    //   const field = name.split(".")[1];
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     Obj_in_Obj: {
    //       ...prevState.Obj_in_Obj,
    //       [field]: value,
    //     },
    //   }));
    // } else {
    setContact((prevState) => ({ ...prevState, [name]: value }));
    // }
  };

  return (
    <div className="pt-20 flex justify-center items-center w-full">
      <form
        onSubmit={submitHandler}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold mx-auto">
          Create Contact
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Enter your Name..."
          onChange={handleInputChange}
          className="input-style"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your Email..."
          onChange={handleInputChange}
          className="input-style"
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="Enter your Phone..."
          onChange={handleInputChange}
          className="input-style"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Enter your Address..."
          onChange={handleInputChange}
          className="input-style"
          required
        />

        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-700 text-white px-4 py-1"
        >
          {isLoading ? (
            <div className=" flex justify-center items-center gap-1">
              <Loader color="white" size="xs" />
              <span>Loading....</span>
            </div>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateContact1;
