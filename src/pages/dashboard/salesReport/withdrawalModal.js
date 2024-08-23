import { useContext, useState } from "react";
import classes from "./salesReport.module.css";
import axios from "axios";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";

export default function WithdrawalModal({ func }) {
  const url = process.env.REACT_APP_BACKEND_SERVER_URL;
  const { alert } = useContext(AlertContext);

  const [value, setValue] = useState({
    phoneNumber: "",
    bank: "",
    accountNumber: "",
    accountName: "",
    utility_bill: "",
    password: "",
  });

  const {
    phoneNumber,
    bank,
    accountNumber,
    accountName,
    utility_bill,
    password,
  } = value;
  const onChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const [loadingProgress, setLoadingProgress] = useState(null);
  const submitWithdrawal = async (val) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setLoadingProgress(percentage);
      },
    };

    try {
      const res = await axios.post(`${url}/salesReport/payment`, val, config);
      const data = res.data;
      alert(data.msg);
      func();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
      const err = error.response.data.msg;
      alert(err);
    } finally {
      setLoadingProgress(null);
    }
  };

  const submit = () => {
    if (!phoneNumber) {
      return alert(`enter phone number`);
    }
    if (!bank) {
      return alert(`enter bank`);
    }
    if (!accountNumber) {
      return alert(`enter account number`);
    }
    if (!accountName) {
      return alert(`enter account name`);
    }
    if (!utility_bill) {
      return alert(`upload utility bill`);
    }

    const formData = new FormData();
    Object.entries(value).forEach(([key, value]) =>
      formData.append(key, value)
    );

    submitWithdrawal(formData);
  };
  return (
    <div className={classes.withdrawal_modal}>
      <div className={classes.withdrawal_sub_container}>
        <p className={classes.modal_page_title}>Submit a Withdrawal Request</p>

        <div className={classes.input_container}>
          <input
            value={phoneNumber}
            name={"phoneNumber"}
            onChange={onChange}
            className={classes.input}
            placeholder="Phone number"
            type="tel"
          />
        </div>

        <div className={classes.input_container}>
          <input
            value={bank}
            name={"bank"}
            onChange={onChange}
            className={classes.input}
            placeholder="Bank"
            type="text"
          />
        </div>

        <div className={classes.input_container}>
          <input
            value={accountNumber}
            name={"accountNumber"}
            onChange={onChange}
            className={classes.input}
            placeholder="Account number"
            type="text"
          />
        </div>

        <div className={classes.input_container}>
          <input
            value={accountName}
            name={"accountName"}
            onChange={onChange}
            className={classes.input}
            placeholder="Account name"
            type="text"
          />
        </div>

        <label className={classes.label}>
          <input
            // value={utility_bill}
            name={"utility_bill"}
            onChange={onChangeFile}
            type="file"
            required
          />
          <span>
            {utility_bill.name || "Upload utility bill (within 3 months)"}
          </span>
        </label>

        <div className={classes.input_container}>
          <input
            value={password}
            name={"password"}
            onChange={onChange}
            className={classes.input}
            placeholder="Password"
            type="password"
          />
        </div>
        <p onClick={submit} className={classes.action_btn}>
          {loadingProgress !== null ? `${loadingProgress}%` : "submit"}
        </p>

        <p onClick={func} className={classes.close_btn_modal}>
          close
        </p>
      </div>
    </div>
  );
}
