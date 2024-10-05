"use client";

import React from "react";
import MatchsView from "@/components/Matchs/MatchsView";
import { useAuth, withAuth } from "@/app/providers/AuthProvider";
import HomeLayout from "../HomeLayout";

const page = () => {
  const {
    currentUser: { search },
  } = useAuth();

  return (
    <HomeLayout>
      <MatchsView
        query={search}
        searchParam={
          search
            ? "bio=residentCountry gender hairColor age location hairLength breastSize breastType country city&mandatory[q]=true"
            : ""
        }
      />
    </HomeLayout>
  );
};

export default withAuth(page);
