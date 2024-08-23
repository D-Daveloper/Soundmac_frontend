/* eslint-disable react-hooks/exhaustive-deps */
import Dropzone from "react-dropzone";
import Back from "../../../utils/backBtn/backBtn";
import classes from "./uploadSong.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/userContext";
import { languagesList } from "../../../utils/list/languageList";
import { genreList } from "../../../utils/list/genreList";
import { useNavigate, useSearchParams } from "react-router-dom";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";
import AudioConverterContext from "../../../context/audioConverter/audioConverterContext";

function UploadSong() {
  const {
    user,
    uploadSong,
    uploading_song,
    loadingProgress,
    middleItem,
    uploadValues,
    setUploadValues,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const { alert, pop } = useContext(AlertContext);

  const { handleConversion } = useContext(AudioConverterContext);

  const [searchParams] = useSearchParams();
  const active_artiste = searchParams.get("artiste_name");
  const action = searchParams.get("action");
  const project = searchParams.get("project");

  const { premium } = user;

  const currentDate = new Date(); // Current date
  const non_premium_release_date = new Date(
    currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
  ); // Add 14 days in milliseconds

  const [showOptions, setShowOptions] = useState({
    language: false,
    genre: false,
  });

  const toggleOption = (name) => {
    setShowOptions((prev) => ({
      ...prev,
      [name]: !showOptions[name],
    }));
  };

  useEffect(() => {
    if (user !== "") {
      if (action === "upload") {
        setUploadValues((prev) => ({
          ...prev,
          artiste_name: active_artiste,
          action: action,
        }));
      }

      if (action === "edit") {
        const project_to_edit = user.artiste[active_artiste].songs[project];
        setUploadValues((prev) => ({
          ...prev,
          artiste_name: active_artiste,
          song_title: project,
          audio: "",
          image: "",
          copyrightYear: project_to_edit.copyrightYear,
          copyrightHolder: project_to_edit.copyrightHolder,
          language: project_to_edit.language,
          genre: project_to_edit.genre,
          explicit: project_to_edit.explicit,
          ISRC: project_to_edit.ISRC,
          UPC: project_to_edit.UPC,
          other_artistes: project_to_edit.other_artistes,
          featured_artistes: project_to_edit.featured_artistes,
          produced_by: project_to_edit.produced_by,
          performed_by: project_to_edit.performed_by,
          written_by: project_to_edit.written_by,
          lyrics: project_to_edit.lyrics,
          syncLicensing: project_to_edit.syncLicensing,
          release_date: !premium ? non_premium_release_date : "",
          remove: project_to_edit.remove,
          action: action,
        }));
      }
    }
  }, [user]);

  const [acknowledged, setAcknowledged] = useState(false);

  const [dataUrl, setDataUrl] = useState({
    image: "",
    audio: "",
  });

  const readDataUrl = (name, val) => {
    const reader = new FileReader();
    reader.readAsDataURL(val);

    reader.onload = () => {
      const url = reader.result;
      setDataUrl((prev) => ({
        ...prev,
        [name]: url,
      }));
    };
  };

  // select options
  const selectOptions = (name, val) => {
    setUploadValues((prev) => ({
      ...prev,
      [name]: val,
    }));

    toggleOption(name);
  };

  // select explicit
  const selectExplicit = (val) => {
    setUploadValues((prev) => ({
      ...prev,
      explicit: val,
    }));
  };

  // enter input values
  const enterInputValues = (e) => {
    setUploadValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const upload = async () => {
    if (uploadValues.image === "") {
      alert(`select a cover image!`);
    } else if (
      uploadValues.image.type !== "image/jpeg" &&
      uploadValues.image.type !== "image/png"
    ) {
      alert(`only Png & jpg image are supported!`);
    } else if (uploadValues.image.size > 10485760) {
      alert(`image can't be more than 10mb!`);
    } else if (uploadValues.audio === "") {
      alert(`select an audio file!`);
    } else if (uploadValues.image.type > 10485760) {
      alert(`image can't be more than 10mb!`);
    } else if (uploadValues.song_title === "") {
      alert(`song title can't be blank!`);
    } else if (premium && uploadValues.copyrightHolder === "") {
      alert(`copyright holder can't be blank!`);
    } else if (premium && uploadValues.copyrightYear === "") {
      alert(`copyright year can't be blank!`);
    } else if (uploadValues.language === "Language") {
      alert(`select a language!`);
    } else if (uploadValues.genre === "") {
      alert(`select a genre!`);
    } else if (uploadValues.explicit === "Genre") {
      alert(`select explicit!`);
    } else if (uploadValues.performed_by === "") {
      alert(`performed by can't be blank!`);
    } else if (uploadValues.produced_by === "") {
      alert(`produced by can't be blank!`);
    } else if (uploadValues.written_by === "") {
      alert(`written by can't be blank!`);
    } else if (uploadValues.release_date === "") {
      alert(`release date can't be blank!`);
    } else if (!acknowledged) {
      alert(`tick the acknowledgement checkbox!`);
    } else {
      const formData = new FormData();
      Object.entries(uploadValues).forEach(([key, value]) =>
        formData.append(key, value)
      );
      uploadSong(formData, uploadValues);
    }
  };

  return (
    <div className={classes.container}>
      <Back
        show_arrow={true}
        title={`${action} a song for ${active_artiste}`}
        route={`/dashboard?artiste_name=${middleItem.artiste_name}`}
      />

      <div className={classes.sub_container}>
        <div className={classes.file_section}>
          <div className={classes.image_box}>
            <div className={classes.image_container}>
              <img
                src={
                  dataUrl.image !== ""
                    ? dataUrl.image
                    : "https://sconchun.sirv.com/Untitled-1.png"
                }
                alt="cover art"
                className={classes.image}
              />
            </div>{" "}
            <div className={classes.image_instructions_con}>
              <p className={classes.image_instructions}>
                {" "}
                Accepted files: PNG, JPG <br />
                3,000PX by 3,000PX
                <br />
                Max size: 10 MB
              </p>
              <div className={classes.select_image_container}>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    readDataUrl("image", acceptedFiles[0]);
                    setUploadValues((prev) => ({
                      ...prev,
                      image: acceptedFiles[0],
                    }));
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className={classes.select_image_btn}>
                          Select Image{" "}
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>

          {/* audio */}
          <div className={classes.audio_box}>
            <div className={classes.image_instructions_con}>
              {uploadValues.audio !== "" ? (
                <p className={classes.audio_instructions}>
                  {uploadValues.audio.name.length > 18
                    ? uploadValues.audio.name.substring(0, 16) + "..."
                    : uploadValues.audio.name}
                </p>
              ) : (
                <p className={classes.audio_instructions}>
                  Accepted files: Any audio format <br />
                  Max size: 10 MB
                </p>
              )}
              <div className={classes.select_image_container}>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    handleConversion(acceptedFiles, ".wav", "songs");
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className={classes.select_image_btn}>
                          Select Audio{" "}
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* vertical line */}
        <div className={classes.vertical_line}></div>
        <div className={classes.middle_section}>
          {/* artiste name */}
          <div className={classes.input_container}>
            <p className={classes.input_text}>{active_artiste}</p>
          </div>

          {/* song title */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Song title"
              type="text"
              name="song_title"
              value={uploadValues.song_title}
              onChange={enterInputValues}
            />
          </div>

          {/* copyright holder & year*/}
          <div className={classes.small_group}>
            <div className={classes.small_input_container}>
              <input
                className={classes.input_text}
                placeholder="Copyright holder"
                type="text"
                name="copyrightHolder"
                value={uploadValues.copyrightHolder}
                onChange={
                  !premium
                    ? () =>
                        pop({
                          title: "upgrade to premium!",
                          msg: `copyright holder is set to 'distributed by SOUNDMAC', upgrade to premium if you wish to decide the holder's name.`,
                          actionBtn: "Upgrade",
                          actionBtnFunction: () => {
                            navigate("/select_account_type");
                          },
                          showActionBtn: true,
                        })
                    : (e) => enterInputValues(e)
                }
              />
            </div>
            <div className={classes.second_small_input_container}>
              <input
                className={classes.input_text}
                placeholder="Copyright year"
                type="number"
                name="copyrightYear"
                value={uploadValues.copyrightYear}
                onChange={
                  !premium
                    ? () =>
                        pop({
                          title: "upgrade to premium!",
                          msg: `copyright year is set to the current year of upload date, upgrade to premium if you wish to decide the date.`,
                          actionBtn: "Upgrade",
                          actionBtnFunction: () => {
                            navigate("/select_account_type");
                          },
                          showActionBtn: true,
                        })
                    : (e) => enterInputValues(e)
                }
              />
            </div>
          </div>

          {/* language & genre*/}
          <div className={classes.small_group}>
            {/* language */}
            <>
              <div
                style={{ cursor: "pointer" }}
                className={classes.small_input_container}
                onClick={() => toggleOption("language")}
              >
                <p
                  className={classes.selected_option}
                  style={
                    uploadValues.language !== "Language"
                      ? { color: "#4169e1" }
                      : {}
                  }
                >
                  {uploadValues.language}
                </p>
              </div>
              <div className={classes.options_container}>
                {showOptions.language &&
                  languagesList.map((item, index) => (
                    <div key={index} className={classes.options_sub_container}>
                      <p
                        onClick={() => selectOptions("language", item)}
                        className={classes.option_text}
                      >
                        {item}{" "}
                      </p>
                    </div>
                  ))}
              </div>
            </>

            {/* genre */}
            <div
              onClick={() => toggleOption("genre")}
              className={classes.second_small_input_container}
              style={{ cursor: "pointer" }}
            >
              <p
                style={
                  uploadValues.genre !== "Genre" ? { color: "#4169e1" } : {}
                }
                className={classes.selected_option}
              >
                {uploadValues.genre.length > 15
                  ? uploadValues.genre.substring(0, 13) + "..."
                  : uploadValues.genre}
              </p>
            </div>
            <div className={classes.options_container}>
              {showOptions.genre &&
                genreList.map((item, index) => (
                  <div key={index} className={classes.options_sub_container}>
                    <p
                      onClick={() => selectOptions("genre", item)}
                      className={classes.option_text}
                    >
                      {item}{" "}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <p className={classes.question}>
            Is this song explicit? (contains vulgar or 18+ contents).
          </p>

          {/* explicit */}
          <div className={classes.input_container}>
            <div className={classes.radio_label_group}>
              <div
                onClick={() => selectOptions("explicit", "yes")}
                className={classes.radio_container}
              >
                {uploadValues.explicit === "yes" && (
                  <div className={classes.checked}></div>
                )}
              </div>
              <p className={classes.radio_text} name="explicit">
                Yes
              </p>
            </div>
            <div
              onClick={() => selectExplicit("no")}
              className={classes.radio_label_group}
            >
              <div className={classes.radio_container}>
                {uploadValues.explicit === "no" && (
                  <div className={classes.checked}></div>
                )}
              </div>
              <p className={classes.radio_text} name="explicit">
                No
              </p>
            </div>
          </div>

          <p className={classes.question}>
            Leave these fields empty if you want us to assign one.
          </p>

          {/* Isrc & upc */}
          <div className={classes.small_group}>
            <div className={classes.small_input_container_2}>
              <input
                className={classes.input_text}
                placeholder="UPC"
                type="number"
                name="UPC"
                value={uploadValues.UPC}
                onChange={enterInputValues}
              />
            </div>
            <div className={classes.second_small_input_container_2}>
              <input
                className={classes.input_text}
                placeholder="ISRC"
                type="text"
                name="ISRC"
                value={uploadValues.ISRC}
                onChange={enterInputValues}
              />
            </div>
          </div>
        </div>
        {/* vertical line */}
        <div className={classes.vertical_line}></div>
        <div className={classes.other_credits_section}>
          {/* other artistes */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Other artistes"
              type="text"
              name="other_artistes"
              value={uploadValues.other_artistes}
              onChange={enterInputValues}
            />
          </div>

          {/* featured artistes */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="featured artistes"
              type="text"
              name="featured_artistes"
              value={uploadValues.featured_artistes}
              onChange={enterInputValues}
            />
          </div>

          {/* Performed by */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Performed by"
              type="text"
              name="performed_by"
              value={uploadValues.performed_by}
              onChange={enterInputValues}
            />
          </div>

          {/* Produced by */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Produced by"
              type="text"
              name="produced_by"
              value={uploadValues.produced_by}
              onChange={enterInputValues}
            />
          </div>

          {/* Written by */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Written by (Legal names only)"
              name="written_by"
              value={uploadValues.written_by}
              onChange={enterInputValues}
            />
          </div>

          <p className={classes.question_2}>
            The day the musical composition becomes available for publishing
            public listening.
          </p>

          <div className={classes.last_input_container}>
            <input
              className={classes.input_text}
              placeholder="release date"
              type="date"
              name="release_date"
              value={uploadValues.release_date}
              onChange={
                !premium
                  ? () =>
                      pop({
                        title: "upgrade to premium!",
                        msg: `release date are set to 2 weeks from upload date, upgrade to premium if you wish to decide the date.`,
                        actionBtn: "Upgrade",
                        actionBtnFunction: () => {
                          navigate("/select_account_type");
                        },
                        showActionBtn: true,
                      })
                  : (e) => enterInputValues(e)
              }
            />
          </div>
        </div>
        {/* vertical line */}
        <div className={classes.vertical_line}></div>
        {/* lyrics */}
        <div className={classes.lyrics_section}>
          <textarea
            placeholder="Lyrics (kindly add the '%' symbol to go to the next line)"
            className={classes.text_area_container}
            name="lyrics"
            value={uploadValues.lyrics}
            onChange={enterInputValues}
          />
        </div>
      </div>

      {/* horizontal line */}
      <div className={classes.horizontal_line}></div>

      <div className={classes.conclude_session}>
        <div className={classes.conclude_session_check_group}>
          <input
            type="checkbox"
            onChange={(e) => {
              setAcknowledged(!acknowledged);
            }}
          />
          <p className={classes.conclusion_text}>
            I acknowledge that tracks may be rejected due to incorrect labeling
            or formatting. I own the copyright, am authorized to sell, and won't
            use others' content without consent. I've agreed to the{" "}
            <span className={classes.conclusion_text_emphasis}>
              TERMS OF SERVICE
            </span>
            and{" "}
            <span className={classes.conclusion_text_emphasis}>
              {" "}
              PRIVACY POLICY,
            </span>{" "}
            applicable to this transaction.{" "}
          </p>
        </div>

        <div
          onClick={() => {
            !uploading_song && upload();
          }}
          className={classes.upload_btn}
        >
          {uploading_song ? (
            <>
              <LoaderBall />
              <p className={classes.loadingProgress}>
                {loadingProgress && `${loadingProgress}%`}
              </p>
            </>
          ) : (
            <p className={classes.action_button}> {action} song</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadSong;
