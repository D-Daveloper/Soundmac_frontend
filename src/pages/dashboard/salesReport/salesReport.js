/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./salesReport.module.css";
import Back from "../../../utils/backBtn/backBtn";
import { useContext, useEffect, useState } from "react";
import SalesReportContext from "../../../context/salesReport/context";
import AnchorArrow from "../../../utils/icons/settingsIcon/anchorArrow/anchorArrow";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";
import WithdrawalModal from "./withdrawalModal";

export default function SalesReport() {
  const {
    getSalesReport,
    report,
    loading,
    getDuePayment,
    gettingPayment,
    duePayment,
  } = useContext(SalesReportContext);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    getSalesReport(page || "1");
    getDuePayment();
  }, []);

  const isFeedback = Object.keys(report).length > 0;
  const containsReport = isFeedback && report.report.length > 0;

  const next = () => {
    navigate(`?page=${parseInt(page || "1") + 1}`);
    getSalesReport(parseInt(page | "1") + 1);
  };

  const prev = () => {
    if (page) {
      navigate(`?page=${parseInt(page) - 1}`);
      getSalesReport(parseInt(page) - 1);
    }
  };

  const [withdrawModal, setWithdrawModal] = useState(false);
  const toggleWithdrawalModal = () => {
    setWithdrawModal(!withdrawModal);
  };

  return (
    <div className={classes.container}>
      {withdrawModal && <WithdrawalModal func={toggleWithdrawalModal} />}
      <div className={classes.sub_container}>
        <Back show_arrow={true} title={"Sales report"} route={"/dashboard"} />
        <p className={classes.instruction}>
          For new users, you might not see your sales report till after 3
          months.
        </p>
        {/* report */}
        {loading ? (
          <div className={classes.loader_container}>
            <div className={classes.loader_sub_container}>
              <LoaderBall />

              {/* <p className={classes.loading_text}>Loading...</p> */}
            </div>
          </div>
        ) : (
          <>
            {isFeedback && (
              <div>
                <div className={classes.page_top_container}>
                  <div className={classes.page_title_grouped}>
                    <p className={classes.page_title}>
                      Amount Eligible for withdrawal:
                      <span className={classes.emphasis}>
                        {" "}
                        {gettingPayment ? "Loading..." : `$ ${duePayment}`}
                      </span>
                    </p>

                    <div className={classes.top_action_btn_grouped}>
                      <p
                        className={
                          gettingPayment
                            ? classes.top_action_btn_bland
                            : classes.top_action_btn
                        }
                        onClick={toggleWithdrawalModal}
                      >
                        Process withdrawal
                      </p>
                      <p className={classes.top_action_btn}>
                        Withdrawal History
                      </p>
                    </div>
                  </div>
                  <div className={classes.page_title_grouped}>
                    <p className={classes.page_title}>
                      Page:{" "}
                      <span className={classes.emphasis}>{report.page}</span>
                    </p>
                    <p className={classes.page_title}>
                      Report result:{" "}
                      <span className={classes.emphasis}>
                        {`${report.skip} - ${
                          report.totalCount > report.limit
                            ? report.skip + report.limit
                            : report.totalCount
                        } out of ${report.totalCount}`}
                      </span>
                    </p>
                  </div>
                </div>

                {/* reports */}

                <div className={classes.table_title}>
                  <p className={classes.sale_month_tag}>Sales month</p>
                  <p className={classes.sale_month_tag}>Artiste name</p>
                  {/* <p className={classes.sale_month_tag}>Received month</p> */}
                  <p className={classes.upc_month_tag}>UPC</p>
                  <p className={classes.upc_month_tag}>ISRC</p>
                  {/* <p>Artiste</p> */}
                  <p className={classes.track_title_tag}>Track</p>
                  <p className={classes.qty_tag}>Qty</p>
                  <p className={classes.total_usd_tag}>Total USD</p>
                  <p className={classes.digital_service_provider_tag}>
                    Digital service provider
                  </p>
                  <p>Territory</p>
                </div>

                <div className={classes.table_grouped}>
                  {containsReport ? (
                    report.report.map((item, index) => (
                      <div key={index} className={classes.tag_grouped}>
                        {/* sales month */}
                        <p className={classes.sale_month_tag}>
                          {new Date(item.sale_month).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>

                        <p className={classes.sale_month_tag}>
                          {item.track_artists}
                        </p>
                        <p className={classes.upc_month_tag}>{item.upc}</p>
                        <p className={classes.upc_month_tag}>{item.isrc}</p>
                        <p className={classes.track_title_tag}>
                          {item.track_title}
                        </p>
                        <p className={classes.qty_tag}>{item.quantity}</p>
                        <p className={classes.total_usd_tag}>
                          ${item.total_usd}
                        </p>
                        <p className={classes.digital_service_provider_tag}>
                          {item.digital_service_provider}
                        </p>
                        <p>{item.territory}</p>
                      </div>
                    ))
                  ) : (
                    <div className={classes.nothing_container}>
                      <p className={classes.nothing_text}>no result</p>
                      {report.page > 1 && (
                        <p onClick={prev} className={classes.nothing_btn}>
                          Go to previous page
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {containsReport && (
                  <div className={classes.pagination_container}>
                    {report.page > 1 && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
