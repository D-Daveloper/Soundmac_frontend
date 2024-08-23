/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import classes from "./settings.module.css";
import { useNavigate } from "react-router-dom";
// import ShareModal from "../all/share";
import UserContext from "../../../context/user/userContext";
import Back from "../../../utils/backBtn/backBtn";

import UpdateIcon from "../../../utils/icons/settingsIcon/icons/updateIcon";
import AnchorArrow from "../../../utils/icons//settingsIcon/anchorArrow/anchorArrow";
import UpgradeIcon from "../../../utils/icons/settingsIcon/icons/upgradeIcon";
import PasswordIcon from "../../../utils/icons/settingsIcon/icons/passwordIcon";
import TermsIcon from "../../../utils/icons/settingsIcon/icons/Termsicon";
import ShareIcon from "../../../utils/icons/settingsIcon/icons/shareIcon";
import LogOutIcon from "../../../utils/icons/settingsIcon/icons/logOutIcon";
import DeleteIcon from "../../../utils/icons/settingsIcon/icons/deleteIcon";
import AdminIcon from "../../../utils/icons/settingsIcon/icons/adminIcon";
import Accessibility from "../../../utils/icons/settingsIcon/icons/accessibility";

export default function Settings() {
  const { user, toggleShareModal } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    user === "" && navigate("/auth/login");
  }, [user]);

  return (
    <div className={classes.container}>
      <div
        onClick={() => navigate("/dashboard")}
        className={classes.back_container}
      >
        <Back show_arrow={true} title={"Settings"} />
      </div>

      <div className={classes.sub_container}>
        <div className={classes.user_account_group}>
          {user !== "" && (
            <div className={classes.user_container}>
              <p
                className={classes.name}
              >{`${user.first_name} ${user.last_name}`}</p>

              {user.type && user.premiumExpiration ? (
                <p className={classes.type}>{`${
                  user.type
                } subscription ~(expires ${user.premiumExpiration.substring(
                  0,
                  10
                )} at ${user.premiumExpiration.substring(11, 16)})`}</p>
              ) : (
                <p className={classes.type}>
                  Subscription unavailable / expired!
                </p>
              )}
            </div>
          )}
          <p className={classes.heading}>Account & Security</p>

          <div
            onClick={() => navigate("/settings/update_account_info")}
            className={classes.nav_container}
          >
            <UpdateIcon />
            <p className={classes.nav_text}>Update account information</p>
            <AnchorArrow />
          </div>

          <div
            onClick={() => navigate("/settings/change_password")}
            className={classes.nav_container}
          >
            <PasswordIcon />
            <p className={classes.nav_text}>Change password</p>
            <AnchorArrow />
          </div>

          <div
            onClick={() => navigate("/select_account_type")}
            className={classes.nav_container}
          >
            <UpgradeIcon />
            <p className={classes.nav_text}>Subscription</p>
            <AnchorArrow />
          </div>
        </div>

        <div className={classes.second_section_container}>
          <p className={classes.heading}>General</p>

          <div
            onClick={() => navigate("/settings/accessibility")}
            className={classes.nav_container}
          >
            <Accessibility />
            <p className={classes.nav_text}>Accessibility</p>
            <AnchorArrow />
          </div>

          <div
            onClick={() => navigate("/legal")}
            className={classes.nav_container}
          >
            <TermsIcon />
            <p className={classes.nav_text}>Legal</p>
            <AnchorArrow />
          </div>

          <div
            onClick={() =>
              toggleShareModal(
                `With SoundMac, you can easily upload and manage your music, as well as access our network of over 150 music streaming services and online stores. Whether you're a seasoned musician or a newcomer, we've got you covered.
                Log on to: www.soundmac.co to get started`
              )
            }
            className={classes.nav_container}
          >
            <ShareIcon />
            <p className={classes.nav_text}>Share & invite</p>
          </div>

          {/* admin */}
          {user.role === "super_admin" && (
            <div
              onClick={() => navigate("/super_admin")}
              style={{ backgroundColor: "#dc9d00" }}
              className={classes.nav_container}
            >
              <AdminIcon />
              <p style={{ color: "#fff" }} className={classes.nav_text}>
                Admin
              </p>
            </div>
          )}

          {/* log out */}
          <div
            style={{ backgroundColor: "#FF4500" }}
            onClick={() => {
              localStorage.removeItem("soundmac3_token");
              navigate("/auth/login");
            }}
            className={classes.nav_container}
          >
            <LogOutIcon />
            <p style={{ color: "#fff" }} className={classes.nav_text}>
              Log out
            </p>
          </div>

          {/* delete account */}
          <div
            style={{ backgroundColor: "#000" }}
            className={classes.nav_container}
          >
            <DeleteIcon />
            <p style={{ color: "#fff" }} className={classes.nav_text}>
              Delete my account
            </p>
          </div>
        </div>
      </div>

      {/* share modal */}
      {/* {isShareModalVisible && (
        <ShareModal
          message={`I just got a booking code from getcodes.ng. \n \nYou can download the app from: \nGoogle playstore: ${play_store_link} \nApp store: ${app_store_link}\n\n#getcodes`}
        />
      )} */}
    </div>
  );
}
