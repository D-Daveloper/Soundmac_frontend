import { useContext, useState } from "react";
import classes from "./tutorials.module.css";
import "animate.css";
import UserContext from "../../context/user/userContext";

function Tutorials() {
  const { setIsFirstTimer } = useContext(UserContext);

  const [tutorialShown, setTutorialShown] = useState("one");

  return (
    <div className={classes.container}>
      {tutorialShown === "two" ? (
        //  tutorial two
        <div className="animate__animated animate__fadeInUp">
          <svg
            width="255"
            height="116"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 255 116"
            fill="none"
            className={classes.second_tutorial_container}
          >
            <g filter="url(#filter0_d_36_1901)">
              <path
                d="M250.5 14.4043C250.5 11.6428 248.261 9.40425 245.5 9.40425H241.393C239.732 9.40425 238.182 8.56734 237.27 7.17794C235.532 4.52805 231.781 4.18243 229.588 6.47005L228.251 7.86459C227.308 8.84815 226.004 9.40425 224.642 9.40425H9C6.23857 9.40425 4 11.6428 4 14.4043V106.5C4 109.261 6.23857 111.5 9 111.5H245.5C248.261 111.5 250.5 109.261 250.5 106.5V14.4043Z"
                fill="#0D72EA"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_36_1901"
                x="0"
                y="0.951416"
                width="254.5"
                height="114.549"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_36_1901"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_36_1901"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <div className={classes.second_instruction_con}>
            <p className={classes.title}>Upload a song</p>
            <p className={classes.instruction}>
              Click this button to get started with uploading a song
            </p>
            <div className={classes.next_btn_container}>
              <p
                onClick={() => setTutorialShown("three")}
                className={classes.next_btn}
              >
                next
              </p>
            </div>
          </div>
        </div>
      ) : tutorialShown === "three" ? (
        //  tutorial three
        <div className="animate__animated animate__fadeInUp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="255"
            height="146"
            viewBox="0 0 255 146"
            fill="none"
            className={classes.third_tutorial_container}
          >
            <g filter="url(#filter0_d_36_2096)">
              <path
                d="M4 14.4043C4 11.6428 6.23858 9.40425 9 9.40425H13.1066C14.7683 9.40425 16.3182 8.56734 17.2297 7.17794C18.968 4.52805 22.7188 4.18243 24.9121 6.47005L26.2491 7.86459C27.1921 8.84815 28.4957 9.40425 29.8583 9.40425H245.5C248.261 9.40425 250.5 11.6428 250.5 14.4043V137C250.5 139.761 248.261 142 245.5 142H9.00001C6.23858 142 4 139.761 4 137L4 14.4043Z"
                fill="#0D72EA"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_36_2096"
                x="0"
                y="0.951416"
                width="254.5"
                height="145.049"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_36_2096"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_36_2096"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <div className={classes.third_instruction_con}>
            <p className={classes.title}>Select an artiste</p>
            <p className={classes.instruction}>
              Click any artiste name to display their projects in the main pane.
              Mini Labels and Labels are the only permitted accounts to add more
              than one artiste
            </p>
            <div className={classes.next_btn_container}>
              <p
                onClick={() => {
                  localStorage.setItem(
                    "show_soundmac_dashboard_tutorial",
                    "false"
                  );
                  setIsFirstTimer("false");
                }}
                className={classes.next_btn}
              >
                got it
              </p>
            </div>
          </div>
        </div>
      ) : (
        //  tutorial one
        <div className="animate__animated animate__fadeInUp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="255"
            height="116"
            viewBox="0 0 255 116"
            fill="none"
            className={classes.first_tutorial_container}
          >
            <g filter="url(#filter0_d_36_1901)">
              <path
                d="M250.5 14.4043C250.5 11.6428 248.261 9.40425 245.5 9.40425H241.393C239.732 9.40425 238.182 8.56734 237.27 7.17794C235.532 4.52805 231.781 4.18243 229.588 6.47005L228.251 7.86459C227.308 8.84815 226.004 9.40425 224.642 9.40425H9C6.23857 9.40425 4 11.6428 4 14.4043V106.5C4 109.261 6.23857 111.5 9 111.5H245.5C248.261 111.5 250.5 109.261 250.5 106.5V14.4043Z"
                fill="#0D72EA"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_36_1901"
                x="0"
                y="0.951416"
                width="254.5"
                height="114.549"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_36_1901"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_36_1901"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <div className={classes.first_instruction_con}>
            <p className={classes.title}>See all albums</p>
            <p className={classes.instruction}>
              Click this button to show all albums which you uploaded
            </p>
            <div className={classes.next_btn_container}>
              <p
                onClick={() => setTutorialShown("two")}
                className={classes.next_btn}
              >
                next
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tutorials;
