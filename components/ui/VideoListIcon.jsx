import { cn } from "@/lib/utils";
import React from "react";

const VideoListIcon = ({ size = 25, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M87.4993 31.666V84.9993C87.4993 86.3802 86.3802 87.4993 84.9993 87.4993H31.666C30.2853 87.4993 29.166 86.3802 29.166 84.9993V31.666C29.166 30.2853 30.2853 29.166 31.666 29.166H84.9993C86.3802 29.166 87.4993 30.2853 87.4993 31.666Z"
        className={cn("stroke-current", color)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74.9993 16.666H19.166C17.7853 16.666 16.666 17.7853 16.666 19.166V74.9993"
        className={cn("stroke-current", color)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53.7862 48.1042C52.12 47.1046 50 48.3046 50 50.2479V66.4171C50 68.3604 52.12 69.5604 53.7862 68.5609L67.2604 60.4763C68.8787 59.5054 68.8787 57.1596 67.2604 56.1888L53.7862 48.1042Z"
        className={cn("stroke-current", color)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VideoListIcon;
