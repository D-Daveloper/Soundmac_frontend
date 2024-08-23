import { useContext } from "react";
import classes from "./alert.module.css";
import { AiOutlineClose } from "react-icons/ai";
import AlertContext from "../../context/alertAndPopUp/alertAndPopUpContext";

function Alert() {
  const { alertMsg, removeAlert } = useContext(AlertContext);

  return (
    <div className={classes.container}>
      <div className={classes.alert_container}>
        <p className={classes.alert}>{alertMsg}</p>

        <AiOutlineClose onClick={removeAlert} className={classes.cancel_icon} />
      </div>
    </div>
  );
}

export default Alert;
