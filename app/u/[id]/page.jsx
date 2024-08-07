import MatchCard from "@/components/Matchs/MatchCard";
import StoriesView from "@/components/Stories/StoriesView";
import React from "react";

const page = () => {
  return (
    <div>
      <StoriesView />
      <MatchCard
        contained
        details
        galleryProps={{
          indexIndicator: false,
          dotIndicator: true,
        }}
      />
    </div>
  );
};

export default page;
