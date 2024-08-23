import { useContext } from "react";
import classes from "../otpModal/otpModal.module.css";
import LoaderBall from "../loader/loaderBall/loaderBall";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alertAndPopUp/alertAndPopUpContext";

function EnterEmail() {
  const {
    forgotPasswordVal,
    enter_forgot_password_mail,
    sending_link,
    popEnterEmailModal,
    sendResetLink,
  } = useContext(UserContext);

  const { alert } = useContext(AlertContext);

  const { email } = forgotPasswordVal;

  const submit = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email reGex
    const isEmailValid = emailPattern.test(email);

    if (email === "") {
      alert(`email can't be blank`);
    } else if (!isEmailValid) {
      alert(`invalid email`);
    } else {
      sendResetLink(forgotPasswordVal);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <p className={classes.title}>Enter Email!</p>

        <div className={classes.input_container}>
          <input
            value={email}
            onChange={enter_forgot_password_mail}
            className={classes.input}
            type="email"
            name="email"
            disabled={sending_link}
          />
        </div>
        {sending_link ? (
          <div className={classes.enter_email_loader_con}>
            <div className={classes.enter_email_loader}>
              <LoaderBall />
            </div>
          </div>
        ) : (
          <>
            <p
              onClick={() => {
                submit();
              }}
              className={classes.action_btn}
            >
              Send reset link
            </p>
            <p
              onClick={() => {
                popEnterEmailModal(false);
              }}
              className={classes.close_btn}
            >
              Cancel
            </p>
          </>
        )}
      </div>
    </div>
  );
}
export default EnterEmail;
