import React from "react";

const Loading = ({ fullScreen = false }) => {
  const content = <span>Loading...</span>;
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
    content
  );
};

export default Loading;
