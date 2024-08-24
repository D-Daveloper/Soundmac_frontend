/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./utils/header/header";
import Home from "./pages/home/home";
import classes from "./app.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Footer from "./utils/footer/footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Pricing from "./pages/pricing/pricing";
import Login from "./auth/login";
import Register from "./auth/register";
import AudioConverter from "./pages/audioConverter/audioConverter";
import Error from "./utils/alert/alert";
import { useContext, useEffect } from "react";
import AlertContext from "./context/alertAndPopUp/alertAndPopUpContext";
import PopUp from "./utils/popup/popUp";
import OtpModal from "./utils/otpModal/otpModal";
import OtpModalContext from "./context/otpModal/otpModalContext";
import DashboardHeader from "./utils/dashboardHeader/dashboardHeader";
import SelectAccountType from "./pages/dashboard/selectAccountType/selectAccountType";
import AddFirstArtiste from "./pages/dashboard/addFirstArtiste/addFirstArtiste";
import EnterEmail from "./utils/enterEmail/enterEmail";
import UserContext from "./context/user/userContext";
import DashboardHome from "./pages/dashboard/home/home";
import UploadSong from "./pages/dashboard/uploadSong/uploadSong";
import UploadAlbum from "./pages/dashboard/uploadAlbum/uploadAlbum";
import AddTracks from "./pages/dashboard/uploadAlbum/addTracks";
import Settings from "./pages/dashboard/settings/settings";
import ChangePassword from "./pages/dashboard/settings/changePassword";
import UpdateAccountInfo from "./pages/dashboard/settings/updateAccountInfo";
import ShareModal from "./utils/share/share";
import Accessibility from "./pages/dashboard/settings/accessibility";
import Legal from "./pages/dashboard/settings/legal";
import FAQ from "./pages/FAQ/faq";
import ResetPassword from "./auth/resetPassword";
import SuperAdmin from "./pages/superAdmin/superAdmin";
import SalesReport from "./pages/dashboard/salesReport/salesReport";
import Withdrawal from "./pages/dashboard/withdrawal/withdrawal";
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

// ..
AOS.init();

function App() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { alertMsg, popUpMsg } = useContext(AlertContext);
  const { otpModal } = useContext(OtpModalContext);
  const { enterEmailModal, shareMsg, isFirstTimer } = useContext(UserContext);

  // destructure array
  const { title, msg } = popUpMsg;

  const show_soundmac_dashboard_tutorial = localStorage.getItem(
    `show_soundmac_dashboard_tutorial`
  );
  // set preferences
  useEffect(() => {
    show_soundmac_dashboard_tutorial === null &&
      localStorage.setItem("show_soundmac_dashboard_tutorial", true);
  }, [isFirstTimer]);

  // route to login
  useEffect(() => {
    alertMsg === "Authentication invalid" && navigate("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertMsg]);

  return (
    <div>
      {alertMsg !== "" && <Error />}
      {title !== "" && msg !== "" && <PopUp />}
      {otpModal === true && <OtpModal />}

      {enterEmailModal && <EnterEmail />}

      <ShareModal message={shareMsg} />

      <Routes>
        {/* home */}
        <Route
          path="/"
          element={
            <div className={classes.container}>
              <Header />
              <Home />
              <Footer />
            </div>
          }
        />

        {/* pricing */}
        <Route
          path="/pricing"
          element={
            <div className={classes.container}>
              <Header />
              <Pricing />
              <Footer />
            </div>
          }
        />
        <Route
          path="/blog"
          element={
            <div>
              <HeaderComponent />
              <HomePage />
              <FooterComponent />
            </div>
          }
        />
        <Route
          path="/post/:id"
          element={
            <div >
              <HeaderComponent />
              <BlogPost />
              <FooterComponent />
            </div>
          }
        />

        {/* login */}
        <Route
          path="/auth/login"
          element={
            <div className={classes.container}>
              <Header />
              <Login />
            </div>
          }
        />

        {/* forgot */}
        <Route
          path="/forgot_password"
          element={
            <div className={classes.container}>
              <Header />
              <ResetPassword />
            </div>
          }
        />

        {/* register */}
        <Route
          path="/auth/register"
          element={
            <div className={classes.container}>
              <Header />
              <Register />
            </div>
          }
        />

        {/* audio converter */}
        <Route
          path="/audio_converter"
          element={
            <div className={classes.container}>
              <Header />
              <AudioConverter />
              <Footer />
            </div>
          }
        />

        {/* FAQ & Support */}
        <Route
          path="/faq_and_support"
          element={
            <div className={classes.container}>
              <Header />
              <FAQ />
              <Footer />
            </div>
          }
        />

        {/*select account type */}
        <Route
          path="/select_account_type"
          element={
            <div>
              <DashboardHeader />
              <SelectAccountType />
            </div>
          }
        />

        {/*Add first artiste*/}
        <Route
          path="/add_artiste"
          element={
            <div>
              <DashboardHeader />
              <AddFirstArtiste />
            </div>
          }
        />

        {/* settings */}
        <Route
          path="/dashboard/settings"
          element={
            <div>
              <DashboardHeader />
              <Settings />
            </div>
          }
        />

        {/* change password */}
        <Route
          path="/settings/change_password"
          element={
            <div>
              <DashboardHeader />
              <ChangePassword />
            </div>
          }
        />

        {/* update account info */}
        <Route
          path="/settings/update_account_info"
          element={
            <div>
              <DashboardHeader />
              <UpdateAccountInfo />
            </div>
          }
        />

        {/* accessibility */}
        <Route
          path="/settings/accessibility"
          element={
            <div>
              <DashboardHeader />
              <Accessibility />
            </div>
          }
        />

        {/* legal */}
        <Route
          path="/legal"
          element={
            <div className={classes.container}>
              <Header />
              <Legal />
            </div>
          }
        />

        {/* Dashboard home */}
        <Route
          path="/dashboard"
          element={
            <div>
              <DashboardHeader />
              <DashboardHome />
            </div>
          }
        />

        {/* upload song */}
        <Route
          path="/upload/song"
          element={
            <div>
              <DashboardHeader />
              <UploadSong />
            </div>
          }
        />

        {/* upload album */}
        <Route
          path="/upload/album"
          element={
            <div>
              <DashboardHeader />
              <UploadAlbum />
            </div>
          }
        />

        {/* add tracks */}
        <Route
          path="/upload/add_tracks"
          element={
            <div>
              <DashboardHeader />
              <AddTracks />
            </div>
          }
        />

        {/* add tracks */}
        <Route
          path="/super_admin"
          element={
            <div>
              <DashboardHeader />
              <SuperAdmin />
            </div>
          }
        />

        {/* sales report */}
        <Route
          path="/sales-report"
          element={
            <div>
              <DashboardHeader />
              {user && user.role !== "admin" && user.role !== "super_admin" ? (
                <SalesReport />
              ) : (
                <Withdrawal />
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
