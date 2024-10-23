import React from "react";
import Logo from "../assets/icons/Logo.svg";

const Header: React.FC = () => {
  return (
    <header className="w-full px-5 py-3 gap-4 flex items-center border-b border-black">
      <img src={Logo} width={38} alt="" />{" "}
      <h2 className="font-semibold text-xl">LudaImports</h2>
    </header>
  );
};

export default Header;
