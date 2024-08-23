import { useContext, useState } from "react";
import classes from "./auth.module.css";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { countries } from "../utils/list/countries";
import { useNavigate } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import AlertContext from "../context/alertAndPopUp/alertAndPopUpContext";
import UserContext from "../context/user/userContext";
import LoaderBall from "../utils/loader/loaderBall/loaderBall";
import LogoIcon from "../utils/icons/logo/logoIcon";

function Register() {
  const navigate = useNavigate();

  //context
  const { alert } = useContext(AlertContext);
  const { loading, registerUser } = useContext(UserContext);

  const { registering } = loading;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //this state tells if the user can see the password when typing.
  const [isReEnterPasswordVisible, setIsReEnterPasswordVisible] = useState(
    false
  ); //this state tells if the user can see the re-entered password when typing.

  // state
  const [userValues, setUserValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country: "",
    re_entered_password: "",
    referral_code: "",
  });

  // destructure
  const {
    first_name,
    last_name,
    email,
    password,
    country,
    re_entered_password,
    referral_code,
  } = userValues;

  // for password checks
  const [passwordCheck, setPasswordCheck] = useState({
    characters: false,
    number: false,
    symbol: false,
  });

  const checkPassword = (e) => {
    const password = e.target.value;
    const hasMinimumLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|-]/.test(password);

    setPasswordCheck((prev) => ({
      ...prev,
      characters: hasMinimumLength,
      number: hasNumber,
      symbol: hasSymbol,
    }));
  };

  // destructure password check
  const { characters, number, symbol } = passwordCheck;

  // save values to state
  const onChange = (e) => {
    setUserValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // register
  const register = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email reGex
    const isEmailValid = emailPattern.test(email);

    //checks
    if (first_name === "") {
      alert(`first name can't be blank!`);
    } else if (last_name === "") {
      alert(`last name can't be blank!`);
    } else if (email === "") {
      alert(`email address can't be blank!`);
    } else if (!isEmailValid) {
      alert("invalid email!");
    } else if (country === "" || country === "Country") {
      alert(`country can't be blank!`);
    } else if (password === "") {
      alert(`password can't be blank!`);
    } else if (re_entered_password === "") {
      alert(`re entered password can't be blank!`);
    } else if (!characters) {
      alert(`password must be min. of 6 characters!`);
    } else if (!number) {
      alert(`password must contain a digit!`);
    } else if (!symbol) {
      alert(`password must contain a symbol (e.g @#$%^&*)!`);
    } else if (password !== re_entered_password) {
      alert(`passwords don't match!`);
    } else {
      registerUser(userValues);
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
        <p className={classes.heading}>Register</p>
        <p
          className={classes.sub_heading}
          onClick={() => navigate("/auth/login")}
        >
          Already have an account? <span className={classes.cta}>Log In</span>
        </p>

        <div className={classes.register_flex}>
          {/* first name */}
          <div className={classes.register_input_container}>
            <input
              placeholder="First name"
              className={classes.login_input}
              type="text"
              name="first_name"
              value={userValues.first_name}
              onChange={onChange}
            />
          </div>

          {/* last name */}
          <div className={classes.register_input_container}>
            <input
              placeholder="Last name"
              className={classes.login_input}
              type="text"
              name="last_name"
              value={userValues.last_name}
              onChange={onChange}
            />
          </div>

          {/* email */}
          <div className={classes.register_input_container}>
            <input
              placeholder="Email"
              className={classes.login_input}
              type="email"
              name="email"
              value={userValues.email}
              onChange={onChange}
            />
          </div>

          {/* country */}
          <div className={classes.register_input_container}>
            <select
              name="country"
              value={userValues.country}
              onChange={onChange}
              className={classes.login_input}
            >
              <option>Country</option>
              {countries.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>

          {/* password */}
          <div className={classes.register_input_container}>
            <input
              placeholder="Password"
              className={classes.login_input}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={userValues.password}
              onChange={(e) => {
                checkPassword(e);
                onChange(e);
              }}
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
          <div className={classes.register_input_container}>
            <input
              placeholder="Password"
              className={classes.login_input}
              type={isReEnterPasswordVisible ? "text" : "password"}
              name="re_entered_password"
              value={userValues.re_entered_password}
              onChange={onChange}
            />
            {isReEnterPasswordVisible ? (
              <FiEye
                className={classes.eye_icon}
                onClick={() => setIsReEnterPasswordVisible(false)}
              />
            ) : (
              <FiEyeOff
                className={classes.eye_icon}
                onClick={() => setIsReEnterPasswordVisible(true)}
              />
            )}
          </div>
        </div>

        {/* password check */}
        <div className={classes.password_check_group}>
          <div className={classes.password_checks_container}>
            {characters && <BsCheckLg className={classes.check_icon} />}
            <p className={classes.password_checks}>Minimum of 6 characters</p>
          </div>

          <div className={classes.password_checks_container}>
            {number && <BsCheckLg className={classes.check_icon} />}
            <p className={classes.password_checks}>Contains a digit </p>
          </div>

          <div className={classes.password_checks_container}>
            {symbol && <BsCheckLg className={classes.check_icon} />}
            <p className={classes.password_checks}>
              Contains a symbol (e.g @#$%^&*){" "}
            </p>
          </div>
        </div>

        {/* referral code */}
        <div className={classes.register_input_container}>
          <input
            placeholder="Referral code"
            className={classes.login_input}
            type="text"
            name="referral_code"
            value={referral_code}
            onChange={onChange}
          />
        </div>

        <div className={classes.register_btn_container}>
          <p className={classes.warning}>
            By clicking the Register button you agree that you have read the
            <span
              onClick={() => navigate("/legal")}
              className={classes.emphasis}
            >
              Terms and Conditions
            </span>
            ,{" "}
            <span
              onClick={() => navigate("/legal")}
              className={classes.emphasis}
            >
              Privacy Policy
            </span>{" "}
            and you are fine with it.
          </p>

          {registering ? (
            <p className={classes.login_btn}>
              <LoaderBall />
            </p>
          ) : (
            <p onClick={register} className={classes.login_btn}>
              Register
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
