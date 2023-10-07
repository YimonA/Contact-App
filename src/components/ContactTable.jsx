// import React from "react";
import { Input, Loader, Table } from "@mantine/core";
import Cookies from "js-cookie";
import {
  useDeleteContactMutation,
  useGetContactQuery,useGetContactPageQuery,
} from "../redux/api/contactApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addContacts, addLinks, setSearchTerm } from "../redux/services/contactSlice";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import { Menu, Button } from "@mantine/core";
//import {useGetUserProfileQuery} from "../redux/api/userProfileApi";

const ContactTable = () => {
  const [page,setPage]=useState(1);
  const token = Cookies.get("token");
  // const { data, isLoading } = useGetContactQuery(token);
  const { data, isLoading } = useGetContactPageQuery({token,page});
  console.log("page", data);

  console.log("ddc", data?.contacts);

  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  const links = useSelector((state) => state.contactSlice.links);

  console.log("l", links);
  console.log("contact", contacts);
  console.log("dc", data?.contacts?.data);

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
    dispatch(addLinks(data?.contacts));
  }, [data]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const { data } = await deleteContact({ id, token });
        console.log(data);
      }
    });
  };

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center w-full h-screen">
        <Loader variant="dots" />
      </div>
    );
  }

  const rows = contacts
    ?.filter((item) => {
      if (searchTerm === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searchTerm?.toLocaleLowerCase())
      ) {
        return contacts;
      }
    })
    .map((contact) => (
      <tr key={contact.id} className=" hover:bg-blue-100">
        <td>{contact?.name}</td>
        <td>
          {contact?.email === null ? "example@gmail.com" : contact?.email}
        </td>
        <td>{contact?.phone}</td>
        <td>{contact?.address === null ? "Ygn" : contact?.address}</td>
        <td className=" flex justify-center">
          <Menu width={200} shadow="md">
            <Menu.Target>
              <Button variant="outline">...</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Link to={`/user/${contact?.id}`}>
                <Menu.Item component="a" target="_blank">
                  <p>User Info</p>
                </Menu.Item>
              </Link>
              {/* <Link to={`/user/${contact?.id}`}>
                <Menu.Item component="a" target="_blank">
                  <p>Favorite</p>
                </Menu.Item>
              </Link> */}
              <Link to={`/update/${contact?.id}`}>
                <Menu.Item component="a" target="_blank">
                  <p>Edit</p>
                </Menu.Item>
              </Link>
              <Menu.Item component="a">
                <p
                  onClick={() => deleteHandler(contact?.id)}
                  className=" cursor-pointer text-red-600 "
                >
                  Delete
                </p>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));


  return (
    <div className=" w-full px-10 duration-[1000ms] ease-in-out">
      <div className="pt-10 flex justify-between items-center gap-2 px-10">
        <Input
        className="border-2 border-blue-500 rounded-md"
          variant="filled"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        {/* pagination start*/}
      <div>
        <Button.Group className=" flex justify-end ">
        <Button
            onClick={() => setPage(1)}
            variant="default"
            className={`
                  hover:text-white hover:bg-blue-700 border-2 rounded-l-md`}
          >
            <MdOutlineKeyboardDoubleArrowLeft size={"1.5rem"}/>
          </Button>
          <Button
            onClick={() => setPage(page>1?page-1:page)}
            variant="default"
            className={`hover:text-white hover:bg-blue-700`}
          >
            <MdArrowBackIosNew />
          </Button>
          <Button
            variant="default"
            className={`text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent`}
          >
            page {links?.current_page} / {links?.last_page}
          </Button>

          <Button
            onClick={() => setPage(page<links?.last_page?page+1:page)}
            variant="default"
            className={`
            hover:text-white hover:bg-blue-700 `}
          >
            <MdArrowForwardIos />
          </Button>
          <Button
            onClick={() => setPage(links?.last_page)}
            variant="default"
            className={`
            hover:text-white hover:bg-blue-700 border-2 rounded-r-md`}
          >
            <MdOutlineKeyboardDoubleArrowRight size={'1.5rem'}/>
          </Button>
        </Button.Group>
      </div>
      {/* pagination end*/}
      </div>

      <div className="pt-5 px-10">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            {/*
            data?.contacts?.data?.map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>{contact?.name}</td>
                  <td>
                    {contact?.email === null
                      ? "example@gmail.com"
                      : contact?.email}
                  </td>
                  <td>{contact?.phone}</td>
                  <td>
                    {contact?.address === null ? "Ygn" : contact?.address}
                  </td>
                  <td className=" flex justify-center">
                    <p className=" cursor-pointer border-2 border-blue-700 w-4">
                      ...
                    </p>
                  </td>
                </tr>
              );
            })
            */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ContactTable;
