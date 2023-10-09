/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FormOtp from "../components/FormOtp";
import { OtpInput } from "reactjs-otp-input";
import Logout from "../components/Logout";

function ProdukTes() {
  //
  // const [Otp, setOtp] = useState("");

  // const [Phone, setPhone] = useState("");

  const [Product, setProduct] = useState();
  const size = 10;
  const page = 10;

  // const [IsPhoneError, setIsPhoneError] = useState(false);
  // const [IsMsgPhoneError, setIsMsgPhoneError] = useState("");
  // const validation = () => {
  //   let x = false;
  //   if (!Phone) {
  //     setIsPhoneError(true);
  //     setIsMsgPhoneError("Nomor HP Kamu Wajib Diisi");
  //     x = false;
  //   } else {
  //     setIsPhoneError(false);
  //     x = true;
  //   }

  //   return x;
  // };

  // const register = async () => {
  //   if (validation()) {
  //     let body = {
  //       phone: `${Phone}`,
  //       password: "123456",
  //       password_verify: "123456",
  //     };

  //     await axios
  //       .post(`http://api-uat.klabbelanja.id/api/v1/auth/register`, body)
  //       .then((response) => {
  //         console.log(`Ini response dari API Register: `, response?.data);
  //       })
  //       .catch((err) => {
  //         console.error("Terjadi Kesalahan: ", err);
  //       });
  //   } else {
  //     console.log("Kamu Belum Isi Phone");
  //   }
  // };

  // produk

  const product = async () => {
    await axios
      .get(
        `http://api-uat.klabbelanja.id/api/v1/vendors/views-more?size=10&page=1`
      )
      .then((response) => {
        console.log(`Ini response dari API View More: `, response?.data);
        setProduct(response?.data?.data);
      })
      .catch((err) => {
        console.error("Terjadi Kesalahan: ", err);
      });
  };

  return (
    <>
      {/* <button
        style={{ backgroundColor: "#dcdcdc", color: "black" }}
        onClick={() => register()}
      >
        Submit/POST
      </button>{" "} */}
      <br />
      <button
        style={{ backgroundColor: "#dcdcdc", color: "black" }}
        onClick={() => product()}
      >
        Submit/GET
      </button>{" "}
      <br />
      <Link to="/login">klik unruk login</Link> <br />
      <Logout />
      {/* <FormOtp /> */}
      {/* <OtpInput
      // inputStyle={width}
      inputStyle={{width:40,height:40,borderRadius:10}}
        value={Otp}
        placeholder={<span>-</span>}
        // onChange={handleChange}
        numInputs={6}
        // separator={<span>-</span>}
      /> */}
      ;
      <div>
        {Product?.map((item) => (
          <>
            <h5>{item?.name}</h5>
            <p>{`${item?.email}`}</p>
            <img src={item?.vendorsPictures?.path} width={100} height={100} />
          </>
        ))}
      </div>
    </>
  );
}

export default ProdukTes;
