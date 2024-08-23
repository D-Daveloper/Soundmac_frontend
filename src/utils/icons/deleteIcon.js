import classes from "./deleteIcon.module.css";

export default function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={classes.icon}
    >
      <path
        d="M4.99996 15.8333C4.99996 16.2754 5.17555 16.6993 5.48811 17.0118C5.80068 17.3244 6.2246 17.5 6.66663 17.5H13.3333C13.7753 17.5 14.1992 17.3244 14.5118 17.0118C14.8244 16.6993 15 16.2754 15 15.8333V5.83333H4.99996V15.8333ZM6.66663 7.5H13.3333V15.8333H6.66663V7.5ZM12.9166 3.33333L12.0833 2.5H7.91663L7.08329 3.33333H4.16663V5H15.8333V3.33333H12.9166Z"
        fill="#fff"
      />
    </svg>
  );
}
