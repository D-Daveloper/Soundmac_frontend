import { useContext, useEffect, useState } from "react";
import classes from "./otpModal.module.css";
import OtpModalContext from "../../context/otpModal/otpModalContext";
import LoaderBall from "../loader/loaderBall/loaderBall";
import UserContext from "../../context/user/userContext";

function OtpModal() {
  const { popUpOtpModal, verifying, confirmOtp, otp, onChange } = useContext(
    OtpModalContext
  );

  const { userValues } = useContext(UserContext);
  const { resendOtp } = useContext(OtpModalContext);

  const { email } = userValues;

  useEffect(() => {
    otp.length === 6 && confirmOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  //countdown

  const [resend, setResend] = useState(false);

  setTimeout(() => {
    setResend(true);
  }, 60000);

  const [timer, setTimer] = useState(120); // Initial timer value in seconds

  // Function to decrease the timer
  const decreaseTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  };

  // This useEffect will run when the component mounts (empty dependency array) and set up the interval
  useEffect(() => {
    const intervalId = setInterval(decreaseTimer, 1000); // Decrease the timer every 1 second (1000ms)

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <p className={classes.title}>Enter Otp!</p>

        <div className={classes.input_container}>
          <input
            value={otp}
            onChange={onChange}
            className={classes.input}
            type="number"
            disabled={verifying}
          />

          {verifying && (
            <div className={classes.loader}>
              <LoaderBall />
            </div>
          )}
        </div>

        <p
          onClick={() => {
            popUpOtpModal();
          }}
          className={classes.action_btn}
        >
          Cancel
        </p>
        {resend ? (
          <p
            onClick={() => {
              resendOtp(email);
            }}
            className={classes.msg}
          >
            Resend Otp
          </p>
        ) : (
          <p className={classes.msg}>Resend Otp in: {timer}s</p>
        )}
      </div>
    </div>
  );
}
export default OtpModal;
