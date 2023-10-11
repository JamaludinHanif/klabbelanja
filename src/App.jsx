/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PageSign from "./pages/PageSign"
import PageLogin from "./pages/PageLogin"
import Vendor from "./pages/Vendor"
import PageOtp from "./pages/PageOtp"
import HomePage from "./pages/HomePage"
import ProdukTes from "./pages/ProdukPageTes"


export default function App() {



  return (
    <>
      {/* <div className="dark:bg-bg w-11/12 m-auto"> */}

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tes" element={<ProdukTes />} />
          <Route path="/vendor/:id" element={<Vendor />} />
          <Route path="/otp" element={<PageOtp />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/daftar" element={<PageSign />} />
        </Routes>
      </Router>
          {/* </div> */}
      {/* <Search />

      <Content /> */}

      {/* <Footer /> */}

      {/* <Footer /> */}
    </>
  )
}