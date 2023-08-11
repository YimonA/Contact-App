// import React from "react";
import { Input, Loader, Table } from "@mantine/core";
import Cookies from "js-cookie";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addContacts, setSearchTerm } from "../redux/services/contactSlice";
import { addLinks } from "../redux/services/paginationSlice";

import { Menu, Button } from "@mantine/core";
//import {useGetUserProfileQuery} from "../redux/api/userProfileApi";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  console.log("ddc", data?.contacts);

  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  const links = useSelector((state) => state.paginationSlice.links);

  console.log("l", links);
  console.log("contact", contacts);
  console.log("dc", data?.contacts?.data);

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
    dispatch(addLinks(data?.contacts?.links));
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
              <Link to={`/user/${contact?.id}`}>
                <Menu.Item component="a" target="_blank">
                  <p>Favorite</p>
                </Menu.Item>
              </Link>
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

  const pagi = links
    ?.filter((link) => {
      if (link?.url !== null) {
        console.log("lll", link);
        return link;
      }
    })
    .map((lin) => {
      return (
        <Link key={lin.index} to={lin?.url}>
          <li>{lin?.label}</li>
        </Link>
      );
    });
  console.log("pa", pagi);

  return (
    <div className=" w-full px-10 duration-[1000ms] ease-in-out">
      <div className="pt-10 flex items-center gap-2 px-10">
        <Input
          variant="filled"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      <div className="pt-5 px-10">
        {/* <ul
          className=" flex justify-center items-center gap-5
        "
        >
          {pagi}
        </ul> */}

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
