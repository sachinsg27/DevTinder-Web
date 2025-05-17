import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view");
      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
