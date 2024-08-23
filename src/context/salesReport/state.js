/* eslint-disable array-callback-return */

import axios from "axios";
import SalesReportContext from "./context";
import { useContext, useState } from "react";
import AlertContext from "../alertAndPopUp/alertAndPopUpContext";

const SalesReportState = ({ children }) => {
  const url = process.env.REACT_APP_BACKEND_SERVER_URL;
  const token = localStorage.getItem("soundmac3_token");

  const { alert } = useContext(AlertContext);

  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getSalesReport = async (page) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    try {
      const res = await axios.get(`${url}/salesReport?page=${page}`, config);
      const data = res.data;

      setReport(data);
      scrollToTop();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setLoading(false);
    }
  };

  const [gettingPayment, setGettingPayment] = useState(false);
  const [duePayment, setDuePayment] = useState("");
  const getDuePayment = async () => {
    setGettingPayment(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${url}/salesReport/payment`, config);
      const data = res.data;

      setDuePayment(data.amount_earned);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setGettingPayment(false);
    }
  };

  return (
    <SalesReportContext.Provider
      value={{
        getSalesReport,
        report,
        loading,
        getDuePayment,
        gettingPayment,
        duePayment,
      }}
    >
      {children}
    </SalesReportContext.Provider>
  );
};
export default SalesReportState;
