import { useContext } from "react";
import classes from "./popUp.module.css";
import AlertContext from "../../context/alertAndPopUp/alertAndPopUpContext";

function PopUp() {
  const { popUpMsg, removePopUp } = useContext(AlertContext);
  const { title, msg, actionBtn, actionBtnFunction, showActionBtn } = popUpMsg;

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <p className={classes.title}>{title}</p>
        <p className={classes.msg}>{msg}</p>
        {showActionBtn && (
          <p
            onClick={() => {
              actionBtnFunction();
              removePopUp();
            }}
            className={classes.action_btn}
          >
            {actionBtn}
          </p>
        )}

        <p
          onClick={() => {
            removePopUp();
          }}
          className={classes.close_btn}
        >
          Close
        </p>
      </div>
    </div>
  );
}
export default PopUp;
