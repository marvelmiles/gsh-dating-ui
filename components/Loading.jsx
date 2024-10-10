import React from "react";
import { PulseLoader } from "react-spinners";
import Typography from "./Typography";

const Loading = ({ fullScreen = false, message = "" }) => {
  const content = (
    <div className="flex-center flex-col gap-4">
      <PulseLoader color="#000" size={10} />
      {message ? <Typography>{message}</Typography> : null}
    </div>
  );
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
