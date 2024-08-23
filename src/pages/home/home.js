import classes from "../home/home.module.css";
import "animate.css";

function Home() {
  return (
    <div className={classes.container}>
      <div className={classes.hero_sector_container}>
        <p className={`animate__animated animate__backInRight ${classes.sou}`}>
          SOU
        </p>

        <p className={`animate__animated animate__backInLeft ${classes.nmac}`}>
          NDMAC
        </p>
        <p
          className={`animate__animated animate__backInDown ${classes.soundmac}`}
        >
          SOUNDMAC
        </p>
        <p className={classes.soundmac_border_only}>SOUNDMAC</p>
        <p className={classes.sub_text}>
          Earn While Global Listeners Enjoy Your Music
        </p>
        <p className={classes.sub_text_2}>
          Distribute your music with one of the fastest-rising music
          distribution companies in the world!
        </p>

        <div className={classes.call_to_action}>
          <p className={classes.call_to_action_text}>Get started with Email</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
          >
            <path
              d="M5.30769 1L9 4.5L5.30769 8M8.48718 4.5H1"
              stroke="white"
              strokeWidth="1.875"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <p className={`animate__animated animate__backInUp ${classes.nmac}`}>
        SOUNDMAC
      </p>

      <img
        src="https://sconchun.sirv.com/lady3.png"
        alt="A beautiful lady with a bright smile"
        className={`animate__animated animate__backInRight ${classes.lady}`}
      />

      <p className={classes.sub_text_3}>
        We distribute music across all streaming platforms like Spotify, Apple,
        Audiomack, YouTube, etc
      </p>

      <div className={classes.distribution_platforms_container}>
        <img
          className={classes.music_platforms_icon}
          src="https://sconchun.sirv.com/music_platform_icons2.png"
          alt="spotify, apple music and youtube logo"
        />
        <p className={classes.plus_twenty}>+100</p>
      </div>

      <div className={classes.metrics_card}>
        <div className={classes.metric_card_sub_container_group}>
          <div className={classes.metric_card_sub_container}>
            <p className={classes.metrics_header}> 3K+ Artistes </p>
            <p className={classes.metrics_text}> distributes with soundmac </p>
          </div>

          {/* thin separation line */}
          <div className={classes.separation_line}></div>

          <div className={classes.metric_card_sub_container}>
            <p className={classes.metrics_header}> 1M+ Projects </p>
            <p className={classes.metrics_text}> distributed with soundmac </p>
          </div>

          {/* thin separation line */}
          <div className={classes.separation_line}></div>

          <div className={classes.metric_card_sub_container}>
            <p className={classes.metrics_header}> 10M+ USD </p>
            <p className={classes.metrics_text}> disbursed monthly </p>
          </div>
        </div>
      </div>

      <div className={classes.sub_container}>
        <p className={classes.heading}>What we offer ? </p>
        <p className={classes.sub_heading}>
          Start for free, Low pricing, Unlimited distribution and worldwide
          audience only on{" "}
          <span className={classes.soundmac_emphasis}>SOUNDMAC</span>
        </p>

        <div className={classes.service_card_container}>
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="1000"
            className={classes.service_card}
          >
            <p className={classes.service_card_heading}>Audio Converter</p>
            <p className={classes.service_card_sub_text}>
              Convert audio files at lightning speed with an offline audio
              converter. We support all popular file types.
            </p>
            <img
              className={classes.service_card_image}
              src="https://sconchun.sirv.com/turntable%201.png"
              alt="turntable"
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="1000"
            className={classes.middle_service_card}
          >
            <p className={classes.service_card_heading}>
              {" "}
              Music & Video Distribution
            </p>
            <p className={classes.service_card_sub_text}>
              Upload your music instantly to hundreds of music platforms digital
              stores and applications.
            </p>
            <img
              className={classes.middle_service_card_image}
              src="https://sconchun.sirv.com/film-distribution%202.png"
              alt="van"
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="1500"
            data-aos-duration="1000"
            className={classes.service_card}
          >
            <p className={classes.service_card_heading}>Music Publishing</p>
            <p className={classes.service_card_sub_text}>
              Get your music heard with easy-to-use promotional tools get your
              tracks to the people that matters the most.
            </p>
            <img
              className={classes.service_card_image}
              src="https://sconchun.sirv.com/video-marketing%201.png"
              alt="ad"
            />
          </div>
        </div>
      </div>

      <div className={classes.sub_container}>
        <p className={classes.heading}>Why choose us? </p>

        <div className={classes.interaction_container}>
          {/* first chat box from your left, counting by rows */}
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="1000"
            className={classes.chat_container_1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="329"
              height="124"
              viewBox="0 0 329 124"
              fill="none"
              className={classes.chat_box}
            >
              <g filter="url(#filter0_d_52_2339)">
                <path
                  d="M325 93.5C325 98.7467 320.747 103 315.5 103H312.467C308.895 103 306 105.895 306 109.467C306 114.291 300.909 117.416 296.607 115.233L276.766 105.165C273.962 103.742 270.861 103 267.716 103H24C12.9543 103 4 94.0457 4 83V20C4 8.95431 12.9543 0 24 0H305C316.046 0 325 8.95431 325 20V93.5Z"
                  fill="#E4F3F4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_52_2339"
                  x="0"
                  y="0"
                  width="329"
                  height="123.942"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                  className={classes.fill_}
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_52_2339"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_52_2339"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <p className={classes.chat_text_1}>
              You can spread your music worldwide for free on SOUNDMAC
            </p>

            <div className={classes.read_receipt_container_1}>
              <p className={classes.time_1}>4:25 PM</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                className={classes.read_receipt}
              >
                <path
                  d="M1 5.625L4.125 8.75L11.625 1.25M8.5 7.5L9.75 8.75L17.25 1.25"
                  stroke="#4EE73C"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* second chat box from your left, counting by rows */}
          <div
            data-aos="fade-down"
            data-aos-delay="1500"
            data-aos-duration="1000"
            className={classes.chat_container_2}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="329"
              height="123"
              viewBox="0 0 329 123"
              fill="none"
              className={classes.chat_box}
            >
              <g filter="url(#filter0_d_63_2351)">
                <path
                  d="M4 95.8843C4 99.8142 7.18579 103 11.1157 103H16.7005C19.551 103 21.3713 106.04 20.0253 108.553C18.4078 111.572 21.3274 115.01 24.5688 113.903L53.9851 103.859C55.6503 103.29 57.3979 103 59.1574 103H305C316.046 103 325 94.0457 325 83V20C325 8.95431 316.046 0 305 0H24C12.9543 0 4 8.95431 4 20V95.8843Z"
                  fill="#E4F3F4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_63_2351"
                  x="0"
                  y="0"
                  width="329"
                  height="122.115"
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
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_63_2351"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_63_2351"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <p className={classes.chat_text_1}>
              You can earn money without spending money
            </p>

            <div className={classes.read_receipt_container_1}>
              <p className={classes.time_1}>4:25 PM</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                className={classes.read_receipt}
              >
                <path
                  d="M1 5.625L4.125 8.75L11.625 1.25M8.5 7.5L9.75 8.75L17.25 1.25"
                  stroke="#4EE73C"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* bottom-left chat box from your left, counting by rows */}
          <div
            data-aos="fade-up"
            data-aos-delay="1500"
            data-aos-duration="1000"
            className={classes.chat_container_3}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="329"
              height="124"
              viewBox="0 0 329 124"
              fill="none"
              className={classes.chat_box}
            >
              <g filter="url(#filter0_d_52_2337)">
                <path
                  d="M4 22.5C4 17.2533 8.25329 13 13.5 13H16.5333C20.1048 13 23 10.1048 23 6.5333C23 1.70925 28.0912 -1.4164 32.3931 0.766631L52.2337 10.835C55.0383 12.2583 58.1391 13 61.2842 13H305C316.046 13 325 21.9543 325 33V96C325 107.046 316.046 116 305 116H24C12.9543 116 4 107.046 4 96V22.5Z"
                  fill="#E4F3F4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_52_2337"
                  x="0"
                  y="0.0581055"
                  width="329"
                  height="123.942"
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
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_52_2337"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_52_2337"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <p className={classes.chat_text_2}>
              You can keep 100% Royalty. You work hard for your music, you
              deserve it all.
            </p>

            <div className={classes.read_receipt_container_1}>
              <p className={classes.time_1}>6:37 PM</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                className={classes.read_receipt}
              >
                <path
                  d="M1 5.625L4.125 8.75L11.625 1.25M8.5 7.5L9.75 8.75L17.25 1.25"
                  stroke="#4EE73C"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 3rd chat box from your left, counting by rows */}
          <div
            data-aos="fade-up"
            data-aos-delay="2000"
            data-aos-duration="1000"
            className={classes.chat_container_4}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="292"
              height="78"
              viewBox="0 0 292 78"
              fill="none"
              className={classes.chat_box_2}
            >
              <g filter="url(#filter0_d_63_2356)">
                <path
                  d="M4 53.19C4 62.4739 11.5261 70 20.81 70H33.6386H50.4486H268C279.046 70 288 61.0457 288 50V20C288 8.95431 279.046 0 268 0H24C12.9543 0 4 8.95431 4 20V53.19Z"
                  fill="#E4F3F4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_63_2356"
                  x="0"
                  y="0"
                  width="292"
                  height="78"
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
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_63_2356"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_63_2356"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <p className={classes.chat_text_3}>
              Your Independence Is Our Policy
            </p>
          </div>

          {/* 4th chat box from your left, counting by rows */}
          <div
            data-aos="fade-down"
            data-aos-delay="1500"
            data-aos-duration="1000"
            className={classes.chat_container_5}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="292"
              height="78"
              viewBox="0 0 292 78"
              fill="none"
              className={classes.chat_box_2}
            >
              <g filter="url(#filter0_d_63_2356)">
                <path
                  d="M4 53.19C4 62.4739 11.5261 70 20.81 70H33.6386H50.4486H268C279.046 70 288 61.0457 288 50V20C288 8.95431 279.046 0 268 0H24C12.9543 0 4 8.95431 4 20V53.19Z"
                  fill="#E4F3F4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_63_2356"
                  x="0"
                  y="0"
                  width="292"
                  height="78"
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
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_63_2356"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_63_2356"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <p className={classes.chat_text_3}>
              Your music is still 100% yours
            </p>
          </div>

          <img
            className={classes.interaction_image}
            src="https://sconchun.sirv.com/man%20looking%20into%20his%20phone.png"
            alt="man looking into his phone"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
