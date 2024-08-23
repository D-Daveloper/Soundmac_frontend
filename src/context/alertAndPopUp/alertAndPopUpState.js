import { useState } from "react";
import AlertContext from "./alertAndPopUpContext";

const AlertState = ({ children }) => {
  const [alertMsg, setAlertMsg] = useState("");

  // throw alert
  const alert = (val) => {
    setAlertMsg(val);

    setTimeout(() => {
      setAlertMsg("");
    }, 3000);
  };

  // remove alert
  const removeAlert = () => {
    setAlertMsg("");
  };

  //empty popup message

  const [popUpMsg, setPopUpMsg] = useState({
    title: "",
    msg: "",
    actionBtn: "",
    actionBtnFunction: "",
    showActionBtn: false,
  });
  // throw popup
  const pop = (val) => {
    setPopUpMsg(val);
  };

  // remove popup
  const removePopUp = () => {
    setPopUpMsg({
      title: "",
      msg: "",
      actionBtn: "",
      actionBtnFunction: "",
      showActionBtn: false,
    });
  };
  return (
    <AlertContext.Provider
      value={{ alert, alertMsg, removeAlert, pop, popUpMsg, removePopUp }}
    >
      {children}
    </AlertContext.Provider>
  );
};
export default AlertState;
