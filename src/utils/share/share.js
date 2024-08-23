import { useContext } from "react";
import classes from "./share.module.css";
import UserContext from "../../context/user/userContext";
import WhatsappIcon from "../icons/whatsappIcon/whatsappIcon";
import TwitterIcon from "../icons/twitterIcon/twitterIcon";

export default function ShareModal({ message }) {
  const { toggleShareModal, shareModal } = useContext(UserContext);

  return (
    <div
      className={
        shareModal ? classes.seeAllContent : classes.seeAllContent_hidden
      }
    >
      <div className={classes.see_all_modal_container}>
        <p className={classes.select_title}>Share </p>

        <div className={classes.share_platform_external_container_group}>
          <a
            className={classes.share_platform_external_container}
            href={`whatsapp://send?text=${encodeURIComponent(message)}`}
          >
            <div
              className={classes.share_platform_container}
              style={{
                backgroundColor: "green",
              }}
            >
              <WhatsappIcon />
            </div>

            <p className={classes.share_platform_external_text}>Whatsapp</p>
          </a>

          <a
            className={classes.share_platform_external_container}
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(
              message
            )}`}
          >
            <div
              className={classes.share_platform_container}
              style={{
                backgroundColor: "black",
              }}
            >
              <TwitterIcon />
            </div>

            <p className={classes.share_platform_external_text}>X (Twitter)</p>
          </a>
        </div>

        <div
          className={classes.modal_close_container}
          onClick={toggleShareModal}
        >
          <p className={classes.close}>Close</p>
        </div>
      </div>
    </div>
  );
}
