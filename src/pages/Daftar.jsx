/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Daftar = () => {
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

  const navigate = useNavigate();
  const directOtp = () => {
    navigate("/otp");
  };

  //state
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [VerifPassword, setVerifPassword] = useState("");

  // state error
  const [IsPhoneError, setIsPhoneError] = useState(false);
  const [IsMsgPhoneError, setIsMsgPhoneError] = useState("");

  const [IsPasswordError, setIsPasswordError] = useState(false);
  const [IsMsgPasswordError, setIsMsgPasswordError] = useState("");

  const [IsVerifPwError, setIsVerifPwError] = useState(false);
  const [IsMsgVerifPwError, setIsMsgVerifPwError] = useState("");

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
    if (!VerifPassword) {
      setIsVerifPwError(true);
      setIsMsgVerifPwError("Password harus sama dengan yang di atas");
      x = false;
    } else {
      setIsVerifPwError(false);
      x = true;
    }

    return x;
  };

  //   integrasi API Register
  const register = async () => {
    if (validation()) {
      let body = {
        phone: `${Phone}`,
        password: `${Password}`,
        password_verify: `${VerifPassword}`,
      };

      await axios
        .post(`http://api-uat.klabbelanja.id/api/v1/auth/register`, body)
        .then((response) => {
          console.log(`Ini response dari API Register: `, response?.data);
          if (response?.data?.status == true) {
            Toast.fire({
              icon: "success",
              title: response?.data.messages,
              text: "silahkan isi Kode Otp dibawah ini",
            });
            let valueLogin = JSON.stringify(response?.data?.data);
            sessionStorage.setItem("data login", valueLogin);
          } else {
            Toast.fire({
              icon: "info",
              title: response?.data.messages,
            });
          }
          if (response?.data?.status == true) {
            directOtp();
          }
        })
        .catch((err) => {
          console.error("Terjadi Kesalahan: ", err);
        });
    } else {
      Toast.fire({
        icon: "error",
        title: "Silahkan isi data dengan lengkap",
      });
    }
  };

  return (
    <>
      <div className="bg-white p-3 w-80 lg:w-96 m-auto shadow-2xl rounded-lg">
        <div className="flex flex-row justify-center mb-4 lg:mb-3">
          <p className="border-b-2 border-sky-500 text-sky-500 font-bold cursor-pointer pb-1">
            Daftar
          </p>
        </div>

        <div className="">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="mb-1 lg:mb-2">
              <label htmlFor="username" className="font-bold">
                No Telepon :
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
                // onFocus={handleClick}
                // onFocus={value={}}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Masukan nomor telepon/Anggota kamu"
              />
              {/* <p>{mesa}</p> */}
              {/* {noTelErr && <p>*Nomor Telepon Wajib menggunakan awalan "08"</p>} */}
            </Form.Item>
            <div className="mb-1 lg:mb-2">
              <label className="font-bold">Password</label>
            </div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password harus di isi",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                value={Password}
                // onFocus={handleClickPw}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukan password kamu"
              />
              {/* {pwdError && <p>*Password harus di isi Minimal 6 karakter</p>} */}
            </Form.Item>

            <div className="mb-1 lg:mb-2">
              <label className="font-bold pb-5">Konfirmasi Password</label>
            </div>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Password harus di isi",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Konfirmasi Password harus sama dengan Password diatas !"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                onChange={(e) => setVerifPassword(e.target.value)}
                placeholder="Konfirmasi password kamu"
                value={VerifPassword}
              />
            </Form.Item>
          </Form>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-sky-500"
            onClick={() => register()}
          >
            Daftar
          </Button>
        </div>
        <div className="flex flex-row justify-center text-xs mt-3">
          <p>
            sudah punya akun ? 
          </p>
          <p className="cursor-pointer ml-1 text-sky-500 font-bold" onClick={() => navigate("/login")}>
            Login
          </p>
          <p className="ml-1">
            sekarang
          </p>
        </div>
      </div>
    </>
  );
};
export default Daftar;
