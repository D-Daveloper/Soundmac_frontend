/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import classes from "./dashboardHeader.module.css";
import { LuHome, LuSettings } from "react-icons/lu";
import { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import LogoIcon from "../icons/logo/logoIcon";
import { HiOutlineBell } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";

function DashboardHeader() {
  const navigate = useNavigate(); //react router to route to different links

  const { getUser, user, isBigScreen } = useContext(UserContext);
  const { first_name, last_name, type } = user;

  const path = window.location.pathname;

  // scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const user_length = Object.keys(user).length;

  return (
    <div className={classes.container}>
      <div className={classes.logo} onClick={() => navigate("/")}>
        <LogoIcon fill={isBigScreen ? "#000" : "#fff"} />
      </div>
      {user_length > 0 && (
        <>
          <p className={classes.text}>
            Welcome{" "}
            <span className={classes.user_names}>
              {first_name + " " + last_name}
            </span>{" "}
            <p className={classes.account_type}>
              {type && type.replace(/_/g, " ")}
            </p>
          </p>

          {/* dashboard navigation buttons */}
          <div className={classes.navigation_btn_container}>
            <div
              onClick={() => {
                navigate("/dashboard");
                scrollToTop();
              }}
              className={classes.nav_icon_container}
            >
              <LuHome className={classes.nav_icon} />
              <div
                style={
                  path === "/dashboard"
                    ? { background: "#FF4500" }
                    : { background: "none" }
                }
                className={classes.small_dot}
              ></div>
            </div>

            {/* sales report */}
            <div
              onClick={() => {
                navigate("/sales-report");
                scrollToTop();
              }}
              className={classes.nav_icon_container}
            >
              <TbMoneybag className={classes.nav_icon} />
              <div
                style={
                  path === "/sales-report"
                    ? { background: "#FF4500" }
                    : { background: "none" }
                }
                className={classes.small_dot}
              ></div>
            </div>

            <div
              onClick={() => {
                navigate("/dashboard/settings");
                scrollToTop();
              }}
              className={classes.nav_icon_container}
            >
              <LuSettings className={classes.nav_icon} />
              <div
                style={
                  path === "/dashboard/settings"
                    ? { background: "#FF4500" }
                    : { background: "none" }
                }
                className={classes.small_dot}
              ></div>
            </div>

            <div
              onClick={() => {
                navigate("/dashboard/notifications");
                scrollToTop();
              }}
              className={classes.bell_container}
            >
              <HiOutlineBell className={classes.nav_icon} />
              <div
                style={
                  path === "/dashboard/notifications"
                    ? { background: "#FF4500" }
                    : { background: "none" }
                }
                className={classes.small_dot}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardHeader;
