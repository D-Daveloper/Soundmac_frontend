import { useContext, useState } from "react";
import OtpModalContext from "./otpModalContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertContext from "../alertAndPopUp/alertAndPopUpContext";

const OtpModalState = ({ children }) => {
  const url = process.env.REACT_APP_BACKEND_SERVER_URL;

  const navigate = useNavigate();

  const { pop, alert } = useContext(AlertContext);
  //   const { userValues } = useContext(UserContext);

  // pop up otp modal
  const [otpModal, setOtpModal] = useState(false);

  const popUpOtpModal = (val) => {
    setOtpModal(val);
  };

  // Enter otp
  const [otp, setOtp] = useState("");

  const onChange = (e) => {
    setOtp(e.target.value);
  };

  //confirm otp
  const [verifying, setVerifying] = useState(false);

  const confirmOtp = async () => {
    setVerifying(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ otp: otp });

    try {
      const res = await axios.patch(`${url}/auth/confirmOtp`, body, config);
      const data = res.data;

      navigate(`/dashboard`);

      popUpOtpModal(false);
      localStorage.setItem("soundmac3_token", data.token);
      pop({
        title: "Log In successful!",
        msg: data.msg,
        showActionBtn: false,
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setVerifying(false);
      setOtp(""); // clear otp
    }
  };

  //   resend otp
  const [resending, setResending] = useState(false);

  const resendOtp = async (val) => {
    setResending(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email: val });

    try {
      const res = await axios.patch(`${url}/auth/resendOtp`, body, config);
      const data = res.data;

      pop({
        title: "OTP Re-sent!",
        msg: data.msg,
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <OtpModalContext.Provider
      value={{
        otpModal,
        popUpOtpModal,
        verifying,
        confirmOtp,
        otp,
        onChange,
        resending,
        resendOtp,
      }}
    >
      {children}
    </OtpModalContext.Provider>
  );
};
export default OtpModalState;
