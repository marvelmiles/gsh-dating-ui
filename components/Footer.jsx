import React from "react";
import BrandImage from "./BrandImage";
import Typography from "./Typography";

const Footer = () => {
  return (
    <div className="bg-black-mild">
      <div className="contained flex-between">
        <BrandImage textClassName="text-white" />
        <div className="flex-1">
          <Typography className="font-garamond text-center text-white">
            &nbsp; all copyright reserved {new Date().getFullYear()}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
