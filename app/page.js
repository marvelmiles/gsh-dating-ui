import MatchsView from "@/components/Matchs/MatchsView";
import StoriesView from "@/components/Stories/StoriesView";
import React from "react";

const page = () => {
  return (
    <div className="contained">
      <StoriesView />
      <MatchsView />
    </div>
  );
};

export default page;
