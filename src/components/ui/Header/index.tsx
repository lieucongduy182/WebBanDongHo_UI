"use client";

import { Topbar } from "../Header/Topbar";
import { Navbar } from "./Navbar";
import { TopbarMobile } from "./TopbarMobile";

const Header = () => {
  return (
    <>
      <div className="w-full fixed z-[1024] hidden lg:block">
        <Topbar />
        <Navbar />
      </div>
      <TopbarMobile />
    </>
  );
};

export default Header;
