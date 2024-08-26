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
          "bio=residentCountry gender hairColor age location hairLength breastSize breastType country city"
        }
      />
    </HomeLayout>
  );
};

export default withAuth(page);
