import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const HomeLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <div></div>

      <div className="w-full">
        <Header />
        <main
          style={{
            minHeight: "calc(100% - 152px)",
          }}
          className="mt-[68px] contained"
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
