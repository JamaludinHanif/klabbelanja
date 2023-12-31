/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

// libraries react
import React, { useState, useEffect } from "react";

// libraries
import { Button, message, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// ant desain
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  // ant desain (messages)
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApi2, contextHolder2] = message.useMessage();
  const info = () => {
    messageApi.info({
      type: "info",
      content: "silahkan isi data dengan lengkap",
      // style: { marginTop: "70vh" },
    });
  };
  const info2 = () => {
    messageApi2.info({
      type: "error",
      content: "Password yang dimasukan salah",
      // style: { marginTop: "70vh" },
    });
  };

  // Sweet Alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const ToastLoginSucces = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // router
  const navigate = useNavigate();
  // direct ke halaman otp
  const directOtp = () => {
    navigate("/otp");
  };

  //state
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");

  // state error
  const [IsPhoneError, setIsPhoneError] = useState(false);
  const [IsMsgPhoneError, setIsMsgPhoneError] = useState("");

  const [IsPasswordError, setIsPasswordError] = useState(false);
  const [IsMsgPasswordError, setIsMsgPasswordError] = useState("");

  // validation
  const validation = () => {
    let x = false;
    if (!Phone) {
      setIsPhoneError(true);
      setIsMsgPhoneError("Nomor HP Kamu Wajib Diisi");
      x = false;
    } else {
      setIsPhoneError(false);
      x = true;
    }
    if (!Password) {
      setIsPasswordError(true);
      setIsMsgPasswordError("Password harus Diisi");
      x = false;
    } else {
      setIsPasswordError(false);
      x = true;
    }

    return x;
  };

  //   integrasi API Login
  const register = async () => {
    if (validation()) {
      let body = {
        phoneOrNopend: `${Phone}`,
        password: `${Password}`,
      };

      await axios
        .post(`http://api-uat.klabbelanja.id/api/v1/auth/login`, body)
        .then((response) => {
          // console.log(`Ini response dari API Login: `, response?.data);
          if (response?.data?.status == true) {
            ToastLoginSucces.fire({
              icon: "success",
              title: response?.data.messages,
              text: "silahkan isi Kode Otp dibawah ini",
            });
            let valueLogin = JSON.stringify(response?.data?.data);
            sessionStorage.setItem("data login", valueLogin);
          } else {
            message.error(response?.data.messages);
          }
          if (response?.data?.status == true) {
            directOtp();
          }
        })
        .catch((err) => {
          console.error("Terjadi Kesalahan: ", err);
        });
    } else {
      info();
    }
  };

  return (
    <>
      <body className="flex justify-center items-center">
        <div className="bg-white p-3 w-80 md:w-4/6 lg:w-96 shadow-2xl rounded-lg">
          {/* navlogin */}
          <div className="flex justify-center mb-4 lg:mb-6">
            <p className="border-b-2 border-sky-500 text-sky-500 font-bold cursor-pointer pb-1">
              Login
            </p>
          </div>

          <div className="">
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="mb-1 lg:mb-3">
                <label htmlFor="username" className="font-bold pb-5">
                  No Telepon / Nomor Anggota :
                </label>
              </div>
              <Form.Item
                name="username"
                id="username"
                rules={[
                  {
                    required: true,
                    message: "Tolong isi nomor Telepon anda!",
                  },
                ]}
              >
                <Input
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Masukan nomor telepon/Anggota kamu"
                />
              </Form.Item>

              <div className="mb-1 lg:mb-3">
                <label htmlFor="password" className="font-bold pb-5">
                  Password
                </label>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password harus di isi",
                  },
                ]}
              >
                <Input.Password
                  id="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukan password kamu"
                />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => register()}
              className="w-full bg-sky-500"
            >
              Login
            </Button>
          </div>
          <div className="flex flex-row justify-center text-xs mt-3">
            <p>belum punya akun ?</p>
            <p
              className="cursor-pointer ml-1 text-sky-500 font-bold"
              onClick={() => navigate("/daftar")}
            >
              Daftar
            </p>
            <p className="ml-1">sekarang</p>
          </div>
          {contextHolder}
          {contextHolder2}
        </div>
      </body>
    </>
  );
};
export default Login;
