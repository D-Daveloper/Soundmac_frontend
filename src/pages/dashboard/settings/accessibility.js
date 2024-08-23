/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import classes from "./settings.module.css";
import Back from "../../../utils/backBtn/backBtn";
import { useContext, useEffect } from "react";
import UserContext from "../../../context/user/userContext";

export default function Accessibility() {
  const { isFirstTimer, setIsFirstTimer } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsFirstTimer(localStorage.getItem("show_soundmac_dashboard_tutorial"));
  }, []);

  return (
    <div className={classes.container}>
      <div
        onClick={() => navigate("/dashboard/settings")}
        className={classes.back_container}
      >
        <Back show_arrow={true} title={"Accessibility"} />
      </div>
      <div className={classes.accessibility_sub_container}>
        <div className={classes.checkbox_container}>
          <p className={classes.check_box_text}>Show dashboard tutorials</p>{" "}
          <input
            onChange={() => {
              isFirstTimer === "true"
                ? localStorage.removeItem("show_soundmac_dashboard_tutorial")
                : localStorage.setItem(
                    "show_soundmac_dashboard_tutorial",
                    true
                  );
              navigate("/dashboard");
            }}
            checked={isFirstTimer === "true"}
            className={classes.checkbox}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
}
