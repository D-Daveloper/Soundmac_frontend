import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AudioConverterState from "./context/audioConverter/audioConverterState";
import AlertState from "./context/alertAndPopUp/alertAndPopUpState";
import UserState from "./context/user/userState";
import OtpModalState from "./context/otpModal/otpModalState";
import SalesReportState from "./context/salesReport/state";
import './style.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AlertState>
      <OtpModalState>
        <UserState>
          <SalesReportState>
            <AudioConverterState>
              <App />
            </AudioConverterState>
          </SalesReportState>
        </UserState>
      </OtpModalState>
    </AlertState>
  </BrowserRouter>
);
