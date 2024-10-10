import { defaultUser } from "@/app/providers/AuthProvider";
import Loading from "@/components/Loading";
import MatchCard from "@/components/Matchs/MatchCard";
import MatchsView from "@/components/Matchs/MatchsView";
import StoriesView from "@/components/Stories/StoriesView";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeLayout from "../../HomeLayout";

const ProfilePage = ({ galleryProps, uid }) => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/users/${uid}`);

        if (!res.success) throw res;

        setUser(res.data);

        setLoading(false);
      } catch (err) {
        toast(err.message);
      }
    })();
  }, [uid]);

  if (loading) return <Loading fullScreen />;

  return (
    <HomeLayout>
      <StoriesView />
      <MatchCard
        mainCoverOnly={false}
        withExternalLink={false}
        contained
        details
        galleryProps={galleryProps}
        user={user}
      />
      <MatchsView
        searchUid={uid}
        withPagniation
        orientation="horizontal"
        title="Similar Searches"
      />
    </HomeLayout>
  );
};

export default ProfilePage;
