import Image from "next/image";
import React from "react";
import Typography from "./Typography";
import Link from "next/link";

const BrandImage = ({ withLink = true }) => {
  const content = (
    <div className="flex items-center gap-0 relative aspect-auto">
      <Image
        width={50}
        height={50}
        className="relative top-[2px]"
        alt=""
        src="/images/brand-image.png"
      />
      <Typography variant="text" className="font-garamond">
        {" "}
        Soulmater
      </Typography>
    </div>
  );

  return withLink ? (
    <Link href="/" className="hover:no-underline">
      {content}
    </Link>
  ) : (
    content
  );
};

export default BrandImage;
