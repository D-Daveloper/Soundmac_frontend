import { useContext } from "react";
import { PaystackConsumer } from "react-paystack";
import classes from "./payment.module.css";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alertAndPopUp/alertAndPopUpContext";

export default function PayStack({ email, name, amount, type }) {
  const { createAccount } = useContext(UserContext);
  const { alert } = useContext(AlertContext);

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
  };

  const handleSuccess = () => {
    createAccount({ type: type });
  };

  const handleClose = () => {
    alert(`error making payment!`);
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <div>
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <p
            className={classes.btn_bg}
            onClick={() => initializePayment(handleSuccess, handleClose)}
          >
            Pay ({`₦ ${amount}`})
          </p>
        )}
      </PaystackConsumer>
    </div>
  );
}
