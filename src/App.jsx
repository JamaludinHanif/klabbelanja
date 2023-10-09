/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PageSign from "./pages/PageSign"
import PageLogin from "./pages/PageLogin"
import Home from "./pages/HomePage"
import Vendor from "./pages/Vendor"
import PageOtp from "./pages/PageOtp"


export default function App() {



  return (
    <>
      {/* <div className="dark:bg-bg w-11/12 m-auto"> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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