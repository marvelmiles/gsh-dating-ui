"use client";

import EditProfile from "@/components/EditProfile";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProfilePage from "./ProfilePage";

const page = ({ params }) => {
  const searchParams = useSearchParams();

  const withEdit = (searchParams.get("edit") || "").toLowerCase() === "true";

  const galleryProps = {
    indexIndicator: false,
    dotIndicator: true,
  };

  return withEdit ? (
    <EditProfile cardHeadergalleryProps={galleryProps} />
  ) : (
    <ProfilePage galleryProps={galleryProps} uid={params.userId} />
  );
};

export default page;
