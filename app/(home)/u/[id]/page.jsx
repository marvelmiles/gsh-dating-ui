"use client";

import EditProfile from "@/components/EditProfile";
import MatchCard from "@/components/Matchs/MatchCard";
import MatchsView from "@/components/Matchs/MatchsView";
import StoriesView from "@/components/Stories/StoriesView";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchParams = useSearchParams();

  const withEdit = (searchParams.get("edit") || "").toLowerCase() === "true";

  const galleryProps = {
    indexIndicator: false,
    dotIndicator: true,
  };

  return withEdit ? (
    <EditProfile cardHeadergalleryProps={galleryProps} />
  ) : (
    <div>
      <StoriesView />
      <MatchCard
        withExternalLink={false}
        contained
        details
        galleryProps={galleryProps}
      />
      <MatchsView
        withPagniation
        orientation="horizontal"
        title="Similar Searches"
      />
    </div>
  );
};

export default page;
