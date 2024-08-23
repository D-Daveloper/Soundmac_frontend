import classes from "./loaderBall.module.css";

function LoaderBall() {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
    </div>
  );
}

export default LoaderBall;
