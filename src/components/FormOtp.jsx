/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, message, Form, Input } from "antd";
import CountDownOtp from "./CountDownOtp";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
  const navigate = useState();
  const directHomePage = () => {
    navigate("/otp");
  };

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
  console.log("Sebuah data dari session: ", userTokens);
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

  const configToken = {
    headers: { Authorization: `Bearer ${userTokens}` },
  };

  // integrasi API Register
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
          console.log(`Ini response dari API Login: `, response?.data);
          if (response?.data?.status == true) {
            Toast.fire({
              icon: "success",
              title: response?.data.messages,
              // text: "silahkan isi Kode Otp dibawah ini",
            });
          } else {
            info2();
          }
          if (response?.data?.status == true) {
            directHomePage();
          }
        })
        .catch((err) => {
          console.error("Terjadi Kesalahan: ", err);
        });
    } else {
      info();
    }
  };

  const reSendOtp = async () => {
    await axios
      .get(
        `http://api-uat.klabbelanja.id/api/v1/account/resend-otp?phone=${Phone}`,
        configToken
      )
      .then((response) => {
        console.log(`ini response dari resend OTP`, response?.data);
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

  // console.log("ini phone", Phone);

  return (
    <>
      <div className="bg-white p-3 w-80 lg:w-96 m-auto shadow-2xl rounded-lg">
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
