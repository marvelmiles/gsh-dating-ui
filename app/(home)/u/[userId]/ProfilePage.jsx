import { defaultUser, useAuth } from "@/app/providers/AuthProvider";
import Loading from "@/components/Loading";
import MatchCard from "@/components/Matchs/MatchCard";
import MatchsView from "@/components/Matchs/MatchsView";
import StoriesView from "@/components/Stories/StoriesView";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeLayout from "../../HomeLayout";
import Redirect from "@/components/Redirect";
import Typography from "@/components/Typography";

const ProfilePage = ({ galleryProps, uid, withPreview }) => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const redirect =
    currentUser.rendered && withPreview && currentUser.id !== uid;

  useEffect(() => {
    (async () => {
      if (redirect) return;
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
  }, [uid, redirect]);

  if (redirect) return <Redirect to={`/u/${uid}`} />;

  if (loading || !currentUser.rendered) return <Loading fullScreen />;

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
      {withPreview ? (
        <div className="mt-[80px]">
          <Typography
            variant="h3"
            className="font-bold mb-5 font-garamond text-center"
          >
            Your Profile Card
          </Typography>
          <MatchCard mini user={currentUser} />
        </div>
      ) : (
        <MatchsView
          searchUid={uid}
          withPagniation
          orientation="horizontal"
          title="Similar Searches"
        />
      )}
    </HomeLayout>
  );
};

export default ProfilePage;
