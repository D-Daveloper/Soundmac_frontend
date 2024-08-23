/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import classes from "../addFirstArtiste/addFirstArtiste.module.css";
import UserContext from "../../../context/user/userContext";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";
import Back from "../../../utils/backBtn/backBtn";
import { useNavigate } from "react-router-dom";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";

function UpdateAccountInfo() {
  const { user, updateAccountInfo, updating_account_info } = useContext(
    UserContext
  );
  //
  const { alert } = useContext(AlertContext);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
  });

  // destructure values
  const { first_name, last_name } = values;

  // autoFill
  useEffect(() => {
    if (user) {
      setValues({
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
      });
    } else {
      navigate("/dashboard");
    }
  }, [user]);

  // update account
  const updateAccount = () => {
    if (first_name < 3) {
      alert(`first name can't be less than 3 characters!`);
    } else if (first_name > 32) {
      alert(`first name can't be more than 32 characters!`);
    } else if (last_name < 3) {
      alert(`last name can't be less than 3 characters!`);
    } else if (last_name > 32) {
      alert(`last name can't be more than 32 characters!`);
    } else {
      updateAccountInfo(values);
    }
  };

  // on change input
  const onChangeInput = (e) => {
    setValues(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <Back
          show_arrow={user.artiste ? true : false}
          title={"Update account information"}
          route={"/dashboard/settings"}
        />
        <div className={classes.select_containers}>
          <div className={classes.select_container}>
            <input
              className={classes.input}
              type="text"
              placeholder={"First name"}
              name="first_name"
              value={first_name}
              onChange={onChangeInput}
            />
          </div>

          <div className={classes.select_container}>
            <input
              className={classes.input}
              type="text"
              placeholder={"Last name"}
              name="last_name"
              value={last_name}
              onChange={onChangeInput}
            />
          </div>
        </div>

        {updating_account_info ? (
          <div className={classes.loader_con}>
            <div className={classes.loader}>
              <LoaderBall />
            </div>
          </div>
        ) : (
          <p onClick={updateAccount} className={classes.add_artiste}>
            Update
          </p>
        )}
      </div>
    </div>
  );
}

export default UpdateAccountInfo;
