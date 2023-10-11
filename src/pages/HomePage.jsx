/* eslint-disable no-unused-vars */

// libraries react
import React from "react";
import { useEffect } from "react";

// libraries
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  // routing
  const navigate = useNavigate();

  // middlewire
  const loggedIn = sessionStorage.getItem("data verify1");
  // console.log(loggedIn);

  useEffect(() => {
    if (loggedIn == null) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>ini adalah HomePAGE</h1>
    </div>
  );
};

export default HomePage;
