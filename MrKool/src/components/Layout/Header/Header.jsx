import React from "react";
import Logo from "../../../assets/images/Logo2.png";
import { NavLink, Link } from "react-router-dom";
import {
  RiShoppingCartFill,
  RiBearSmileFill,
  RiMenu3Line,
} from "@remixicon/react";
import "../../../styles/header.css";

const nav_links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Our Services",
    path: "/ourservices",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];


const Header = () => {

  return (
    <header className="header">
      <div className="nav_wrapper d-flex align-items-center justify-content-between">
        <div className="logo">
          <Link to="/home">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Menu */}
        <div className="navigation" >
          <div className="menu d-flex align-items-center gap-5">
            {nav_links.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                {item.display}
              </NavLink>
            ))}
          </div>
        </div>

        {/* nav right icons */}
        <div className="nav_right d-flex align-items-center gap-4">
          <span className="cart_icon">
            <Link to="/cart">
              <RiShoppingCartFill></RiShoppingCartFill>
              <span className="cart_badge">2</span>
            </Link>
          </span>
          <span className="user">
            <Link to="/login">
              <RiBearSmileFill></RiBearSmileFill>
            </Link>
          </span>
          <span className="mobile_menu">
            <RiMenu3Line></RiMenu3Line>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;