import BrandImage from "@/components/BrandImage";
import React from "react";

const Header = ({ pageElement }) => {
  return (
    <div className="w-full top-0 left-0 z-[2]">
      <div className="flex-between contained">
        <BrandImage />
        {pageElement}
      </div>
    </div>
  );
};

export default Header;
