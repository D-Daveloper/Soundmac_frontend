/* eslint-disable react-hooks/exhaustive-deps */
import Dropzone from "react-dropzone";
import Back from "../../../utils/backBtn/backBtn";
import { useContext, useState } from "react";
import UserContext from "../../../context/user/userContext";
import { languagesList } from "../../../utils/list/languageList";
import { genreList } from "../../../utils/list/genreList";
import { useSearchParams } from "react-router-dom";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";
import classes from "./tracks.module.css";
import DeleteIcon from "../../../utils/icons/deleteIcon";
import AudioConverterContext from "../../../context/audioConverter/audioConverterContext";

function AddTracks() {
  const {
    addTracks,
    loadingProgress,
    middleItem,
    user,
    uploading_song,
    deleteTrack,
    submitAlbum,
    submitting,
    tracksUploadValues,
    setTracksUploadValues,
    emptyVal,
  } = useContext(UserContext);

  const { alert } = useContext(AlertContext);

  const { handleConversion } = useContext(AudioConverterContext);

  const [searchParams] = useSearchParams();

  const active_artiste = searchParams.get("artiste_name");
  const active_album = searchParams.get("album_title");

  const un_assigned_numbers = [];
  const uploadedTracks = [];

  if (
    user !== "" &&
    user.artiste &&
    user.artiste[active_artiste].albums &&
    user.artiste[active_artiste].albums[active_album]
  ) {
    if (user.artiste[active_artiste].albums[active_album].un_assigned_numbers) {
      un_assigned_numbers.push(
        user.artiste[active_artiste].albums[active_album].un_assigned_numbers
      );
    }

    if (
      user.artiste[active_artiste].albums[active_album].tracks &&
      Object.keys(user.artiste[active_artiste].albums[active_album].tracks)
        .length > 0
    ) {
      const album_tracks =
        user.artiste[active_artiste].albums[active_album].tracks;
      for (const key in album_tracks) {
        const obj = album_tracks[key];

        uploadedTracks.push(obj);
      }
    }
  }

  const [showOptions, setShowOptions] = useState({
    language: false,
    genre: false,
    track_number: false,
  });

  const toggleOption = (name) => {
    setShowOptions((prev) => ({
      ...prev,
      [name]: !showOptions[name],
    }));
  };

  // select options
  const selectOptions = (name, val) => {
    setTracksUploadValues((prev) => ({
      ...prev,
      [name]: val,
    }));

    toggleOption(name);
  };

  // select explicit
  const selectExplicit = (val) => {
    setTracksUploadValues((prev) => ({
      ...prev,
      explicit: val,
    }));
  };

  // enter input values
  const enterInputValues = (e) => {
    setTracksUploadValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const add = async () => {
    if (tracksUploadValues.image === "") {
      alert(`select a cover image!`);
    } else if (tracksUploadValues.audio === "") {
      alert(`select an audio file!`);
    } else if (tracksUploadValues.song_title === "") {
      alert(`song title can't be blank!`);
    } else if (tracksUploadValues.language === "Language") {
      alert(`select a language!`);
    } else if (tracksUploadValues.genre === "") {
      alert(`select a genre!`);
    } else if (tracksUploadValues.explicit === "Genre") {
      alert(`select explicit!`);
    } else if (tracksUploadValues.performed_by === "") {
      alert(`performed by can't be blank!`);
    } else if (tracksUploadValues.produced_by === "") {
      alert(`produced by can't be blank!`);
    } else if (tracksUploadValues.written_by === "") {
      alert(`written by can't be blank!`);
    } else if (tracksUploadValues.release_date === "") {
      alert(`release date can't be blank!`);
    } else if (tracksUploadValues.track_number === "Assign track number") {
      alert(`assign a track number`);
    } else {
      const formData = new FormData();
      Object.entries(tracksUploadValues).forEach(([key, value]) =>
        formData.append(key, value)
      );
      await addTracks(formData, tracksUploadValues);
      setTracksUploadValues(emptyVal);
    }
  };

  return (
    <div className={classes.container}>
      <Back
        show_arrow={true}
        title={`Add a track to "${active_album}" album for ${active_artiste}`}
        route={`/dashboard?artiste_name=${middleItem.artiste_name}`}
      />

      <div className={classes.sub_container}>
        <div className={classes.file_section}>
          {/* audio */}
          <div className={classes.audio_box}>
            <div className={classes.image_instructions_con}>
              {tracksUploadValues.audio !== "" ? (
                <p className={classes.audio_instructions}>
                  {tracksUploadValues.audio.name.length > 18
                    ? tracksUploadValues.audio.name.substring(0, 16) + "..."
                    : tracksUploadValues.audio.name}
                </p>
              ) : (
                <p className={classes.audio_instructions}>
                  Accepted files: PNG, JPG <br />
                  Max size: 10 MB
                </p>
              )}
              <div className={classes.select_image_container}>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    handleConversion(acceptedFiles, ".wav", "tracks");
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
          <div className={classes.middle_section}>
            {/* song title */}
            <div className={classes.input_container}>
              <input
                className={classes.input_text}
                placeholder="Track title"
                type="text"
                name="track_title"
                value={tracksUploadValues.track_title}
                onChange={enterInputValues}
              />
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
                      tracksUploadValues.language !== "Language"
                        ? { color: "#4169e1" }
                        : {}
                    }
                  >
                    {tracksUploadValues.language}
                  </p>
                </div>
                <div className={classes.options_container}>
                  {showOptions.language &&
                    languagesList.map((item, index) => (
                      <div
                        key={index}
                        className={classes.options_sub_container}
                      >
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
                    tracksUploadValues.genre !== "Genre"
                      ? { color: "#4169e1" }
                      : {}
                  }
                  className={classes.selected_option}
                >
                  {tracksUploadValues.genre.length > 15
                    ? tracksUploadValues.genre.substring(0, 13) + "..."
                    : tracksUploadValues.genre}
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
                  {tracksUploadValues.explicit === "yes" && (
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
                  {tracksUploadValues.explicit === "no" && (
                    <div className={classes.checked}></div>
                  )}
                </div>
                <p className={classes.radio_text} name="explicit">
                  No
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className={classes.other_credits_section}>
          <p className={classes.question}>
            Leave these fields empty if you want us to assign one.
          </p>

          {/* Isrc & upc */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="ISRC"
              type="text"
              name="ISRC"
              value={tracksUploadValues.ISRC}
              onChange={enterInputValues}
            />
          </div>

          {/* assign track number */}
          <div>
            <div className={classes.options_container}>
              {showOptions.track_number &&
                un_assigned_numbers[0].map((item, index) => (
                  <div key={index} className={classes.options_sub_container}>
                    <p
                      onClick={() => selectOptions("track_number", item)}
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
              onClick={() => toggleOption("track_number")}
            >
              <p
                className={classes.selected_option}
                style={
                  tracksUploadValues.track_number !== "Assign track number"
                    ? { color: "#4169e1" }
                    : {}
                }
              >
                {tracksUploadValues.track_number}
              </p>
            </div>
          </div>

          {/* other artistes */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Other artistes"
              type="text"
              name="other_artistes"
              value={tracksUploadValues.other_artistes}
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
              value={tracksUploadValues.featured_artistes}
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
              value={tracksUploadValues.performed_by}
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
              value={tracksUploadValues.produced_by}
              onChange={enterInputValues}
            />
          </div>

          {/* Written by */}
          <div className={classes.input_container}>
            <input
              className={classes.input_text}
              placeholder="Written by"
              name="written_by"
              value={tracksUploadValues.written_by}
              onChange={enterInputValues}
            />
          </div>
        </div>
        {/* lyrics */}
        <div className={classes.lyrics_section}>
          <textarea
            placeholder="Lyrics (kindly add the '%' symbol to go to the next line)"
            className={classes.text_area_container}
            name="lyrics"
            value={tracksUploadValues.lyrics}
            onChange={enterInputValues}
          />

          <div
            onClick={() => {
              !uploading_song && add();
            }}
            className={classes.add_track_btn}
          >
            {uploading_song ? (
              <>
                <LoaderBall />
                <p className={classes.loadingProgress}>
                  {loadingProgress && `${loadingProgress}%`}
                </p>
              </>
            ) : (
              <p className={classes.action_button}> Add track</p>
            )}
          </div>
        </div>
        {/* vertical line */}
        <div className={classes.vertical_line}></div>
        <div className={classes.track_list_container}>
          <div className={classes.track_list_sub_container}>
            <p className={classes.track_list_text}>Track List</p>
            <div className={classes.track_list_horizontal_line}></div>

            <div className={classes.track_container}>
              {uploadedTracks.length > 0 &&
                uploadedTracks
                  .sort((a, b) => a.track_number.localeCompare(b.track_number))
                  .map((item, index) => (
                    <div className={classes.track_a_container} key={index}>
                      <div>
                        <p className={classes.track_list_number}>
                          Track {item.track_number}
                        </p>
                        <p className={classes.track_list_title}>
                          {item.track_title}
                        </p>
                      </div>
                      {/* delete icon */}
                      <div
                        onClick={() =>
                          deleteTrack({
                            artiste_name: active_artiste,
                            album_title: active_album,
                            track_title: item.track_title,
                          })
                        }
                        className={classes.delete_container}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div
            onClick={() =>
              !submitting &&
              submitAlbum({
                artiste_name: active_artiste,
                album_title: active_album,
              })
            }
            className={classes.upload_btn}
          >
            {submitting ? (
              <LoaderBall />
            ) : (
              <p className={classes.action_button}> Submit album</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTracks;
