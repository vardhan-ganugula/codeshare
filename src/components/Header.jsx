import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { homePageUrls } from "../utils/urls";
import { FaArrowRight } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

function Header() {
  const [isMobile, setMobile] = useState(false);

  return (
    <>
      <nav className="z-10 w-full px-5 pt-4 pb-2 flex shadow mb-2 justify-around border-b-2 border-white/10 bg-white">
        {/* logo */}
        <div className="text-2xl text-black font-extrabold ">
          {import.meta.env.VITE_APPNAME}
        </div>

        {/* desktop navbar */}
        <ul className="hidden md:flex items-center gap-4" id="desktop_area">
          {homePageUrls.map((item) => (
            <li key={item.linkName}>
              <NavLink
                to={item.url}
                className="text-black font-medium cursor-pointer relative before:absolute before:contents-[*] before:-bottom-2 before:h-[2.5px] before:w-full before:hover:bg-indigo-500 hover:text-indigo-500"
              >
                {item.linkName}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* mobile navbar controls */}
        <div className="flex md:hidden items-center text-white">
          <div>
            <HiMiniBars3BottomRight
              size={25}
              className="cursor-pointer"
              onClick={() => setMobile(true)}
            />
          </div>
        </div>

        {/* mobile navlinks */}

        <div
          className={`flex md:hidden bg-black/50 backdrop-blur-sm h-full w-full fixed top-0 left-0 z-20 transition-all duration-500 ${
            isMobile ? "translate-x-0" : "-translate-x-[100%]"
          }`}
        >
          <div className="w-1/2 h-full bg-white flex flex-col py-5 px-4 gap-14 text-black">
            <div onClick={() => setMobile(false)}>
              <IoMdClose size={30} className="cursor-pointer" />
            </div>

            <ul className="flex flex-col gap-5" id="mobile_area">
              {homePageUrls.map((item) => (
                <li
                  key={item.linkName}
                  className="font-semibold text-md cursor-pointer"
                >
                  <Link
                    to={item.url}

                    onClick={() => setMobile(false)}
                  >
                    {item.linkName}
                  </Link>
                </li>
              ))}
              <li className="font-semibold text-md cursor-pointer">
                <Link
                  to="https://vardhan.works"
                  onClick={() => setMobile(false)}

                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* expolre work */}
        <Link
          to="https://vardhan.works"
          id="work-btn"
        >
          Portfolio <FaArrowRight />
        </Link>
      </nav>
    </>
  );
}

export default Header;
