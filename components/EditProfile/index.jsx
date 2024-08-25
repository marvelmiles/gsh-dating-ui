"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import HomeLayout from "@/app/(home)/HomeLayout";
import EditUserBiodata from "./EditUserBiodata";
import UploadProfileCover from "./UploadProfileCover";
import UploadProfileVideo from "./UploadProfileVideo";
import EditCallRates from "./EditCallRates";
import MatchsView from "../Matchs/MatchsView";
import { useAuth, withAuth } from "@/app/providers/AuthProvider";
import Typography from "../Typography";
import Link from "next/link";

const EditProfile = ({ cardHeadergalleryProps }) => {
  const {
    currentUser: { id: cid },
  } = useAuth();

  const searchParams = useSearchParams();

  const next = Number((searchParams.get("next") || "").toLowerCase()) || 0;

  const router = useRouter();

  const handlePrev = () => {
    router.push(
      window.location.search.toLowerCase().replace(`&next=${next}`, "") +
        `&next=${next - 1}`
    );
  };

  const handleNext = () => {
    router.push(
      window.location.search.toLowerCase().replace(`&next=${next}`, "") +
        `&next=${next + 1}`
    );
  };

  const renderActionBtns = (handleSave, isSubmitting) => (
    <div className="flex-between my-8">
      <div className="flex-between">
        <Button
          disabled={!next || isSubmitting}
          variant="outline"
          className="w-[132px]"
          onClick={handlePrev}
        >
          Previous Page
        </Button>
        <Button
          disabled={isSubmitting}
          className="w-[132px] bg-muted hover:bg-border"
          as={Link}
          href={`/u/${cid}?preview=true`}
          target="_blank"
        >
          Preview
        </Button>
      </div>
      <div className="flex-between">
        <Button
          disabled={isSubmitting}
          className="w-[132px]"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          disabled={next === 3 || isSubmitting}
          className="w-[132px] bg-muted hover:bg-border"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <HomeLayout className="">
      <div className="mb-12">
        <Typography variant="h3">Edit Profile page</Typography>

        <Typography variant="caption">Add your Profile</Typography>
      </div>
      {
        {
          0: (
            <EditUserBiodata
              cardHeadergalleryProps={cardHeadergalleryProps}
              renderActionBtns={renderActionBtns}
            />
          ),
          1: <UploadProfileCover renderActionBtns={renderActionBtns} />,
          2: <UploadProfileVideo renderActionBtns={renderActionBtns} />,
          3: <EditCallRates renderActionBtns={renderActionBtns} />,
        }[next]
      }

      <MatchsView
        type="similar"
        withPagniation
        orientation="horizontal"
        title="Similar Searches"
      />
    </HomeLayout>
  );
};

export default withAuth(EditProfile);
