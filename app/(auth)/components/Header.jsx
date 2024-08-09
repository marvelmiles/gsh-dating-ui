import BrandImage from "@/components/BrandImage";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 z-[2]">
      <div className="flex-between contained">
        <BrandImage />
      </div>
    </div>
  );
};

export default Header;
