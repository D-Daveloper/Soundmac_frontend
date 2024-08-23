/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import classes from "./selectAccountType.module.css";
import UserContext from "../../../context/user/userContext";
import Back from "../../../utils/backBtn/backBtn";
import { useNavigate } from "react-router-dom";
import PayStack from "../../../utils/payment/paystack";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";

function SelectAccountType() {
  const { accountVal, selectType, setAmount, user, createAccount } = useContext(
    UserContext
  );

  const { pop } = useContext(AlertContext);

  const navigate = useNavigate();

  const { type, amount } = accountVal;

  const { email } = user;

  useEffect(() => {
    const warn = () => {
      pop({
        title: "Existing Subscription!",
        msg: `you still have an existing subscription and we hope you understand that if you proceed to payment your existing subscription would be extended by the new duration.`,
        actionBtn: "Go back",
        actionBtnFunction: () => navigate("/dashboard/settings"),
        showActionBtn: true,
      });
    };

    user.premiumExpiration && warn();
  }, [user]);

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <Back
          show_arrow={user.type ? true : false}
          title={"Select account"}
          route={"/dashboard/settings"}
        />

        <p className={classes.instruction}>
          Paid account are known as premium accounts & they enjoy certain
          benefits,{" "}
          <span
            className={classes.click_here}
            onClick={() => navigate("/pricing")}
          >
            click here
          </span>{" "}
          to learn more
        </p>

        {user.premiumExpiration && (
          <div className={classes.warning_container}>
            <p className={classes.warn}>
              <span className={classes.warn_heading}>Warning: </span>
              You still have an existing subscription and we hope you understand
              that if you proceed to payment your existing subscription would be
              extended by the new duration.
            </p>
          </div>
        )}

        {/* FREE_ARTISTE */}
        <div className={classes.select_containers}>
          <div
            style={
              type === "FREE_ARTISTE"
                ? { background: "#4169E1", border: "none" }
                : {}
            }
            onClick={() => {
              selectType(`FREE_ARTISTE`);
              setAmount(process.env.REACT_APP_FREE_ARTISTE_AMOUNT);
            }}
            className={classes.select_container}
          >
            <p
              style={type === "FREE_ARTISTE" ? { color: "#fff" } : {}}
              className={classes.account_name}
            >
              Free Account ($0.00)
            </p>
            <div
              style={
                type === "FREE_ARTISTE"
                  ? { border: "none", background: "#fff" }
                  : {}
              }
              className={classes.selector}
            ></div>
          </div>

          {/* INDEPENDENT_ARTISTE */}
          <div
            style={
              type === "INDEPENDENT_ARTISTE"
                ? { background: "#4169E1", border: "none" }
                : {}
            }
            onClick={() => {
              selectType(`INDEPENDENT_ARTISTE`);
              setAmount(process.env.REACT_APP_INDEPENDENT_ARTISTE_AMOUNT);
            }}
            className={classes.select_container}
          >
            <p
              style={type === "INDEPENDENT_ARTISTE" ? { color: "#fff" } : {}}
              className={classes.account_name}
            >
              Independent Artiste Account ($14.99)
            </p>
            <div
              style={
                type === "INDEPENDENT_ARTISTE"
                  ? { border: "none", background: "#fff" }
                  : {}
              }
              className={classes.selector}
            ></div>
          </div>

          {/* MINI_LABEL */}
          <div
            style={
              type === "MINI_LABEL"
                ? { background: "#4169E1", border: "none" }
                : {}
            }
            onClick={() => {
              selectType(`MINI_LABEL`);
              setAmount(process.env.REACT_APP_MINI_LABEL_AMOUNT);
            }}
            className={classes.select_container}
          >
            <p
              style={type === "MINI_LABEL" ? { color: "#fff" } : {}}
              className={classes.account_name}
            >
              Mini-Label Account ($99.99)
            </p>
            <div
              style={
                type === "MINI_LABEL"
                  ? { border: "none", background: "#fff" }
                  : {}
              }
              className={classes.selector}
            ></div>
          </div>

          {/* BIG_LABEL */}
          <div
            style={
              type === "BIG_LABEL"
                ? { background: "#4169E1", border: "none" }
                : {}
            }
            onClick={() => {
              selectType(`BIG_LABEL`);
              setAmount(process.env.REACT_APP_BIG_LABEL_AMOUNT);
            }}
            className={classes.select_container}
          >
            <p
              style={type === "BIG_LABEL" ? { color: "#fff" } : {}}
              className={classes.account_name}
            >
              Label Account ($149.99)
            </p>
            <div
              style={
                type === "BIG_LABEL"
                  ? { border: "none", background: "#fff" }
                  : {}
              }
              className={classes.selector}
            ></div>
          </div>
        </div>

        <div className={classes.checkout_sub_con}>
          {type === "FREE_ARTISTE" ? (
            <p
              onClick={() => createAccount({ type: type })}
              className={classes.button}
            >
              Proceed to dashboard (FREE)
            </p>
          ) : (
            <PayStack
              action={() => createAccount({ type: type })}
              email={email}
              amount={parseFloat(amount)}
              type={type}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectAccountType;
