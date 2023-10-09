/* eslint-disable no-unused-vars */

// libraries
import { Link } from "react-router-dom";

// Photos
import logo from "../images/klabbelanjalogo.png";
import facebook from "../images/facebook.png";
import browser from "../images/browser.png";
import instagram from "../images/instagram.png";
import playStore from "../images/playstore.png";
import twitter from "../images/twitter.png";

// components
import Daftar from "./Daftar";

export default function PageSign() {
  return (
    <>
      <body className="bg-sky-200 h-screen w-full">
        <nav className="flex justify-between mb-24 lg:mb-12 px-5 lg:px-20 py-5 lg:py-6 font-bold text-sm lg:text-lg ">
          <div className="flex flex-row items-center">
            <img src={logo} alt="" className="w-8 lg:w-10 mr-3 lg:mr-5" />
            <p>KlabBelanja</p>
          </div>
          <div className="flex flex-row items-center">
            <p>
              <Link to="/">Beranda</Link>
            </p>
            <p className="ml-5">
              <a href="#">FAQ</a>
            </p>
          </div>
        </nav>

        <Daftar />

        <footer className="flex justify-between mt-24 lg:mt-12 px-5 lg:px-20 py-5 lg:py-6 font-bold text-sm lg:text-lg sticky top-[100vh]">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <p className="lg:mr-5">
              <a href="#">@2023 klabbelanja</a>
            </p>
            <p className="lg:mr-5">
              <a href="https://www.klabbelanja.com/term-condition/">
                Syarat & Ketentuan
              </a>
            </p>
            <p>
              <a href="https://www.klabbelanja.com/privacy-policy/">
                Kebijakan Privasi
              </a>
            </p>
          </div>
          <div className="flex flex-row items-center">
            <a href="https://www.klabbelanja.com/">
              <img src={browser} alt="" className="w-6 lg:w-8 cursor-pointer" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61550694193879">
              <img
                src={facebook}
                alt=""
                className="w-6 lg:w-8 cursor-pointer"
              />
            </a>
            <a href="https://twitter.com/klabbelanjacom">
              <img src={twitter} alt="" className="w-6 lg:w-8 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/klabbelanjaofficial/">
              <img
                src={instagram}
                alt=""
                className="w-6 lg:w-8 cursor-pointer"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.klabbelanja&hl=en-ID">
              <img
                src={playStore}
                alt=""
                className="w-6 lg:w-8 cursor-pointer"
              />
            </a>
          </div>
        </footer>
      </body>
    </>
  );
}
