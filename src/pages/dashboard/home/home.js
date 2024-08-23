/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { FiSearch } from "react-icons/fi";
import classes from "./home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../context/user/userContext";
import { useNavigate } from "react-router-dom";
import { emptyBoy } from "../../../utils/emptSVG";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineDocumentReport, HiOutlineShare } from "react-icons/hi";
import Tutorials from "../../../utils/tutorials/tutorials";
import { BiSolidPlusSquare } from "react-icons/bi";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlineCloudDownload } from "react-icons/ai";
import LoaderBall from "../../../utils/loader/loaderBall/loaderBall";
import { saveAs } from "file-saver";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import AlertContext from "../../../context/alertAndPopUp/alertAndPopUpContext";
import Back from "../../../utils/backBtn/backBtn";
import LoadingSkeleton from "../../../utils/loadingSkeleton/loadingSkeleton";

function DashboardHome() {
  const audioRef = useRef(null);

  const {
    user,
    addingUpc,
    addUPC,
    creditItem,
    addMiddleItem,
    middleItem,
    addCreditItem,
    isFirstTimer,
    setIsFirstTimer,
    allArtistes,
    processSong,
    approving,
    toggleRejectModal,
    rejectModal,
    rejectionReasons,
    isBigScreen,
    allUsers,
    addingReason,
    createReasons,
    processAlbum,
    searchFn,
  } = useContext(UserContext);

  const { pop, alert } = useContext(AlertContext);

  const navigate = useNavigate();
  const { premium } = user;

  const [allSongs, setAllSongs] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);

  const finished_album = allAlbums.filter((item) => {
    return item.finished;
  });

  // un finished albums
  const un_finished_album = allAlbums.filter((item) => {
    return !item.finished;
  });

  useEffect(() => {
    const allSongs = [];
    const allAlbums = [];

    if (
      middleItem &&
      middleItem.songs &&
      Object.keys(middleItem.songs).length > 0
    ) {
      for (const songs in middleItem.songs) {
        const song_obj = middleItem.songs[songs];
        allSongs.push(song_obj);
        setAllSongs(allSongs);
      }
    }
    if (
      middleItem &&
      middleItem.albums &&
      Object.keys(middleItem.albums).length > 0
    ) {
      for (const albums in middleItem.albums) {
        const album_obj = middleItem.albums[albums];
        allAlbums.push(album_obj);
        setAllAlbums(allAlbums);
      }
    }

    if (!middleItem.songs) {
      setAllSongs([]);
    }

    if (!middleItem.albums) {
      setAllAlbums([]);
    }
  }, [middleItem]);

  // projects
  const [project_box, set_project_box] = useState("songs");

  // view
  const [showMore, setShowMore] = useState(false);

  const credit_item_length = Object.keys(creditItem).length;

  useEffect(() => {
    const firstTimer = localStorage.getItem("show_soundmac_dashboard_tutorial");
    setIsFirstTimer(firstTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  //   download SONG
  const handleDownload = () => {
    if (creditItem && creditItem.audio) {
      const url = creditItem.audio;
      const fileName = `${creditItem.song_title}.wav`;
      saveAs(url, fileName);
    }
  };

  // extract tracks
  // tracks from an album
  const [tracks, setTracks] = useState([]);

  const extractTracks = (val) => {
    let tracks = [];
    addCreditItem(val);

    if (Object.keys(val.tracks).length > 0) {
      for (const key in val.tracks) {
        const track_obj = val.tracks[key];

        tracks.push(track_obj);
        setTracks(tracks);
      }
    }
  };
  const [selected, setSelected] = useState([]);
  const handleReasonSelection = (val) => {
    if (selected.includes(val)) {
      const item = selected.filter((item) => item !== val);
      setSelected(item);
    } else {
      setSelected([...selected, val]);
    }
  };

  // search artiste
  const [clear, setClear] = useState(false);

  const [singers, setSingers] = useState([]);

  useEffect(() => {
    allArtistes.length > 0 && setSingers(allArtistes);
  }, [allArtistes]);

  const searchArtiste = (e) => {
    const searchKeyword = e.target.value;
    if (searchKeyword.length > 0) {
      const result_arr = searchFn(searchKeyword);
      setSingers(result_arr);
      setClear(true);
    } else {
      clearFn();
    }
  };

  const searchInputRef = useRef(null);
  const clearFn = () => {
    setClear(false);
    setSingers(allArtistes);

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  if (singers.length) {
    singers.sort((a, b) => {
      const nameA = (a.artiste_name || "").toLowerCase();
      const nameB = (b.artiste_name || "").toLowerCase();

      // Ensure "...Pending" always comes first
      if (nameA === "...pending") {
        return -1;
      } else if (nameB === "...pending") {
        return 1;
      } else {
      }
    });
  }

  // for displaying credits on mobile
  const [mobileCredit, setMobileCredits] = useState(false);
  const user_length = Object.keys(user).length;

  // add upc
  const [upcInput, setUpcInput] = useState(false);
  const [upcUpdate, setUpcUpdate] = useState("");

  const [reason, setReason] = useState("");

  const addReason = async () => {
    if (reason === "") {
      alert(`enter a reason to add!`);
    } else {
      await createReasons(reason);
      setReason("");
    }
  };

  const getSalesReport = () => {
    navigate("/sales-report?page=1");
  };

  const uploadSalesReport = () => {
    console.log("upload report");
  };

  return (
    <div className={classes.container}>
      {user_length <= 0 ? (
        <div className={classes.loading_skeleton_container}>
          <LoadingSkeleton />
        </div>
      ) : (
        <>
          {isFirstTimer === "true" && <Tutorials />} {/* edit to true */}
          <div className={classes.artiste_section}>
            <p className={classes.heading}>Artiste</p>

            <div className={classes.search_artiste_container}>
              <FiSearch className={classes.search_icon} />

              <input
                type="text"
                className={classes.input}
                placeholder={"Search artiste"}
                onChange={searchArtiste}
                ref={searchInputRef}
              />

              {clear && (
                <p onClick={clearFn} className={classes.clear}>
                  clear
                </p>
              )}
            </div>
            <div className={classes.all_artistes_container}>
              <div className={classes.artiste_count_and_sort_container}>
                <p className={classes._artiste_count}>
                  {singers && singers.length} artiste(s)
                </p>
              </div>

              <div className={classes.allArtistes_sub_container}>
                {singers.length > 0 &&
                  singers
                    .filter(
                      (item) =>
                        item.artiste_name !== undefined &&
                        item.artiste_name !== ""
                    )

                    .map((item, index) => (
                      <div
                        onClick={() => addMiddleItem(item)}
                        key={index}
                        style={
                          middleItem.artiste_name === item.artiste_name
                            ? { background: "#0ff" }
                            : {}
                        }
                        className={classes.small_artiste_container}
                      >
                        <img
                          className={classes.small_artiste_image}
                          src={item.artiste_image}
                          alt={item.artiste_name}
                        />
                        <p
                          style={
                            middleItem.artiste_name === item.artiste_name
                              ? { color: "#000" }
                              : {}
                          }
                          className={classes.small_artiste_name}
                        >
                          {item.artiste_name && item.artiste_name.length > 10
                            ? item.artiste_name.substring(0, 10) + "..."
                            : item.artiste_name}
                        </p>
                      </div>
                    ))}

                {!isBigScreen && (
                  <p
                    onClick={() => navigate("/add_artiste")}
                    className={classes.add_artiste}
                  >
                    Add artiste +
                  </p>
                )}
              </div>
              {isBigScreen && (
                <p
                  onClick={() => navigate("/add_artiste")}
                  className={classes.add_artiste}
                >
                  Add artiste +
                </p>
              )}
            </div>

            <div className={classes.earn_container}>
              <p className={classes.earned_amount}>Process withdrawal? 👇</p>
              <p
                className={classes.withdraw}
                onClick={() =>
                  user.role === "admin" ? uploadSalesReport() : getSalesReport()
                }
              >
                {user.role === "admin" ? "Upload " : "Go to "} sales report
              </p>
            </div>
          </div>
          <div className={classes.middle_section_group}>
            <div className={classes.middle_section}>
              <div className={classes.middle_image_container}>
                <div className={classes.overlay}>
                  <div
                    style={
                      showMore
                        ? { marginTop: "initial", display: "initial" }
                        : {}
                    }
                    className={classes.middle_image_texts_container}
                  >
                    <div className={classes.middle_image_texts}>
                      <p className={classes.middle_image_name}>
                        {middleItem.artiste_name &&
                        middleItem.artiste_name.length > 10
                          ? middleItem.artiste_name.substring(0, 10) + "..."
                          : middleItem.artiste_name}
                      </p>
                      <p className={classes.middle_id}>{middleItem.id}</p>
                    </div>
                    {!premium &&
                      user.role !== "admin" &&
                      user.role !== "super_admin" && (
                        <div className={classes.warning_and_ban_container}>
                          <p className={classes.explore_btn}>explore premium</p>
                        </div>
                      )}
                  </div>
                </div>
                <img
                  className={classes.middle_image}
                  src={middleItem.artiste_image}
                  alt={middleItem.artiste_name}
                />
              </div>

              <div className={classes.project_selector_container}>
                <div
                  onClick={() => {
                    set_project_box(`albums`);
                    addCreditItem({});
                  }}
                  className={
                    project_box === "songs"
                      ? classes.short_box
                      : classes.long_box
                  }
                >
                  <p className={classes.projects_text}>
                    Albums{" "}
                    {project_box === "albums" && (
                      <span>({allAlbums.length})</span>
                    )}
                  </p>

                  {project_box === "albums" && (
                    <BiSolidPlusSquare
                      onClick={() =>
                        navigate(
                          `/upload/album?artiste_name=${middleItem.artiste_name}`
                        )
                      }
                      className={classes.add_button}
                    />
                  )}
                </div>
                <div
                  onClick={() => set_project_box(`songs`)}
                  className={
                    project_box === "songs"
                      ? classes.long_box
                      : classes.short_box
                  }
                >
                  <p className={classes.projects_text}>
                    Songs
                    {project_box === "songs" && user.role === "user" && (
                      <span>({allSongs.length})</span>
                    )}
                  </p>
                  {project_box === "songs" && user.role === "user" && (
                    <BiSolidPlusSquare
                      onClick={() =>
                        navigate(
                          `/upload/song?artiste_name=${middleItem.artiste_name}&action=upload`
                        )
                      }
                      className={classes.add_button}
                    />
                  )}
                </div>
              </div>
              <div
                className={
                  showMore ? classes.songs_con_full_mode : classes.songs_con
                }
              >
                {project_box === "songs" ? (
                  <div>
                    {allSongs.length > 0 ? (
                      <div className={classes.all_songs_container}>
                        {allSongs.map((item, index) => (
                          <div
                            onClick={() => {
                              addCreditItem(item);
                              setAudioPlaying(false);
                              !isBigScreen && setMobileCredits(!mobileCredit);
                            }}
                            key={index}
                            className={classes.song_container}
                            style={
                              creditItem.song_title === item.song_title
                                ? { background: "#0ff" }
                                : {}
                            }
                          >
                            <p className={classes.index}> {index + 1}</p>
                            <img
                              className={classes.song_small_image}
                              src={item.image}
                              alt={item.song_title}
                            />
                            <p className={classes.song_title}>
                              {" "}
                              {item.song_title}
                            </p>

                            {creditItem.id === item.id && audioPlaying && (
                              <img
                                className={classes.playing}
                                src="https://sconchun.sirv.com/WAVE-1s%20(1).gif"
                                alt="sound wave"
                              />
                            )}

                            <p
                              style={
                                item.status === "approved"
                                  ? { color: "green" }
                                  : item.status === "rejected"
                                  ? { color: "red" }
                                  : { color: "yellow" }
                              }
                              className={classes.promote}
                            >
                              {" "}
                              {item.status}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={classes.empty_con}>
                        <div>{emptyBoy} </div>
                        <p className={classes.empty_title}>
                          {middleItem.artiste_name + " "} has no song to display
                        </p>
                        <p className={classes.empty_instruction}>
                          Start your musical journey now! Click the button below
                          to upload your very first song and let the world hear
                          your talent.
                        </p>

                        {user.role === "user" && (
                          <p
                            onClick={() =>
                              navigate(
                                `/upload/song?artiste_name=${middleItem.artiste_name}&action=upload`
                              )
                            }
                            className={classes.empty_prompt}
                          >
                            Upload Song
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={classes.all_albums_container}>
                    {allAlbums.length <= 0 && (
                      <div className={classes.empty_con}>
                        <div>{emptyBoy} </div>
                        <p className={classes.empty_title}>
                          {middleItem.artiste_name + " "} has no song to display
                        </p>
                        <p className={classes.empty_instruction}>
                          Start your musical journey now! Click the button below
                          to upload your very first album and let the world hear
                          your talent.
                        </p>

                        {user.role === "user" && (
                          <p
                            onClick={() =>
                              navigate(
                                `/upload/album?artiste_name=${middleItem.artiste_name}`
                              )
                            }
                            className={classes.empty_prompt}
                          >
                            Upload Album
                          </p>
                        )}
                      </div>
                    )}

                    {/* draft */}
                    {un_finished_album.length > 0 && (
                      <div>
                        <p className={classes.draft_header}>Draft</p>
                        <p className={classes.draft_sub_header}>
                          Note that albums in your draft won’t be distributed,
                          so click the album to finish uploading.
                        </p>

                        <div>
                          <Splide
                            options={{
                              rewind: true,
                              autoWidth: true,
                              arrows: un_finished_album.length > 9,
                              pagination: true,
                              gap: 0,
                            }}
                            className={classes.splide}
                          >
                            {un_finished_album
                              .map((item, index) => (
                                <SplideSlide
                                  className={classes.splide_share}
                                  key={index}
                                  onClick={() => {
                                    navigate(
                                      `/upload/add_tracks?artiste_name=${middleItem.artiste_name}&album_title=${item.album_title}`
                                    );
                                  }}
                                >
                                  <img
                                    src={item.image}
                                    className={classes.album_image}
                                    alt={item.name}
                                  />
                                </SplideSlide>
                              ))
                              .reverse()}
                          </Splide>
                        </div>
                      </div>
                    )}

                    {/* finished */}
                    {finished_album.length > 0 && (
                      <div>
                        <div>
                          <p className={classes.draft_header}>
                            Uploaded albums
                          </p>
                          <p className={classes.draft_sub_header}>
                            These are the albums you completed the uploading
                            process for. Albums listed below would be considered
                            for distribution.
                          </p>

                          <div
                            onClick={() => {
                              setShowMore(true);
                            }}
                          >
                            <Splide
                              options={{
                                rewind: true,
                                autoWidth: true,
                                arrows: finished_album.length > 4,
                                pagination: true,
                                gap: 0,
                              }}
                              className={classes.splide}
                            >
                              {finished_album
                                .map((item, index) => (
                                  <SplideSlide
                                    className={classes.splide_share}
                                    key={index}
                                    onClick={() => {
                                      extractTracks(item);
                                      console.log(item);
                                    }}
                                    style={
                                      creditItem.album_title ===
                                      item.album_title
                                        ? { background: "#0ff" }
                                        : {}
                                    }
                                  >
                                    <img
                                      src={item.image}
                                      className={classes.finished_album_image}
                                      alt={item.album_title}
                                    />
                                    <p className={classes.album_title}>
                                      {item.album_title}
                                    </p>
                                  </SplideSlide>
                                ))
                                .reverse()}
                            </Splide>
                          </div>
                        </div>

                        {/* tracks */}
                        {tracks.length > 0 && (
                          <p className={classes.track_header}>Track list</p>
                        )}
                        <div>
                          {tracks.length > 0 &&
                            tracks

                              .sort((a, b) =>
                                a.track_number.localeCompare(b.track_number)
                              )
                              .map((item, index) => (
                                <div
                                  onClick={() => {
                                    addCreditItem({
                                      ...item,
                                      image: creditItem.image,
                                      album_title: creditItem.album_title,
                                    });
                                    setAudioPlaying(false);
                                    !isBigScreen &&
                                      setMobileCredits(!mobileCredit);
                                  }}
                                  key={index}
                                  className={classes.song_container}
                                  style={
                                    creditItem.track_title === item.track_title
                                      ? { background: "#0ff" }
                                      : {}
                                  }
                                >
                                  <p className={classes.track_index}>
                                    {" "}
                                    {item.track_number}
                                  </p>

                                  <p className={classes.song_title}>
                                    {" "}
                                    {item.track_title}
                                  </p>

                                  {creditItem.id === item.id &&
                                    audioPlaying && (
                                      <img
                                        className={classes.playing}
                                        src="https://sconchun.sirv.com/WAVE-1s%20(1).gif"
                                        alt="sound wave"
                                      />
                                    )}
                                </div>
                              ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={classes.show_more_group}>
              {!showMore ? (
                <div className={classes.view_container}>
                  <p
                    onClick={() => setShowMore(!showMore)}
                    className={classes.view}
                  >
                    Show Full
                  </p>
                  <RiArrowDropDownLine className={classes.show_more_dropdown} />
                </div>
              ) : (
                <div className={classes.view_container}>
                  <p
                    onClick={() => setShowMore(!showMore)}
                    className={classes.view}
                  >
                    Show Less
                  </p>
                  <RiArrowDropDownLine className={classes.show_less_dropdown} />
                </div>
              )}
            </div>
          </div>
          <div
            className={
              mobileCredit
                ? classes.credits_section
                : classes.credits_section_initial
            }
          >
            <div
              onClick={() => {
                setMobileCredits(!mobileCredit);
              }}
              className={classes.back_container}
            >
              <Back show_arrow={true} title={middleItem.artiste_name} />
            </div>
            <div
              style={
                credit_item_length > 0
                  ? {
                      background: `url(${creditItem.image})`,
                    }
                  : {
                      background: `url(https://sconchun.sirv.com/dashboard%20banner%20three)`,
                    }
              }
              className={classes.credit_image_container}
            >
              <img
                className={classes.credit_image}
                src={
                  credit_item_length > 0
                    ? creditItem.image
                    : "https://sconchun.sirv.com/dashboard%20banner%20three"
                }
                alt=""
              />
            </div>
            <div className={classes.credit_text}>
              {/* reject modal */}

              <div
                className={
                  rejectModal
                    ? classes.reject_modal_container
                    : classes.reject_modal_container_hidden
                }
              >
                <p className={classes.reason_header}>
                  Select a reason to reject{" "}
                  {credit_item_length > 0 && `"${creditItem.song_title}"`}
                </p>
                <div className={classes.line}> </div>
                <div className={classes.add_reasons_container}>
                  <input
                    className={classes.add_text_input}
                    type="text"
                    placeholder="Type new reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <p
                    onClick={() => !addingReason && addReason()}
                    className={classes.add_text}
                  >
                    add
                  </p>
                </div>
                <div className={classes.reasons_list_container}>
                  {rejectionReasons !== "" &&
                    rejectionReasons.map((item, index) => (
                      <div
                        onClick={() => handleReasonSelection(item.reason)}
                        className={classes.reasons_list}
                        key={index}
                        style={
                          selected.includes(item.reason)
                            ? { background: "#ff4500" }
                            : {}
                        }
                      >
                        <p>{item.reason}</p>
                      </div>
                    ))}
                </div>
                {/* close area */}
                <div className={classes.close_area}>
                  <p className={classes.reject_btn} onClick={toggleRejectModal}>
                    Close
                  </p>
                  <p
                    className={classes.approve_btn}
                    onClick={() => {
                      if (selected.length > 0) {
                        toggleRejectModal();
                        pop({
                          title: "Are you sure?",
                          msg: `you are about to reject ${
                            creditItem.song_title
                          } by ${
                            creditItem.artiste_name
                          }. Reason(s):\n \n${selected
                            .map((item, index) => {
                              return `${index + 1}. ${item}`;
                            })
                            .join("\n")}`,
                          actionBtn: "Reject",
                          actionBtnFunction: () => {
                            processSong(
                              creditItem.created_by,
                              creditItem.artiste_name,
                              creditItem.song_title,
                              "rejected",
                              selected
                            );
                          },
                          showActionBtn: true,
                        });
                      } else {
                        alert(`Select at least 1 reason!`);
                      }
                    }}
                  >
                    Reject
                  </p>
                </div>
              </div>

              <div className={classes.credits_header}>
                <p className={classes.credits_heading}>Credits</p>

                {credit_item_length > 0 && (
                  <>
                    <audio src={creditItem.audio} ref={audioRef} />

                    <div onClick={toggleAudio}>
                      {audioPlaying ? (
                        <AiOutlinePauseCircle
                          className={classes.credits_heading_icon}
                        />
                      ) : (
                        <AiOutlinePlayCircle
                          className={classes.credits_heading_icon}
                        />
                      )}
                    </div>

                    <AiOutlineCloudDownload
                      onClick={() => handleDownload()}
                      className={classes.credits_heading_icon}
                    />

                    <HiOutlineDocumentReport
                      className={classes.credits_heading_icon}
                    />
                    <HiOutlineShare className={classes.credits_heading_icon} />
                  </>
                )}
              </div>

              {credit_item_length > 0 && (
                <div>
                  <div className={classes.line}> </div>

                  <p className={classes.credit_name}>Artiste:</p>
                  <p className={classes.credit_answer}>
                    {creditItem.artiste_name ||
                      middleItem.albums[creditItem.album_title].artiste_name}
                  </p>

                  {allUsers.length > 0 && creditItem && (
                    <>
                      <p className={classes.credit_name}>Email address:</p>
                      {allUsers
                        .filter((item) => item._id === creditItem.created_by)
                        .map((item, index) => (
                          <p className={classes.credit_answer}>{item.email}</p>
                        ))}
                    </>
                  )}

                  <p className={classes.credit_name}>
                    {creditItem.song_title ? "Song title:" : "Track title:"}
                  </p>
                  <p className={classes.credit_answer}>
                    {creditItem.song_title || creditItem.track_title}
                  </p>

                  <p className={classes.credit_name}>Genre:</p>
                  <p className={classes.credit_answer}>{creditItem.genre}</p>

                  <p className={classes.credit_name}>Language:</p>
                  <p className={classes.credit_answer}>{creditItem.language}</p>

                  <div className={classes.credit_group}>
                    <p className={classes.credit_name}>Release date:</p>
                    <p className={classes.credit_answer}>
                      {new Date(
                        creditItem.release_date ||
                          middleItem.albums[creditItem.album_title].release_date
                      ).toLocaleDateString("en-us", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className={classes.credit_name}>Copyright:</p>
                    <p className={classes.credit_answer}>
                      {creditItem.copyrightHolder},{" "}
                      {creditItem.copyrightYear &&
                      creditItem.copyrightYear.length > 4
                        ? creditItem.copyrightYear.substring(0, 4)
                        : creditItem.copyrightYear}
                      ,
                    </p>

                    <p className={classes.credit_name}>UPC:</p>
                    <p
                      className={
                        !creditItem.UPC || creditItem.UPC === ""
                          ? classes.credit_answer_editable
                          : classes.credit_answer
                      }
                      onClick={() => {
                        setUpcInput(!upcInput);
                      }}
                    >
                      {creditItem.UPC || "click to add UPC"},
                    </p>

                    {upcInput && (
                      <div className={classes.upc_input_container}>
                        <input
                          className={classes.upc_input}
                          type="text"
                          placeholder="enter upc"
                          value={upcUpdate}
                          onChange={(e) => setUpcUpdate(e.target.value)}
                        />
                        <p
                          onClick={() => {
                            !addingUpc && addUPC(upcUpdate);
                            setUpcInput(false);
                          }}
                          className={classes.add_upc_btn}
                        >
                          add upc
                        </p>
                      </div>
                    )}

                    <p className={classes.credit_name}>ISRC:</p>
                    <p
                      className={
                        !creditItem.ISRC || creditItem.ISRC === ""
                          ? classes.credit_answer_editable
                          : classes.credit_answer
                      }
                    >
                      {creditItem.ISRC || "click to add ISRC"},
                    </p>

                    <p className={classes.credit_name}>Featuring:</p>
                    <p className={classes.credit_answer}>
                      {creditItem.featured_artistes}
                    </p>

                    <p className={classes.credit_name}>Performed by:</p>
                    <p className={classes.credit_answer}>
                      {creditItem.performed_by}
                    </p>

                    <p className={classes.credit_name}>Written by:</p>
                    <p className={classes.credit_answer}>
                      {creditItem.written_by},
                    </p>

                    <p className={classes.credit_name}>Produced by:</p>
                    <p className={classes.credit_answer}>
                      {creditItem.produced_by},
                    </p>
                  </div>

                  {middleItem.artiste_name === "...Pending" ? (
                    <div className={classes.process_container}>
                      {approving ? (
                        <div className={classes.process_loader_container}>
                          <LoaderBall />
                        </div>
                      ) : (
                        <>
                          <p
                            className={classes.reject_btn}
                            onClick={() => {
                              setSelected([]);
                              toggleRejectModal();
                            }}
                          >
                            Reject
                          </p>
                          <p
                            className={classes.approve_btn}
                            onClick={() =>
                              pop({
                                title: "Are you sure?",
                                msg: `you are about to approve ${
                                  creditItem.song_title ||
                                  creditItem.album_title
                                } by ${
                                  creditItem.artiste_name ||
                                  middleItem.albums[creditItem.album_title]
                                    .artiste_name
                                }`,
                                actionBtn: "Approve",
                                actionBtnFunction: () => {
                                  project_box === "songs"
                                    ? processSong(
                                        creditItem.created_by,
                                        creditItem.artiste_name,
                                        creditItem.song_title,
                                        "approved"
                                      )
                                    : processAlbum(
                                        middleItem.albums[
                                          creditItem.album_title
                                        ].created_by,
                                        middleItem.albums[
                                          creditItem.album_title
                                        ].artiste_name,
                                        creditItem.album_title,
                                        "approved"
                                      );
                                },
                                showActionBtn: true,
                              })
                            }
                          >
                            Approve
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <p
                      onClick={() =>
                        navigate(
                          `/upload/song?artiste_name=${middleItem.artiste_name}&project=${creditItem.song_title}&action=edit`
                        )
                      }
                      className={classes.edit}
                    >
                      Edit
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardHome;
