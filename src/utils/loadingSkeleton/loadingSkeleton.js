import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classes from "./loadingSkeleton.module.css";
import { useEffect, useState } from "react";

export default function LoadingSkeleton() {
  const [text, setText] = useState("");

  useEffect(() => {
    const changeText = (val) => {
      setText(val);
    };

    setTimeout(() => {
      changeText(
        "This is taking longer than expected, but don't fret we gat you covered!"
      );
    }, 12000);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <Skeleton className={classes.hero_container} />
      </div>{" "}
      <p className={classes.text}>{text}</p>
    </div>
  );
}
