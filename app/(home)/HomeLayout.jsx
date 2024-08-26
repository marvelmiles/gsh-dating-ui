import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const HomeLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <div></div>

      <div className="w-full flex flex-col">
        <Header />
        <main className="mt-[68px] flex-1 contained">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
