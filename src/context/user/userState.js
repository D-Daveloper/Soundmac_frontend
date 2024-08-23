/* eslint-disable array-callback-return */
import axios from "axios";
import UserContext from "./userContext";
import { useContext, useState } from "react";
import AlertContext from "../alertAndPopUp/alertAndPopUpContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtpModalContext from "../otpModal/otpModalContext";
import { useMediaQuery } from "react-responsive";
import Fuse from "fuse.js";

const UserState = ({ children }) => {
  const url = process.env.REACT_APP_BACKEND_SERVER_URL;
  const { alert, pop, removePopUp } = useContext(AlertContext);
  const { popUpOtpModal } = useContext(OtpModalContext);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1000px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 999px)" });

  const [allArtistes, setAllArtistes] = useState([]);

  const navigate = useNavigate();

  // loading states
  const [loading, setLoading] = useState({
    registering: false,
    logging_in: false,
  });

  // register
  const registerUser = async (val) => {
    setLoading((prev) => ({
      ...prev,
      registering: true,
    }));
    const navigateLogin = () => {
      navigate("/auth/login");
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.post(`${url}/auth/register`, body, config);
      const data = res.data;

      pop({
        title: "Verification link sent",
        msg: data.msg,
        actionBtn: "Log In",
        actionBtnFunction: () => navigateLogin(),
        showActionBtn: true,
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setLoading((prev) => ({
        ...prev,
        registering: false,
      }));
    }
  };

  // login
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
  });

  // save values to state
  const onChangeLoginInput = (e) => {
    setUserValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [user, setUser] = useState([]);

  const loginUser = async (val) => {
    setLoading((prev) => ({
      ...prev,
      logging_in: true,
    }));

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.post(`${url}/auth/login`, body, config);
      const data = res.data;
      localStorage.setItem("soundmac3_token", data.token);

      navigate(`/dashboard`);

      pop({
        title: "Log In successful!",
        msg: data.msg,
        showActionBtn: false,
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        if (
          err ===
          `Please check your mailbox to verify your account and if you can't find it there, kindly inspect your spam folder.`
        ) {
          pop({
            title: "Unverified account!",
            msg: err,
            actionBtn: "Resend Mail",
            actionBtnFunction: () => {
              reSendVerificationLink();
            },
            showActionBtn: true,
          });
        } else if (
          err ===
          `An otp has been sent to your mail and if you can't find it there, kindly inspect your spam folder.`
        ) {
          pop({
            title: "OTP Sent!",
            msg: err,
            actionBtn: "Enter Otp",
            actionBtnFunction: () => {
              popUpOtpModal(true);
            },
            showActionBtn: true,
          });
        } else {
          alert(err);
        }
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setLoading((prev) => ({
        ...prev,
        logging_in: false,
      }));
    }
  };

  const resetPassword = async (val) => {
    setLoading((prev) => ({
      ...prev,
      logging_in: true,
    }));

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.patch(`${url}/auth/resetPassword`, body, config);
      const data = res.data;
      navigate("/auth/login");
      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setLoading((prev) => ({
        ...prev,
        logging_in: false,
      }));
    }
  };

  // send verification link
  const reSendVerificationLink = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email: userValues.email });

    try {
      const res = await axios.post(
        `${url}/auth/resendVerificationLink`,
        body,
        config
      );
      const data = res.data;
      removePopUp();

      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
    }
  };

  // forgot password
  const [enterEmailModal, setEnterEmailModal] = useState(false);

  const popEnterEmailModal = (val) => {
    setEnterEmailModal(val);
  };

  const [forgotPasswordVal, setForgotPasswordVal] = useState({
    email: "",
  });

  const enter_forgot_password_mail = (e) => {
    setForgotPasswordVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [sending_link, set_sending_link] = useState(false);

  // send reset link
  const sendResetLink = async (val) => {
    set_sending_link(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.patch(
        `${url}/auth/sendRefreshToken`,
        body,
        config
      );
      const data = res.data;
      popEnterEmailModal(false);
      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      set_sending_link(false);
    }
  };

  // get user
  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };
    try {
      const res = await axios.get(`${url}/users/user`, config);
      const data = res.data;
      setUser(data.user);

      data.user.type === null && navigate("/select_account_type");
      data.user.type &&
        data.user.role !== "admin" &&
        data.user.role !== "super_admin" &&
        !data.user.artiste &&
        navigate("/add_artiste");

      if (data.user.role === "admin" || data.user.role === "super_admin") {
        getAllUsers();
      } else if (data.user.artiste) {
        updateNewInfo(data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    }
  };

  //   select account type

  const [accountVal, setAccountVal] = useState({
    type: "INDEPENDENT_ARTISTE",
    amount: process.env.REACT_APP_INDEPENDENT_ARTISTE_AMOUNT,
  });

  //   select account type
  const selectType = (val) => {
    setAccountVal((prev) => ({
      ...prev,
      type: val,
    }));
  };

  // set amount
  const setAmount = (val) => {
    setAccountVal((prev) => ({
      ...prev,
      amount: val,
    }));
  };

  // create account
  const createAccount = async (val) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.patch(`${url}/account/create`, body, config);
      const data = res.data;
      setUser(data.user);

      !data.user.artiste ? navigate("/add_artiste") : navigate("/dashboard");

      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
    }
  };

  const [loadingProgress, setLoadingProgress] = useState(null);

  // add artiste
  const [artisteVal, setArtisteVal] = useState({
    label: "",
    artiste_name: "",
    artiste_image: [],
  });

  const enter_artiste_val = (e) => {
    setArtisteVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectImage = (val) => {
    setArtisteVal((prev) => ({
      ...prev,
      artiste_image: val,
    }));
  };

  const [adding_artiste, set_adding_artiste] = useState(false);

  const addArtiste = async (val) => {
    set_adding_artiste(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setLoadingProgress(percentage);
      },
    };

    try {
      const res = await axios.patch(`${url}/artiste/add`, val, config);
      const data = res.data;
      setUser(data.user);

      updateNewInfo(data);
      navigate("/dashboard");

      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
      const err = error.response.data.msg;
      alert(err);
    } finally {
      setLoadingProgress(null);
      set_adding_artiste(false);
    }
  };

  // update account info
  const [updating_account_info, set_updating_account_info] = useState(false);

  const updateAccountInfo = async (val) => {
    set_updating_account_info(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.patch(`${url}/users/`, body, config);
      const data = res.data;
      setUser(data.user);

      updateNewInfo(data);
      navigate("/dashboard/settings");

      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
      const err = error.response.data.msg;
      alert(err);
    } finally {
      set_updating_account_info(false);
    }
  };

  // update account info
  const [changing_password, set_changing_password] = useState(false);

  const changePassword = async (val) => {
    set_changing_password(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.patch(
        `${url}/users/change_password`,
        body,
        config
      );
      const data = res.data;
      setUser(data.user);

      updateNewInfo(data);
      navigate("/dashboard/settings");

      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
      const err = error.response.data.msg;
      alert(err);
    } finally {
      set_changing_password(false);
    }
  };

  // dashboard
  const [middleItem, setMiddleItem] = useState({});
  const [creditItem, setCreditItem] = useState({});

  const [searchParams] = useSearchParams();

  const addMiddleItem = (val) => {
    setMiddleItem(val);
  };

  // update new info
  const updateNewInfo = (data) => {
    const allArtistes = [];

    const artistes = Object.keys(data.user.artiste);
    artistes.sort((a, b) => {
      return a.localeCompare(b);
    });

    const active_artiste = searchParams.get("artiste_name");
    for (const artiste_name in data.user.artiste) {
      const artiste_obj = data.user.artiste[artiste_name];
      allArtistes.push(artiste_obj);
      setAllArtistes(allArtistes);
    }

    addMiddleItem(
      data.user.artiste[active_artiste] || data.user.artiste[artistes[0]]
    );
  };

  const addCreditItem = (val) => {
    setCreditItem(val);
  };

  // first timer
  const [isFirstTimer, setIsFirstTimer] = useState("false");

  const [uploading_song, set_uploading_song] = useState(false);

  const active_artiste = searchParams.get("artiste_name");
  const action = searchParams.get("action");

  const { premium } = user;

  const currentDate = new Date(); // Current date
  const non_premium_release_date = new Date(
    currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
  ); // Add 14 days in mili-seconds 14 days in milliseconds

  const [uploadValues, setUploadValues] = useState({
    artiste_name: active_artiste,
    song_title: "",
    audio: "",
    image: "",
    copyrightYear: "",
    copyrightHolder: "",
    language: "Language",
    genre: "Genre",
    explicit: "no",
    ISRC: "",
    UPC: "",
    other_artistes: "",
    featured_artistes: "",
    produced_by: "",
    performed_by: "",
    written_by: "",
    lyrics: "",
    syncLicensing: "",
    release_date: !premium ? non_premium_release_date : "",
    remove: "",
    action: action,
  });

  // upload song
  const uploadSong = async (val, uploadValues) => {
    set_uploading_song(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setLoadingProgress(percentage);
      },
    };

    try {
      const res = await axios.patch(`${url}/song/upload`, val, config);
      const data = res.data;
      setUser(data.user);

      updateNewInfo(data);

      navigate(`/dashboard?artiste_name=${middleItem.artiste_name}`);
      alert(data.msg);

      createNotification(
        `${uploadValues.song_title} uploaded`,
        `${uploadValues.artiste_name} just uploaded a song named ${uploadValues.song_title}`,
        process.env.REACT_APP_ADMIN_ID
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setLoadingProgress(null);
      set_uploading_song(false);
    }
  };

  // create draft album
  const createDraftAlbum = async (val, uploadValues) => {
    set_uploading_song(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    try {
      const res = await axios.patch(`${url}/album/upload`, val, config);
      const data = res.data;
      setUser(data.user);

      updateNewInfo(data);

      navigate(
        `/upload/add_tracks?artiste_name=${uploadValues.artiste_name}&album_title=${uploadValues.album_title}`
      );
      alert(data.msg);

      createNotification(
        `${uploadValues.album_title} created!`,
        `${uploadValues.artiste_name} just created an album named ${uploadValues.album_title}`,
        process.env.REACT_APP_ADMIN_ID
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setLoadingProgress(null);
      set_uploading_song(false);
    }
  };

  // add tracks to an album
  const active_album = searchParams.get("album_title");
  const emptyVal = {
    artiste_name: active_artiste,
    album_title: active_album,
    track_title: "",
    audio: "",
    copyrightYear: "",
    copyrightHolder: "",
    language: "Language",
    genre: "Genre",
    explicit: "no",
    ISRC: "",
    UPC: "",
    other_artistes: "",
    featured_artistes: "",
    produced_by: "",
    performed_by: "",
    written_by: "",
    lyrics: "",
    syncLicensing: "",
    remove: "",
    action: "upload",
    track_number: "Assign track number",
  };

  const [tracksUploadValues, setTracksUploadValues] = useState(emptyVal);

  const addTracks = async (val, uploadValues) => {
    set_uploading_song(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setLoadingProgress(percentage);
      },
    };

    try {
      const res = await axios.patch(`${url}/album/tracks/add`, val, config);
      const data = res.data;
      setUser(data.user);

      updateNewInfo(data);

      navigate(
        `/upload/add_tracks?artiste_name=${uploadValues.artiste_name}&album_title=${uploadValues.album_title}`
      );
      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setLoadingProgress(null);
      set_uploading_song(false);
    }
  };

  // get all users
  const [allUsers, setAllUsers] = useState("");
  const getAllUsers = async () => {
    const allArtistes = [];

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    try {
      const res = await axios.get(`${url}/users/`, config);
      const data = res.data;

      setAllUsers(data.users);
      const allSongs = {};
      const allAlbums = {};

      data.users.forEach((user) => {
        for (const artisteName in user.artiste) {
          if (
            user.artiste.hasOwnProperty(artisteName) &&
            user.artiste[artisteName].songs
          ) {
            // Iterate through the songs of each artiste
            for (const songTitle in user.artiste[artisteName].songs) {
              if (user.artiste[artisteName].songs.hasOwnProperty(songTitle)) {
                allSongs[songTitle] =
                  user.artiste[artisteName].songs[songTitle];
              }
            }
          }

          // album
          if (
            user.artiste.hasOwnProperty(artisteName) &&
            user.artiste[artisteName].albums
          ) {
            // Iterate through the songs of each artiste
            for (const albumTitle in user.artiste[artisteName].albums) {
              if (user.artiste[artisteName].albums.hasOwnProperty(albumTitle)) {
                allAlbums[albumTitle] =
                  user.artiste[artisteName].albums[albumTitle];
              }
            }
          }
        }
      });

      // pending songs
      const pendingSongs = Object.keys(allSongs)
        .filter((songKey) => allSongs[songKey].status === "pending")
        .reduce((result, key) => {
          result[key] = allSongs[key];
          return result;
        }, {});

      // pending albums
      const pendingAlbums = Object.keys(allAlbums)
        .filter((albumKey) => allAlbums[albumKey].status === "pending")
        .reduce((result, key) => {
          result[key] = allAlbums[key];
          return result;
        }, {});

      allArtistes.push({
        id: "approve or reject a project",
        artiste_name: "...Pending",
        artiste_image:
          "https://sconchun.sirv.com/icons8-team-7LNatQYMzm4-unsplash%20(1).jpg",
        songs: pendingSongs,
        albums: pendingAlbums,
      });

      // eslint-disable-next-line array-callback-return
      data.users.map((item) => {
        for (const artiste in item.artiste) {
          const artiste_obj = item.artiste[artiste];
          allArtistes.push(artiste_obj);
          // navigate("/dashboard");
          setAllArtistes(allArtistes);
          addMiddleItem(allArtistes[0]);
        }
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    }
  };

  // create notification
  const createNotification = async (title, message, to) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify({
      title: title,
      message: message,
      to: to,
    });

    try {
      await axios.post(`${url}/notification/`, body, config);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    }
  };

  const [notification, setNotification] = useState("");

  // get user notification
  const getNotification = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };
    try {
      const res = await axios.get(`${url}/notification/`, config);
      const data = res.data;
      setNotification(data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    }
  };

  const [approving, setApproving] = useState(false);

  // approve or reject song
  const processSong = async (
    created_by,
    artiste_name,
    song_title,
    status,
    reason
  ) => {
    setApproving(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const message = `We wish to let you know that your song ${song_title} has been ${status}. ${
      status === "rejected" &&
      `\n \nReason(s):\n \n${
        reason.length > 0 &&
        reason
          .map((item, index) => {
            return `${index + 1}. ${item}`;
          })
          .join("\n")
      }`
    }`;

    const body = JSON.stringify({
      created_by: created_by,
      artiste_name: artiste_name,
      song_title: song_title,
      status: status,
      message: message,
    });

    try {
      const res = await axios.patch(`${url}/song/status`, body, config);
      const data = res.data;
      alert(data.msg);

      getAllUsers();

      createNotification(`${song_title} ${status}`, message, `${created_by}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setApproving(false);
    }
  };

  // approve or reject song
  const processAlbum = async (
    created_by,
    artiste_name,
    album_title,
    status,
    reason
  ) => {
    setApproving(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const message = `We wish to let you know that your album ${album_title} has been ${status}. ${
      status === "rejected" &&
      `\n \nReason(s):\n \n${
        reason.length > 0 &&
        reason
          .map((item, index) => {
            return `${index + 1}. ${item}`;
          })
          .join("\n")
      }`
    }`;

    const body = JSON.stringify({
      created_by: created_by,
      artiste_name: artiste_name,
      album_title: album_title,
      status: status,
      message: message,
    });

    try {
      const res = await axios.patch(`${url}/album/status`, body, config);
      const data = res.data;
      alert(data.msg);

      getAllUsers();

      createNotification(`${album_title} ${status}`, message, `${created_by}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setApproving(false);
    }
  };

  // delete track
  const deleteTrack = async (val) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.patch(`${url}/album/tracks/delete`, body, config);
      const data = res.data;
      setUser(data.user);

      // get all the artiste & send the first artiste after sorting to the url
      const artistes = Object.keys(data.user.artiste);
      artistes.sort((a, b) => {
        return a.localeCompare(b);
      });

      updateNewInfo(data);

      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
    }
  };

  // submit album
  const [submitting, setSubmitting] = useState(false);
  const submitAlbum = async (val) => {
    setSubmitting(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify(val);

    try {
      const res = await axios.patch(`${url}/album/tracks/finish`, body, config);
      const data = res.data;
      setUser(data.user);

      // get all the artiste & send the first artiste after sorting to the url
      const artistes = Object.keys(data.user.artiste);
      artistes.sort((a, b) => {
        return a.localeCompare(b);
      });

      updateNewInfo(data);
      navigate(`/dashboard?artiste_name=${middleItem.artiste_name}`);

      createNotification(
        `${val.album_title} submitted!`,
        `${val.artiste_name} just submitted an album named ${val.album_title}`,
        process.env.REACT_APP_ADMIN_ID
      );

      alert(data.msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // toggle rejection modal
  const [rejectModal, setRejectModal] = useState(false);
  const toggleRejectModal = () => {
    getRejectionReasons();
    setRejectModal(!rejectModal);
  };

  // get rejection reasons
  const [rejectionReasons, setRejectionReasons] = useState("");
  const getRejectionReasons = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };
    try {
      const res = await axios.get(`${url}/song/reject/reasons`, config);
      const data = res.data;
      setRejectionReasons(data.reasons);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    }
  };

  // create reasons
  const [addingReason, setAddingReasons] = useState(false);
  const createReasons = async (reason) => {
    setAddingReasons(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify({
      reason: reason,
    });

    try {
      await axios.post(`${url}/song/reject/reasons`, body, config);

      getRejectionReasons();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;

        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setAddingReasons(false);
    }
  };

  // toggle share modal
  const [shareModal, setShareModal] = useState(false);
  const [shareMsg, setShareMsg] = useState(false);
  const toggleShareModal = (msg) => {
    setShareModal(!shareModal);
    setShareMsg(msg);
  };

  // warn user
  const [warning, setWarning] = useState(false);
  const warnUser = async (id) => {
    setWarning(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify({
      id: id,
    });

    try {
      const res = await axios.patch(`${url}/users/warn`, body, config);
      const data = res.data;
      alert(data.msg);

      getAllUsers();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setWarning(false);
    }
  };

  // ban user
  const banUser = async (id) => {
    setWarning(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify({
      id: id,
    });

    try {
      const res = await axios.patch(`${url}/users/ban`, body, config);
      const data = res.data;
      alert(data.msg);

      getAllUsers();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setWarning(false);
    }
  };

  // add upc
  const [addingUpc, setAddingUpc] = useState(false);
  const addUPC = async (upc) => {
    setAddingUpc(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soundmac3_token")}`,
      },
    };

    const body = JSON.stringify({
      created_by: creditItem.created_by,
      artiste: creditItem.artiste_name,
      song_title: creditItem.song_title,
      upc: upc,
    });

    try {
      const res = await axios.patch(`${url}/song/add_upc`, body, config);
      const data = res.data;
      alert(data.msg);

      if (user.role === "admin" || user.role === "super_admin") {
        getAllUsers();
      } else {
        getUser();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        alert(err);
      } else {
        alert(`${error.message}!`);
      }
    } finally {
      setAddingUpc(false);
    }
  };

  // search artiste
  const searchFn = (searchKeyWord) => {
    const options = {
      includeScore: true,
      keys: ["artiste_name"],
    };

    console.log(allArtistes);
    const fuse = new Fuse(allArtistes, options);

    const result = fuse.search(searchKeyWord);

    result.sort((a, b) => a.score - b.score);
    console.log(result);

    const result_arr = [];
    result.forEach((element) => {
      result_arr.push(element.item);
    });

    return result_arr;
  };

  return (
    <UserContext.Provider
      value={{
        warnUser,
        searchFn,
        banUser,
        warning,
        shareMsg,
        toggleRejectModal,
        shareModal,
        toggleShareModal,
        rejectionReasons,
        getRejectionReasons,
        rejectModal,
        approving,
        processSong,
        getNotification,
        notification,
        addCreditItem,
        setIsFirstTimer,
        isFirstTimer,
        creditItem,
        addMiddleItem,
        middleItem,
        loading,
        loginUser,
        forgotPasswordVal,
        enter_forgot_password_mail,
        registerUser,
        userValues,
        onChangeLoginInput,
        user,
        accountVal,
        selectType,
        setAmount,
        getUser,
        setUser,
        createAccount,
        artisteVal,
        enter_artiste_val,
        selectImage,
        addArtiste,
        sending_link,
        popEnterEmailModal,
        enterEmailModal,
        sendResetLink,
        loadingProgress,
        adding_artiste,
        uploadSong,
        uploading_song,
        getAllUsers,
        allArtistes,
        createDraftAlbum,
        addTracks,
        deleteTrack,
        submitAlbum,
        submitting,
        isBigScreen,
        isTabletOrMobile,
        updateAccountInfo,
        updating_account_info,
        changePassword,
        changing_password,
        resetPassword,
        uploadValues,
        setUploadValues,
        tracksUploadValues,
        setTracksUploadValues,
        emptyVal,
        allUsers,
        addingUpc,
        addUPC,
        addingReason,
        createReasons,
        processAlbum,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserState;
