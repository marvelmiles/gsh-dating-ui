import MatchsView from "@/components/Matchs/MatchsView";
import StoriesView from "@/components/Stories/StoriesView";
import React from "react";
import HomeLayout from "./HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <StoriesView />
      <MatchsView />
    </HomeLayout>
  );
};

export default HomePage;
