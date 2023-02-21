import React from "react";

function ChevronRight(props) {
  return (
    <svg
      viewBox="0 0 320 512"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="icon icon-tabler icon-tabler-alert-circle-filled"
    >
      <path
        fill="currentColor"
        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
      ></path>
    </svg>
  );
}

export default ChevronRight;
