import { useContext, useState } from "react";
import classes from "./addFirstArtiste.module.css";
import Dropzone from "react-dropzone";
import UserContext from "../../../context/user/userContext";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";
import Back from "../../../utils/backBtn/backBtn";

function AddFirstArtiste() {
  const [imageInputPlaceHolder, setImageInputPlaceHolder] = useState(
    `Click to select artiste image`
  );

  const {
    user,
    artisteVal,
    enter_artiste_val,
    selectImage,
    addArtiste,
    loadingProgress,
    adding_artiste,
  } = useContext(UserContext);

  const { alert } = useContext(AlertContext);

  const { type } = user;

  const { label, artiste_name, artiste_image } = artisteVal;

  const add_artiste = () => {
    if (artiste_name === "") {
      alert(`artiste name can't be blank!`);
    } else if (
      (type === "MINI_LABEL" || type === "BIG_LABEL") &&
      label === ""
    ) {
      alert(`label name can't be blank!`);
    } else if (artiste_image.length <= 0) {
      alert(`select an image`);
    } else {
      const formData = new FormData();
      Object.entries(artisteVal).forEach(([key, value]) =>
        formData.append(key, value)
      );

      addArtiste(formData);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <Back
          show_arrow={user.artiste ? true : false}
          title={"Add artiste"}
          route={"/dashboard"}
        />
        <p className={classes.instruction}>
          Do note that artiste & label names are case sensitive as you type them
          so they would appear.
        </p>
        <div className={classes.select_containers}>
          {(type === "MINI_LABEL" || type === "BIG_LABEL") && !label && (
            <div className={classes.select_container}>
              <input
                className={classes.input}
                type="text"
                placeholder={"Label name"}
                onChange={enter_artiste_val}
                value={label}
                name={"label"}
              />
            </div>
          )}

          <div className={classes.select_container}>
            <input
              className={classes.input}
              type="text"
              placeholder={"Artiste name"}
              onChange={enter_artiste_val}
              value={artiste_name}
              name={"artiste_name"}
            />
          </div>

          <div className={classes.select_container}>
            <Dropzone
              onDrop={(acceptedFiles) => {
                setImageInputPlaceHolder(acceptedFiles[0].name);
                selectImage(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className={classes.account_name}>
                      {imageInputPlaceHolder.length > 32
                        ? imageInputPlaceHolder.substring(0, 32) + "..."
                        : imageInputPlaceHolder}
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        {adding_artiste ? (
          <div className={classes.loader_con}>
            <div className={classes.loader}>
              <LoaderBall />
            </div>
            <p className={classes.loadingProgress}>
              {loadingProgress && `${loadingProgress}%`}
            </p>
          </div>
        ) : (
          <p onClick={add_artiste} className={classes.add_artiste}>
            Add artiste
          </p>
        )}
      </div>
    </div>
  );
}

export default AddFirstArtiste;
