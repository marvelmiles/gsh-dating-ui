"use client";

import React from "react";
import MatchsView from "@/components/Matchs/MatchsView";
import { withAuth } from "@/app/providers/AuthProvider";
import HomeLayout from "../HomeLayout";

const page = () => {
  return (
    <HomeLayout>
      <MatchsView />
    </HomeLayout>
  );
};

export default withAuth(page);
