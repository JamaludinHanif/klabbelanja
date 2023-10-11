/* eslint-disable no-unused-vars */

// libraries react
import React from "react";
import { useState, useEffect } from "react";

// libraries
import axios from "axios";
import Swal from "sweetalert2";

const Logout = () => {

  // sessionStorage sistem
  const [UserId, setUserId] = useState();
  const sessionLogin = () => {
    const userDataLogin = sessionStorage.getItem("data login");
    if (userDataLogin !== undefined) {
      let valueId = JSON.parse(userDataLogin);
      setUserId(valueId.users.id);
    }
  };
  let userIds = UserId;
  // console.log("Sebuah data dari session: ", userIds);
  sessionStorage.setItem("User Id", userIds);

  useEffect(() => {
    sessionLogin();
  }, []);

  // integrasi API logout
  const clickLogout = async () => {
    await axios
      .post(
        `http://api-uat.klabbelanja.id/api/v1/auth/logout?users_id=${userIds}`
      )
      .then((response) => {
        // console.log(`Ini response dari API Login: `, response?.data);
        if (response?.data?.status == true) {
          // console.log(response?.data?.messages);
          sessionStorage.clear();
        } else {
          console.log("logout gagal");
        }
      });
  };

  // Alert Konfirmasi Logout
  const alertYakin = () => {
    Swal.fire({
      title: 'Apa kamu yakin ?',
      text: "Kamu akan Logout dan harus Login kembali !",
      icon: 'warning',
      showCancelButton: true,
      preConfirm: () => clickLogout(),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, saya yakin'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logout!',
          'Kamu berhasil Logout',
          'success'
        )
      }
    })
  }
  

  return (
    <div>
      <button onClick={() => alertYakin()}>logout</button>
    </div>
  );
};

export default Logout;
