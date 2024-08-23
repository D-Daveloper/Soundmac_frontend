import { useContext, useState } from "react";
import classes from "./auth.module.css";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alertAndPopUp/alertAndPopUpContext";
import UserContext from "../context/user/userContext";
import LoaderBall from "../utils/loader/loaderBall/loaderBall";
import LogoIcon from "../utils/icons/logo/logoIcon";

function Login() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //this state tells if the user can see the password when typing.

  //context
  const { alert } = useContext(AlertContext);
  const {
    loading,
    loginUser,
    userValues,
    onChangeLoginInput,
    popEnterEmailModal,
  } = useContext(UserContext);

  const { logging_in } = loading;

  // destructure
  const { email, password } = userValues;
  // login
  const login = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email reGex
    const isEmailValid = emailPattern.test(email);

    //checks
    if (email === "") {
      alert(`email address can't be blank!`);
    } else if (!isEmailValid) {
      alert("invalid email!");
    } else if (password === "") {
      alert(`password can't be blank!`);
    } else {
      loginUser(userValues);
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
        <p className={classes.heading}>LOGIN</p>
        <p
          className={classes.sub_heading}
          onClick={() => navigate("/auth/register")}
        >
          Don’t have an account? <span className={classes.cta}>Register</span>
        </p>

        {/* email */}
        <div className={classes.login_input_container}>
          <input
            placeholder="Email"
            className={classes.login_input}
            type="email"
            name="email"
            value={userValues.email}
            onChange={onChangeLoginInput}
          />
        </div>

        {/* password */}
        <div className={classes.login_input_container}>
          <input
            placeholder="Password"
            className={classes.login_input}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={userValues.password}
            onChange={onChangeLoginInput}
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
        <p
          onClick={() => popEnterEmailModal(true)}
          className={classes.forgot_password}
        >
          Forgot Password?
        </p>

        <div className={classes.login_btn_container}>
          {logging_in ? (
            <p className={classes.login_btn}>
              <LoaderBall />
            </p>
          ) : (
            <p onClick={login} className={classes.login_btn}>
              Log in
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
