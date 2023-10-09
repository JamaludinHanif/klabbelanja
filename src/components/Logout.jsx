/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Logout = () => {
  const [UserId, setUserId] = useState();
  // const [Phone, setPhone] = useState();
  const sessionLogin = () => {
    const userDataLogin = sessionStorage.getItem("data login");
    if (userDataLogin !== undefined) {
      let valueId = JSON.parse(userDataLogin);
      // setPhone(valuePhone.users.phone);
      setUserId(valueId.users.id);
    }
  };
  let userIds = UserId;
  // let userPhones = Phone;
  console.log("Sebuah data dari session: ", userIds);
  sessionStorage.setItem("User Id", userIds);
  // sessionStorage.setItem("Phone user", userPhones);

  useEffect(() => {
    sessionLogin();
  }, []);

  // const configToken = {
  //   headers: { Authorization: `${userIds}` },
  // };

  const clickLogout = async () => {
    await axios
      .post(
        `http://api-uat.klabbelanja.id/api/v1/auth/logout?users_id=${userIds}`
      )
      .then((response) => {
        console.log(`Ini response dari API Login: `, response?.data);
        if (response?.data?.status == true) {
          // Toast.fire({
          //   icon: "success",
          //   title: response?.data.messages,
          // text: "silahkan isi Kode Otp dibawah ini",
          // });
          console.log(response?.data?.messages);
        } else {
          // info2();
          console.log("logout gagal");
        }
      });
  };

  return (
    <div>
      <button onClick={() => clickLogout()}>logout</button>
    </div>
  );
};

export default Logout;
