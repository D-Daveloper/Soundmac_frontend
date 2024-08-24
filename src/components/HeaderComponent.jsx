import React, { useEffect, useState } from "react";
import logo from "../assets/icons/logo.svg";
import hamburger from "../assets/icons/hamburger.svg";
import closeicon from "../assets/icons/closeicon.svg";
import { NavLink, useLocation } from "react-router-dom";

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  function menuControl() {
    setIsOpen(!isOpen);
  }
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("stop-scrolling");
    } else {
      document.body.classList.remove("stop-scrolling");
    }

    return () => {
      document.body.classList.remove("stop-scrolling");
    };
  }, [isOpen]);

  return (
    <header className="grad relative shadow-2xl">
      <div className="mx-auto flex max-w-[80%] items-center justify-between bg-transparent p-5 text-white max-lg:max-w-[90%] max-md:max-w-full">
        <div className="hover:text-primary">
          <NavLink to="/" className="flex items-center gap-4">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <nav role="navigation">
          <ul className="flex gap-10 space-x-4 max-lg:hidden" >
            <li aria-label="Soundmac">
              <NavLink
                to="/"
                className="hover:text-primary"
              >
                Home
              </NavLink>
            </li>
            <li aria-label="Home">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "text-[#E74C3C]" : "text-white hover:text-primary"
                }
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="lg:hidden" onClick={menuControl} >
          <img src={isOpen ? closeicon : hamburger} alt="" />
        </button>
        <nav
          className={
            "absolute left-0 top-[100%] z-50 w-full bg-mobile_nav text-black transition-all duration-300 ease-in-out" +
            (isOpen ? " flex -translate-x-0" : " -translate-x-full")
          }
          role="navigation"
          aria-label="navigation"
        >
          <ul
            className="flex h-dvh w-[80%] flex-col gap-10 bg-white p-10 lg:hidden"
            
          >
            <li >
              <NavLink to="/" className="hover:text-primary">
                Home
              </NavLink>
            </li>
            <li >
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "text-[#E74C3C]" : "text-black hover:text-primary"
                }
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
