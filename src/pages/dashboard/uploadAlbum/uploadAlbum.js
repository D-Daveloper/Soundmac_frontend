/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import Back from "../../../utils/backBtn/backBtn";
import classes from "./uploadAlbum.module.css";
import UserContext from "../../../context/user/userContext";
import { numberArr } from "../../../utils/list/numbersList";
import Dropzone from "react-dropzone";
import { useSearchParams } from "react-router-dom";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";

export default function UploadAlbum() {
  const { middleItem, user, uploading_song, createDraftAlbum } = useContext(
    UserContext
  );

  const [searchParams] = useSearchParams();
  const active_artiste = searchParams.get("artiste_name");

  const { alert, pop } = useContext(AlertContext);

  const { premium } = user;

  const currentDate = new Date(); // Current date
  const non_premium_release_date = new Date(
    currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
  ); // Add 14 days in milliseconds

  const [values, setValues] = useState({
    artiste_name: active_artiste,
    album_title: "",
    no_of_tracks: "Select the number of tracks",
    image: "",
    release_date: !premium ? non_premium_release_date : "",
    UPC: "",
    action: "upload",
  });

  const {
    artiste_name,
    album_title,
    no_of_tracks,
    image,
    release_date,
  } = values;

  const [dataUrl, setDataUrl] = useState("");

  // enter input values
  const enterInputValues = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const readDataUrl = (val) => {
    const reader = new FileReader();
    reader.readAsDataURL(val);

    reader.onload = () => {
      const url = reader.result;
      setDataUrl(url);
    };
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const selectOption = (val) => {
    setValues((prev) => ({
      ...prev,
      no_of_tracks: val,
    }));
    setIsDropdownVisible(false);
  };

  const createAlbum = () => {
    if (image === "") {
      alert(`image can't be blank!`);
    } else if (artiste_name === "") {
      alert(`artiste name can't be blank!`);
    } else if (album_title === "") {
      alert(`album title can't be blank!`);
    } else if (no_of_tracks === "Select the number of tracks") {
      alert(`no of tracks can't be blank!`);
    } else if (release_date === "") {
      alert(`release date can't be blank!`);
    } else {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
      createDraftAlbum(formData, values);
    }
  };

  return (
    <div className={classes.container}>
      <Back
        show_arrow={true}
        title={`Upload an album for ${active_artiste}`}
        route={`/dashboard?artiste_name=${middleItem.artiste_name}`}
      />

      <div className={classes.sub_container}>
        <div className={classes.file_section}>
          <div className={classes.image_box}>
            <div className={classes.image_container}>
              <img
                src={
                  dataUrl !== ""
                    ? dataUrl
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
                    readDataUrl(acceptedFiles[0]);
                    setValues((prev) => ({
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
        </div>
        {/* all inputs  */}
        <div className={classes.input_group}>
          {/* artiste name */}
          <div className={classes.input_container}>
            <p className={classes.input_text}>{active_artiste}</p>
          </div>

          {/* album title */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Album title"
              type="text"
              name="album_title"
              value={values.album_title}
              onChange={enterInputValues}
            />
          </div>

          {/* copyright holder */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Copyright holder"
              type="text"
              name="copyrightHolder"
              value={values.copyrightHolder}
              onChange={enterInputValues}
            />
          </div>

          {/* copyright year */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Copyright year"
              type="text"
              name="copyrightYear"
              value={values.copyrightYear}
              onChange={enterInputValues}
            />
          </div>

          {/* no of tracks */}
          <div>
            {/* options dropdown */}
            <div className={classes.options_container}>
              {isDropdownVisible &&
                numberArr.map((item, index) => (
                  <div key={index} className={classes.options_sub_container}>
                    <p
                      onClick={() => selectOption(item)}
                      className={classes.option_text}
                    >
                      {item}{" "}
                    </p>
                  </div>
                ))}
            </div>
            <div
              style={{ cursor: "pointer" }}
              className={classes.input_container}
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              <p
                className={classes.selected_option}
                style={
                  values.no_of_tracks !== "Select the number of tracks"
                    ? { color: "#4169e1" }
                    : {}
                }
              >
                {values.no_of_tracks}
              </p>
            </div>
          </div>

          {/* UPC */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="UPC"
              type="text"
              name="UPC"
              value={values.UPC}
              onChange={enterInputValues}
            />
          </div>

          {/* release date */}
          <div className={classes.last_input_container}>
            <input
              className={classes.input_text}
              placeholder="release date"
              type="date"
              name="release_date"
              value={values.release_date}
              onChange={
                !premium
                  ? () =>
                      pop({
                        title: "upgrade to premium!",
                        msg: `release date are set to 2 weeks from upload date, upgrade to premium if you wish to decide the date.`,
                        actionBtn: "Upgrade",
                        actionBtnFunction: () => {},
                        showActionBtn: true,
                      })
                  : (e) => enterInputValues(e)
              }
            />
          </div>
          <div>
            {uploading_song ? (
              <div className={classes.submit_container}>
                <p className={classes.submit_text}>
                  Creating {values.album_title} album...
                </p>
              </div>
            ) : (
              <div onClick={createAlbum} className={classes.submit_container}>
                <p className={classes.submit_text}>
                  Add Tracks to {values.album_title} album
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
