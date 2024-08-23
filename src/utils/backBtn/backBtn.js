import { BiArrowBack } from "react-icons/bi";
import classes from "./backBtn.module.css";
import { useNavigate } from "react-router-dom";

function Back({ title, route, show_arrow }) {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      {show_arrow && (
        <div
          onClick={() => {
            navigate(route);
          }}
          className={classes.arrow_container}
        >
          {" "}
          <BiArrowBack className={classes.arrow} />
        </div>
      )}

      <p className={classes.title}>{title}</p>
    </div>
  );
}

export default Back;
