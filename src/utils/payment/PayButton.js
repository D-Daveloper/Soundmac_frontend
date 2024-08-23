import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import classes from "./payment.module.css";

export default function FLWPayButton({
  title,
  description,
  text,
  action,
  email,
  phone_number,
  name,
  background,
  amount,
  currency,
}) {
  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone_number,
      name: name,
    },
    customizations: {
      title: title,
      description: description,
      logo:
        "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: text,
    callback: (response) => {
      if (response.status === "successful") {
        action();
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div style={{ background: background }} className={classes.btn_bg}>
      <FlutterWaveButton className={classes.button} {...fwConfig} />
    </div>
  );
}
