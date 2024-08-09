import Image from "next/image";
import React from "react";
import Typography from "./Typography";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BrandImage = ({ withLink = true, textClassName = "" }) => {
  const content = (
    <div className="flex items-center gap-0 relative aspect-auto">
      <Image
        width={50}
        height={50}
        className="relative top-[3px]"
        alt=""
        src="/images/brand-image.png"
      />
      <Typography variant="h5" className={cn("font-garamond", textClassName)}>
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
