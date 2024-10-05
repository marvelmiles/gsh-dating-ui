import React from "react";
import { PulseLoader } from "react-spinners";

const Loading = ({ fullScreen = false }) => {
  const content = <PulseLoader color="#000" size={10} />;
  return fullScreen ? (
    <div
      className="
    flex items-center justify-center
    h-screen w-full
    "
    >
      {content}
    </div>
  ) : (
    <div className="flex-center">{content}</div>
  );
};

export default Loading;
