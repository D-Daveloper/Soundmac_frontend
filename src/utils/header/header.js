import { useNavigate } from "react-router-dom";
import classes from "../header/header.module.css";
import { useContext, useEffect, useState } from "react";
import LogoIcon from "../icons/logo/logoIcon";
import UserContext from "../../context/user/userContext";
import HamburgerIcon from "../icons/Hamburger/hamburger";
import CancelIcon from "../icons/Hamburger/cancel";

function Header() {
  const pathName = window.location.pathname;

  const { isBigScreen } = useContext(UserContext);
  const navigate = useNavigate(); //react router to route to different links

  // scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [showDashboardBtn, setShowDashboardBtn] = useState(false);
  const [drawer, setDrawer] = useState(false);

  // toggle drawer
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  useEffect(() => {
    localStorage.getItem("soundmac3_token") && setShowDashboardBtn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <div className={classes.container}>
      <div className={classes.logo} onClick={() => navigate("/")}>
        <LogoIcon fill={"#fff"} />
      </div>
      {!isBigScreen && drawer}
      <div
        className={
          !isBigScreen && drawer
            ? classes.sub_container
            : classes.sub_container_inactive
        }
      >
        <div className={classes.sub_container_group}>
          <p
            style={pathName === "/" ? { color: "e74c3c" } : {}}
            className={classes.navigation}
            onClick={() => {
              navigate("/");
              scrollToTop();
              setDrawer(false);
            }}
          >
            Home
          </p>
          <p
            style={pathName === "/pricing" ? { color: "e74c3c" } : {}}
            className={classes.navigation}
            onClick={() => {
              navigate("/pricing");
              scrollToTop();
              setDrawer(false);
            }}
          >
            Pricing
          </p>
          <p
            style={pathName === "/Blog" ? { color: "e74c3c" } : {}}
            className={classes.navigation}
            onClick={() => {
              navigate("/Blog");
              scrollToTop();
              setDrawer(false);
            }}
          >
            Blog
          </p>
          <p
            style={pathName === "/faq_and_support" ? { color: "e74c3c" } : {}}
            className={classes.navigation}
            onClick={() => {
              navigate("/faq_and_support");
              scrollToTop();
              setDrawer(false);
            }}
          >
            FAQ & Contact
          </p>
          <div className={classes.fire_icon_converter_container}>
            {/* Fire Icon */}
            <svg
              className={classes.fire_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M8.8896 10.1825C8.7471 11.7025 8.6471 14.3925 9.5446 15.5375C9.5446 15.5375 9.1221 12.5825 12.9096 8.87497C14.4346 7.38247 14.7871 5.35247 14.2546 3.82997C13.9521 2.96747 13.3996 2.25497 12.9196 1.75747C12.6396 1.46497 12.8546 0.982475 13.2621 0.999975C15.7271 1.10997 19.7221 1.79497 21.4196 6.05497C22.1646 7.92497 22.2196 9.85748 21.8646 11.8225C21.6396 13.0775 20.8396 15.8675 22.6646 16.21C23.9671 16.455 24.5971 15.42 24.8796 14.675C24.9971 14.365 25.4046 14.2875 25.6246 14.535C27.8246 17.0375 28.0121 19.985 27.5571 22.5225C26.6771 27.4275 21.7096 30.9975 16.7746 30.9975C10.6096 30.9975 5.7021 27.47 4.4296 21.085C3.9171 18.5075 4.1771 13.4075 8.1521 9.80747C8.4471 9.53747 8.9296 9.77747 8.8896 10.1825Z"
                fill="url(#paint0_radial_41_2199)"
              />
              <path
                d="M19.0277 19.3548C16.7552 16.4298 17.7727 13.0923 18.3302 11.7623C18.4052 11.5873 18.2052 11.4223 18.0477 11.5298C17.0702 12.1948 15.0677 13.7598 14.1352 15.9623C12.8727 18.9398 12.9627 20.3973 13.7102 22.1773C14.1602 23.2498 13.6377 23.4773 13.3752 23.5173C13.1202 23.5573 12.8852 23.3873 12.6977 23.2098C12.1583 22.6919 11.7739 22.034 11.5877 21.3098C11.5477 21.1548 11.3452 21.1123 11.2527 21.2398C10.5527 22.2073 10.1902 23.7598 10.1727 24.8573C10.1177 28.2498 12.9202 30.9998 16.3102 30.9998C20.5827 30.9998 23.6952 26.2748 21.2402 22.3248C20.5277 21.1748 19.8577 20.4223 19.0277 19.3548Z"
                fill="url(#paint1_radial_41_2199)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_41_2199"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(15.5535 31.0752) rotate(-179.751) scale(17.6469 28.9551)"
                >
                  <stop offset="0.314" stopColor="#FF9800" />
                  <stop offset="0.662" stopColor="#FF6D00" />
                  <stop offset="0.972" stopColor="#F44336" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_41_2199"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(16.5452 13.5144) rotate(90.5787) scale(18.4641 13.8956)"
                >
                  <stop offset="0.214" stopColor="#FFF176" />
                  <stop offset="0.328" stopColor="#FFF27D" />
                  <stop offset="0.487" stopColor="#FFF48F" />
                  <stop offset="0.672" stopColor="#FFF7AD" />
                  <stop offset="0.793" stopColor="#FFF9C4" />
                  <stop
                    offset="0.822"
                    stopColor="#FFF8BD"
                    stopOpacity="0.804"
                  />
                  <stop
                    offset="0.863"
                    stopColor="#FFF6AB"
                    stopOpacity="0.529"
                  />
                  <stop offset="0.91" stopColor="#FFF38D" stopOpacity="0.209" />
                  <stop offset="0.941" stopColor="#FFF176" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            <div
              onClick={() => {
                navigate("/audio_converter");
                scrollToTop();
                setDrawer(false);
              }}
              className={classes.audio_converter}
            >
              Audio converter
            </div>
          </div>

          {/* authenticator buttons starts here*/}

          {showDashboardBtn ? (
            <div
              onClick={() => {
                navigate("/dashboard");
                scrollToTop();
                setDrawer(false);
              }}
              className={classes.dashboard}
            >
              Dashboard
            </div>
          ) : (
            <>
              <div
                onClick={() => {
                  navigate("/auth/login");
                  scrollToTop();
                  setDrawer(false);
                }}
                className={classes.login}
              >
                Log in
              </div>
              <div
                onClick={() => {
                  navigate("/auth/register");
                  scrollToTop();
                  setDrawer(false);
                }}
                className={classes.register}
              >
                Register
              </div>
            </>
          )}
        </div>
      </div>{" "}
      <div
        onClick={() => toggleDrawer()}
        className={classes.hamburger_container}
      >
        {drawer ? (
          <CancelIcon fill={"#E74C3C"} />
        ) : (
          <HamburgerIcon fill={"#fff"} />
        )}
      </div>
    </div>
  );
}
export default Header;
