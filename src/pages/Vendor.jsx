/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function Vendor() {
//   const { id } = useParams();

//   const [Product, setProduct] = useState();

//   const product = async () => {
//     await axios
//       .get(
//         `http://api-uat.klabbelanja.id/api/v1/vendors/views-more?size=10&page=1`
//       )
//       .then((response) => {
//         console.log(`Ini response dari API View More: `, response?.data);
//         setProduct(response?.data?.data);
//       })
//       .catch((err) => {
//         console.error("Terjadi Kesalahan: ", err);
//       });
//   };

//   return (
//     <>
//       <div className="">
//         ini adalah vendor dengan id :{" "}
//         {Product?.map((id) => (
//           <>
//             <h5>{id?.name}</h5>
//             <p>{`${id?.email}`}</p>
//             <img src={id?.vendorsPictures?.path} width={100} height={100} />
//           </>
//         ))}
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
//   const [user, setUser] = useState(null);

  const { id } = useParams();

  const [Product, setProduct] = useState();

  const product = async () => {
    await axios
      .get(
        `http://api-uat.klabbelanja.id/api/v1/vendors/details?vendors_id=${id}`
      )
      .then((response) => {
        console.log(`Ini response dari API View More: `, response?.data);
        setProduct(response?.data?.data);
      })
      .catch((err) => {
        console.error("Terjadi Kesalahan: ", err);
      });
  };

  useEffect(() => {
    // fetch(`https://api.example.com/users/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => setUser(data));
    product();
  });

  return (
    <div>
        {/* <h1>{ id }</h1> */}
      {/* <h1>{Product?.id}</h1> */}
      <h1>{Product?.name}</h1>
      <p>{Product?.email}</p>
    </div>
  );
};

export default User;
