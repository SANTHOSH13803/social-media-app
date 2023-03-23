import React from "react";
import { Link } from "react-router-dom";
// import { BsPlusCircleDotted } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

import "./index.css";
const Navbar = (props) => {
  const { onClickSignOut } = props;
  return (
    <>
      <nav className="p-2 d-lg-none navbar-small d-flex align-item-center justify-content-around bg-dark text-white">
        <Link to="/" className="link">
          <AiFillHome size={30} />
        </Link>
        {/* <Link to="/add" className="link">
          <BsPlusCircleDotted size={30} />
        </Link> */}
        <Link to="/profile" className="link">
          <FaUserCircle size={30} />
        </Link>
        <div className="link">
          <button className="custom-button" onClick={onClickSignOut}>
            <GoSignOut size={30} />
          </button>
        </div>
      </nav>
      <nav className="p-3 d-none d-lg-flex justify-content-between bg-dark text-white">
        <div className="logo">Logo</div>
        <div className="nav-links d-flex ">
          <div className="nav-link">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/about" className="link">
              About
            </Link>
            <button className="bt2 link" onClick={onClickSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
