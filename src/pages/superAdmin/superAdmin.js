import { useContext } from "react";
import classes from "./superAdmin.module.css";
import UserContext from "../../context/user/userContext";

export default function SuperAdmin() {
  const { allUsers, allArtistes, warnUser, banUser, warning } = useContext(
    UserContext
  );

  let premiumUsers = "";
  let freeUsers = "";
  let independentArtistes = "";
  let miniLabel = "";
  let bigLabel = "";
  let allSongs = [];
  let allAlbums = [];

  if (allUsers !== "" && allUsers.length > 0) {
    premiumUsers = allUsers.filter((item) => item.premium === true);
    freeUsers = allUsers.filter((item) => item.premium === false);
    independentArtistes = allUsers.filter(
      (item) => item.type === "INDEPENDENT_ARTISTE"
    );
    miniLabel = allUsers.filter((item) => item.type === "MINI_LABEL");

    bigLabel = allUsers.filter((item) => item.type === "BIG_LABEL");

    allUsers.forEach((user) => {
      for (const artisteName in user.artiste) {
        if (
          user.artiste.hasOwnProperty(artisteName) &&
          user.artiste[artisteName].songs
        ) {
          // Iterate through the songs of each artiste
          for (const songTitle in user.artiste[artisteName].songs) {
            if (user.artiste[artisteName].songs.hasOwnProperty(songTitle)) {
              allSongs.push(user.artiste[artisteName].songs[songTitle]);
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
              allAlbums.push(user.artiste[artisteName].albums[albumTitle]);
            }
          }
        }
      }
    });
  }

  return (
    <div className={classes.container}>
      <p className={classes.title}>Overview</p>

      <div className={classes.group}>
        <div className={classes.metric}>
          <MetricBox
            figure={allUsers.length}
            label_1={"registered"}
            label_2={"users"}
            background={"#fff"}
          />

          <MetricBox
            figure={premiumUsers.length}
            label_1={"premium"}
            label_2={"users"}
            background={"#fff"}
          />

          <MetricBox
            figure={freeUsers.length}
            label_1={"free"}
            label_2={"users"}
            background={"#fff"}
          />

          <MetricBox
            figure={independentArtistes.length}
            label_1={"independent"}
            label_2={"artistes"}
            background={"#E74C3C"}
            color={"#fff"}
          />

          <MetricBox
            figure={miniLabel.length}
            label_1={"mini"}
            label_2={"labels"}
            background={"#7F64FE"}
            color={"#fff"}
          />

          <MetricBox
            figure={bigLabel.length}
            label_1={"big"}
            label_2={"labels"}
            background={"#7FC6A6"}
            color={"#fff"}
          />

          <MetricBox
            figure={allArtistes.length}
            label_1={""}
            label_2={"artistes"}
            background={"#000"}
            color={"#fff"}
          />

          <MetricBox
            figure={allSongs.length}
            label_1={""}
            label_2={"songs"}
            background={"#000"}
            color={"#fff"}
          />

          <MetricBox
            figure={allAlbums.length}
            label_1={""}
            label_2={"albums"}
            background={"#000"}
            color={"#fff"}
          />
        </div>
        <div className={classes.users_container}>
          <div className={classes.search_bar}>
            <div className={classes.search_container}>
              <input
                className={classes.search_input}
                type="text"
                placeholder="Search"
              />
            </div>
            <p className={classes.button}>Filter</p>
            <p className={classes.button}>Sort</p>
          </div>

          <div className={classes.users_group}>
            <div className={classes.headings_row}>
              <p className={classes.name_heading}>Full name</p>

              <p className={classes.email_heading}>Email address</p>
              <p className={classes.country_heading}>Country</p>
              <p className={classes.earned_heading}>Amount earned</p>
              <p className={classes.action}></p>
            </div>
            {allUsers !== "" &&
              allUsers.length > 0 &&
              allUsers
                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                .map((user, index) => (
                  <div className={classes.users_row} key={index}>
                    <p
                      className={classes.users_name}
                    >{`${user.first_name} ${user.last_name}`}</p>

                    <p className={classes.users_email}>{user.email}</p>
                    <p className={classes.users_country}>{user.country}</p>
                    <p className={classes.users_earned}>
                      {user.earned || "$0.00"}
                    </p>

                    <p
                      onClick={() => {
                        !warning && warnUser(user._id);
                      }}
                      className={classes.warn}
                    >
                      warn({user.warning})
                    </p>
                    <p
                      onClick={() => {
                        !warning && banUser(user._id);
                      }}
                      className={classes.ban}
                    >
                      {user.banned ? "unban" : "ban"}
                    </p>

                    <p className={classes.users_name}>{user.referral_code}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ figure, label_1, label_2, color, background }) {
  return (
    <div style={{ background: background }} className={classes.metric_box_1}>
      <p style={{ color: color }} className={classes.metric_figure}>
        {figure}
      </p>
      <p style={{ color: color }} className={classes.metric_label}>
        {label_1}
        <br />
        {label_2}
      </p>
    </div>
  );
}
