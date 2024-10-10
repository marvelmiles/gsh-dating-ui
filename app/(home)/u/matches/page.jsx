"use client";

import React from "react";
import HomeLayout from "../../HomeLayout";
import MatchsView from "@/components/Matchs/MatchsView";
import { withAuth } from "@/app/providers/AuthProvider";

const page = ({ auth: { currentUser } }) => {
  return (
    <HomeLayout>
      <MatchsView
        filterParams={{
          residentCountry: currentUser.bio.residentCountry,
        }}
      />
    </HomeLayout>
  );
};

export default withAuth(page);
