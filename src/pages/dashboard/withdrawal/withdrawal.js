/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import classes from "./withdrawal.module.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Back from "../../../utils/backBtn/backBtn";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";
import AnchorArrow from "../../../utils/icons/settingsIcon/anchorArrow/anchorArrow";

export default function Withdrawal() {
  const url = process.env.REACT_APP_BACKEND_SERVER_URL;
  const token = localStorage.getItem("soundmac3_token");
  const { alert, pop } = useContext(AlertContext);

  const [withdrawalReq, setWithdrawalReq] = useState([]);
  const [otherRes, setOtherRes] = useState({
    page: "",
    skip: "",
    limit: "",
    totalCount: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const next = () => {
    navigate(`?page=${parseInt(page || "1") + 1}`);
    getWithdrawalReq(parseInt(page | "1") + 1);
  };

  const prev = () => {
    if (page) {
      navigate(`?page=${parseInt(page) - 1}`);
      getWithdrawalReq(parseInt(page) - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getWithdrawalReq = async (page) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    try {
      const res = await axios.get(
        `${url}/salesReport/withdrawal?page=${page}`,
        config
      );
      const data = res.data;
      console.log(data.pendingWithdrawal);

      setWithdrawalReq(data.pendingWithdrawal);
      setOtherRes({
        page: data.page,
        skip: data.pageSkip,
        limit: data.limit,
        totalCount: data.totalCount,
      });
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

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    getWithdrawalReq(page || "1");
  }, []);

  const prompt = (user, withdrawal_id, skip, action, rate) => {
    pop({
      title: `${action}`,
      msg: `are you sure you want to ${action}`,
      actionBtn: `${action}`,
      actionBtnFunction: () => {
        processPayment(user, withdrawal_id, skip, action, rate);
      },
      showActionBtn: true,
    });
  };

  const [processing, setProcessing] = useState(false);
  const processPayment = async (user, withdrawal_id, skip, action, rate) => {
    setProcessing(true);
    const payload = {
      client_id: user,
      withdrawal_id: withdrawal_id,
      skip: skip,
      action: action,
      rate: rate,
    };

    const body = JSON.stringify(payload);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.patch(
        `${url}/salesReport/withdrawal`,
        body,
        config
      );
      const data = res.data;
      getWithdrawalReq(page || "1");
      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={classes.container}>
      <p
        className={classes.refresh}
        onClick={() => getWithdrawalReq(page || "1")}
      >
        Refresh
      </p>
      <div className={classes.back_container}>
        <Back
          show_arrow={true}
          title={"Pending withdrawal"}
          route={"/dashboard"}
        />
      </div>

      {loading ? (
        <div className={classes.loader_container}>
          <div className={classes.loader_sub_container}>
            <LoaderBall />
          </div>
        </div>
      ) : (
        <div className={classes.sub_container}>
          <div className={classes.page_title_grouped}>
            <p className={classes.page_title}>
              Page: <span className={classes.emphasis}>{otherRes.page}</span>
            </p>
            <p className={classes.page_title}>
              Result:{" "}
              <span className={classes.emphasis}>
                {`${otherRes.skip} - ${
                  otherRes.totalCount > otherRes.limit
                    ? otherRes.skip + otherRes.limit
                    : otherRes.totalCount
                } out of ${otherRes.totalCount}`}
              </span>
            </p>
          </div>

          {withdrawalReq?.map((item, index) => (
            <div className={classes.info_container} key={index}>
              <p className={classes.amount}>$ {item.amount}</p>
              <div className={classes.con}>
                <p className={classes.label}>
                  Bank:
                  <span className={classes.label_answer}>{item.bank}</span>
                </p>

                <p className={classes.label}>
                  Account number:
                  <span className={classes.label_answer}>
                    {item.accountNumber}
                  </span>
                </p>

                <p className={classes.label}>
                  Account name:
                  <span className={classes.label_answer}>
                    {item.accountName}
                  </span>
                </p>
              </div>

              <div className={classes.btn_con}>
                {processing ? (
                  <p className={classes.processing}>processing...</p>
                ) : (
                  <>
                    <p
                      onClick={() =>
                        prompt(item.user, item._id, item.skip, "reject", "1200")
                      }
                      className={classes.btn_reject}
                    >
                      Reject
                    </p>
                    <p
                      onClick={() =>
                        prompt(
                          item.user,
                          item._id,
                          item.skip,
                          "approve",
                          "1200"
                        )
                      }
                      className={classes.btn_approve}
                    >
                      Approve
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {withdrawalReq.length <= 0 && (
        <div className={classes.nothing_container}>
          <p className={classes.nothing_text}>no result</p>
          {withdrawalReq.page > 1 && (
            <p onClick={prev} className={classes.nothing_btn}>
              Go to previous page
            </p>
          )}
        </div>
      )}

      {withdrawalReq.length > 0 && (
        <div className={classes.pagination_container}>
          {withdrawalReq.page > 1 && (
            <div
              onClick={prev}
              className={classes.pagination_individual_container}
            >
              <div className={classes.anchor_prev}>
                <AnchorArrow />
              </div>
              <p>Prev</p>
            </div>
          )}

          <div
            onClick={next}
            className={classes.pagination_individual_container}
          >
            <p>Next</p>
            <AnchorArrow />
          </div>
        </div>
      )}
    </div>
  );
}
