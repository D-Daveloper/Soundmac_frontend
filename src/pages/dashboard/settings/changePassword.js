import { useContext, useState } from "react";
import classes from "../addFirstArtiste/addFirstArtiste.module.css";
import UserContext from "../../../context/user/userContext";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";
import Back from "../../../utils/backBtn/backBtn";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";
import { BsCheckLg } from "react-icons/bs";

function ChangePassword() {
  const { user, changePassword, changing_password } = useContext(UserContext);

  const { alert } = useContext(AlertContext);

  const [values, setValues] = useState({
    old_password: "",
    new_password: "",
    re_enter_password: "",
  });

  const { old_password, new_password, re_enter_password } = values;

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //this state tells if the user can see the password when typing.

  // destructure password check
  const { characters, number, symbol } = passwordCheck;

  // save values to state
  const onChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // change password
  const changePasswordFn = () => {
    if (old_password === "") {
      alert(`old password can't be blank!`);
    } else if (new_password === "") {
      alert(`new password can't be blank!`);
    } else if (re_enter_password === "") {
      alert(`re entered password can't be blank!`);
    } else if (!characters) {
      alert(`password must be min. of 6 characters!`);
    } else if (!number) {
      alert(`password must contain a digit!`);
    } else if (!symbol) {
      alert(`password must contain a symbol (e.g @#$%^&*)!`);
    } else if (new_password !== re_enter_password) {
      alert(`passwords don't match!`);
    } else {
      changePassword(values);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <Back
          show_arrow={user.artiste ? true : false}
          title={"Change password"}
          route={"/dashboard/settings"}
        />
        <div className={classes.select_containers}>
          <div className={classes.select_container}>
            <input
              className={classes.input}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={"Old password"}
              name="old_password"
              value={old_password}
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

          <div className={classes.select_container}>
            <input
              className={classes.input}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={"New password"}
              name="new_password"
              value={new_password}
              onChange={(e) => {
                onChange(e);
                checkPassword(e);
              }}
            />
          </div>

          <div className={classes.select_container}>
            <input
              className={classes.input}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={"Re-Enter new password"}
              name="re_enter_password"
              value={re_enter_password}
              onChange={onChange}
            />
          </div>

          {/* password check */}
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

        {changing_password ? (
          <div className={classes.loader_con}>
            <div className={classes.loader}>
              <LoaderBall />
            </div>
          </div>
        ) : (
          <p onClick={changePasswordFn} className={classes.add_artiste}>
            Change
          </p>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
