/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// libraries react
import { useEffect, useState } from "react";

// libraries
import axios from "axios";
import { Button, message, Form, Input } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// components
import CountDownOtp from "./CountDownOtp";


// ant desain
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const FormOtp = () => {

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

  // direct ke halaman otp
  const navigate = useNavigate();
  const directHomePage = () => {
    navigate("/");
  };

  // ant desain {messages}
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApi2, contextHolder2] = message.useMessage();
  const info = () => {
    messageApi.info({
      type: "info",
      content: "silahkan isi dengan kode OTP yang telah dikirim",
      style: { marginTop: "70vh" },
    });
  };
  const info2 = () => {
    messageApi2.info({
      type: "info",
      content: "expired code please resend OTP.",
      style: { marginTop: "70vh" },
    });
  };

  // sessionStorage system
  const [UserToken, setUserToken] = useState();
  const [Phone, setPhone] = useState();
  const sessionLogin = () => {
    const userDataLogin = sessionStorage.getItem("data login");
    if (userDataLogin !== undefined) {
      let valuePhone = JSON.parse(userDataLogin);
      setPhone(valuePhone.users.phone);
      setUserToken(valuePhone.tokens.tokens.slice(7));
    }
  };
  let userTokens = UserToken;
  let userPhones = Phone;
  // console.log("Sebuah data dari session: ", userTokens);
  sessionStorage.setItem("Token User", userTokens);
  sessionStorage.setItem("Phone user", userPhones);

  useEffect(() => {
    sessionLogin();
  }, []);


  // state
  const [Otp, setOtp] = useState("");

  // state error
  const [PhoneErr, setPhoneErr] = useState(false);
  const [OtpErr, setOtpErr] = useState(false);
  const [PhoneErrMsg, setPhoneErrMsg] = useState("");
  const [OtpErrMsg, setOtpErrMsg] = useState("");

  // validation
  const validation = () => {
    let x = false;
    if (!Otp) {
      setOtpErr(true);
      setOtpErrMsg("Otp harus di isi");
      x = false;
    } else {
      setOtpErr(false);
      x = true;
    }
    return x;
  };


  // integrasi API send OTP (verify)
  const configToken = {
    headers: { Authorization: `Bearer ${userTokens}` },
  };
  const otpInput = async () => {
    if (validation()) {
      let body = {
        otp: `${Otp}`,
        phone: `${Phone}`,
      };

      await axios
        .post(
          `http://api-uat.klabbelanja.id/api/v1/account/users-verify`,
          body,
          configToken
        )
        .then((response) => {
          // console.log(`Ini response dari API Login: `, response?.data);
          if (response?.data?.status == true) {
            Toast.fire({
              icon: "success",
              title: response?.data.messages,
            });

            // sessionStorage System
            let valueSetStatus = JSON.stringify(response?.data?.status);
            sessionStorage.setItem("data verify1", valueSetStatus);
            let valueSetData = JSON.stringify(response?.data?.data);
            sessionStorage.setItem("data verify2", valueSetData);
            let valueSetKey = JSON.stringify(response?.data?.key);
            sessionStorage.setItem("data verify3", valueSetKey);
            let valueSetCode = JSON.stringify(response?.data?.code);
            sessionStorage.setItem("data verify4", valueSetCode);

          } else {
            info2();
          }
          if (response?.data?.status == true) {
            directHomePage();
          }
        })
        .catch((err) => {
          // console.error("Terjadi Kesalahan: ", err);
        });
    } else {
      info();
    }
  };


  // integrasi API resend OTP
  const reSendOtp = async () => {
    await axios
      .get(
        `http://api-uat.klabbelanja.id/api/v1/account/resend-otp?phone=${Phone}`,
        configToken
      )
      .then((response) => {
        // console.log(`ini response dari resend OTP`, response?.data);
        if (response?.data?.status == true) {
          console.log("resend otp berhasil");
        } else {
          console.log("resend gagal");
        }
      })
      .catch((err) => {
        console.error("terjadi kesalahan saat mengirim ulang OTP", err);
      });
  };

  
  return (
    <>
      <div className="bg-white p-3 w-80 md:w-4/6 lg:w-96 m-auto shadow-2xl rounded-lg">
        {/* navlogin */}

        <div className="">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              id="username"
              rules={[
                {
                  required: true,
                  message: "Tolong isi Kode OTP anda",
                },
              ]}
            >
              <Input
                value={Otp}
                className="text-center"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Masukan Kode OTP yang dikirim ke Nomer anda"
              />
            </Form.Item>
          </Form>
          <div className="mb-6 flex flex-row justify-around">
            <div className="">
              <CountDownOtp />
            </div>
            <div className="text-sm">
              <p onClick={() => reSendOtp()}>Resend OTP</p>
            </div>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => otpInput()}
            className="w-full bg-sky-500"
          >
            Kirim OTP
          </Button>
          {contextHolder}
          {contextHolder2}
        </div>
      </div>
    </>
  );
};

export default FormOtp;
