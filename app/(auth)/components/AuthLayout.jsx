import Image from "next/image";
import React from "react";
import Header from "./Header";

const AuthLayout = ({ children, pageElement }) => {
  return (
    <div className="flex h-screen w-full">
      <div
        className="
    fixed aspect-auto top-0 left-0 w-full h-screen
    "
      >
        <Image fill alt="" src="/images/auth-bg-image.jpeg" />
      </div>

      <div className="w-full z-[2]">
        <Header pageElement={pageElement} />
        <main
          style={{
            minHeight: "calc(100% - 152px)",
          }}
          className="mt-[85px] contained flex-center"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
