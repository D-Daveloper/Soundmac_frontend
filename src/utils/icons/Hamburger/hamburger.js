import classes from "../icons.module.css";

export default function HamburgerIcon({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      className={classes.icon}
    >
      <path
        opacity="0.5"
        d="M17.4998 32.0834C10.6253 32.0834 7.18796 32.0834 5.0515 29.947C2.9165 27.8134 2.9165 24.3747 2.9165 17.5001C2.9165 10.6255 2.9165 7.18821 5.0515 5.05175C7.18942 2.91675 10.6253 2.91675 17.4998 2.91675C24.3744 2.91675 27.8117 2.91675 29.9467 5.05175C32.0832 7.18966 32.0832 10.6255 32.0832 17.5001C32.0832 24.3747 32.0832 27.812 29.9467 29.947C27.8132 32.0834 24.3744 32.0834 17.4998 32.0834Z"
        fill={fill}
      />
      <path
        d="M27.3438 11.6667C27.3438 11.9568 27.2285 12.235 27.0234 12.4401C26.8183 12.6453 26.5401 12.7605 26.25 12.7605H8.75C8.45992 12.7605 8.18172 12.6453 7.9766 12.4401C7.77148 12.235 7.65625 11.9568 7.65625 11.6667C7.65625 11.3767 7.77148 11.0985 7.9766 10.8933C8.18172 10.6882 8.45992 10.573 8.75 10.573H26.25C26.5401 10.573 26.8183 10.6882 27.0234 10.8933C27.2285 11.0985 27.3438 11.3767 27.3438 11.6667ZM27.3438 17.5001C27.3438 17.7902 27.2285 18.0684 27.0234 18.2735C26.8183 18.4786 26.5401 18.5938 26.25 18.5938H8.75C8.45992 18.5938 8.18172 18.4786 7.9766 18.2735C7.77148 18.0684 7.65625 17.7902 7.65625 17.5001C7.65625 17.21 7.77148 16.9318 7.9766 16.7267C8.18172 16.5216 8.45992 16.4063 8.75 16.4063H26.25C26.5401 16.4063 26.8183 16.5216 27.0234 16.7267C27.2285 16.9318 27.3438 17.21 27.3438 17.5001ZM27.3438 23.3334C27.3438 23.6235 27.2285 23.9017 27.0234 24.1068C26.8183 24.3119 26.5401 24.4272 26.25 24.4272H8.75C8.45992 24.4272 8.18172 24.3119 7.9766 24.1068C7.77148 23.9017 7.65625 23.6235 7.65625 23.3334C7.65625 23.0433 7.77148 22.7651 7.9766 22.56C8.18172 22.3549 8.45992 22.2397 8.75 22.2397H26.25C26.5401 22.2397 26.8183 22.3549 27.0234 22.56C27.2285 22.7651 27.3438 23.0433 27.3438 23.3334Z"
        fill={fill}
      />
    </svg>
  );
}
