import { useContext, useState } from "react";
import classes from "./auth.module.css";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import AlertContext from "../context/alertAndPopUp/alertAndPopUpContext";
import UserContext from "../context/user/userContext";
import LoaderBall from "../utils/loader/loaderBall/loaderBall";
import LogoIcon from "../utils/icons/logo/logoIcon";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //this state tells if the user can see the password when typing.

  //context
  const { alert } = useContext(AlertContext);
  const { loading, resetPassword } = useContext(UserContext);

  const [searchParams] = useSearchParams();

  const [value, setValue] = useState({
    password: "",
    re_enter_password: "",
    token: searchParams.get("token"),
  });

  const onChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { logging_in } = loading;

  // destructure
  const { password, re_enter_password } = value;
  // reset
  const reset = () => {
    //checks
    if (password === "") {
      alert(`password can't be blank!`);
    } else if (re_enter_password === "") {
      alert(`password can't be blank!`);
    } else if (password !== re_enter_password) {
      alert(`password don't match!`);
    } else {
      resetPassword(value);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo_container}>
        <div className={classes.logo}>
          <LogoIcon fill={"#fff"} />
        </div>
        <p className={classes.soundmac}>SOUNDMAC</p>
      </div>

      <div className={classes.sub_container}>
        <p className={classes.heading}>RESET PASSWORD</p>

        {/* password */}
        <div className={classes.login_input_container}>
          <input
            placeholder="Password"
            className={classes.login_input}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={value.password}
            onChange={onChange}
          />
          {isPasswordVisible ? (
            <FiEye
              className={classes.eye_icon}
              onClick={() => setIsPasswordVisible(false)}
            />
          ) : (
            <FiEyeOff
              className={classes.eye_icon}
              onClick={() => setIsPasswordVisible(true)}
            />
          )}
        </div>

        {/* re-enter password */}
        <div className={classes.login_input_container}>
          <input
            placeholder="Re-Enter Password"
            className={classes.login_input}
            type={isPasswordVisible ? "text" : "password"}
            name="re_enter_password"
            value={value.re_enter_password}
            onChange={onChange}
          />
        </div>

        <div className={classes.login_btn_container}>
          {logging_in ? (
            <p className={classes.login_btn}>
              <LoaderBall />
            </p>
          ) : (
            <p onClick={reset} className={classes.login_btn}>
              Reset
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
