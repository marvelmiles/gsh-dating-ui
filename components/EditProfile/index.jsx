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
import { cacheData, getCacheData } from "@/lib/storage";
import { EDIT_ACCESS_MSG } from "@/app/config/constants";
import Alert from "../Alert";

const EditProfile = ({ cardHeadergalleryProps }) => {
  const {
    currentUser: { id: cid, isTestUser },
    withEditAccess,
  } = useAuth();

  const searchParams = useSearchParams();

  const next = Number((searchParams.get("next") || "").toLowerCase()) || 0;

  const router = useRouter();

  const alertLeaving = (cb) => {
    const data = getCacheData("session");

    if (data.hideProfileNextSave) return cb();
    else {
      alert("Please save any changes before leaving this page.");
      cacheData("session", { hideProfileNextSave: true });
    }
  };

  const handlePrev = () =>
    alertLeaving(() =>
      router.push(
        window.location.search.toLowerCase().replace(`&next=${next}`, "") +
          `&next=${next - 1}`
      )
    );

  const handleNext = () =>
    alertLeaving(() =>
      router.push(
        window.location.search.toLowerCase().replace(`&next=${next}`, "") +
          `&next=${next + 1}`
      )
    );

  const renderActionBtns = (handleSave, isSubmitting) => {
    const btnClassName = "w-full md:w-[125px]";

    const containerClassName = "flex-between justify-start w-full md:w-auto";

    return (
      <div className="flex-between my-8 items-start flex-col md:flex-row">
        <div className={containerClassName}>
          <Button
            disabled={!next || isSubmitting}
            variant="outline"
            className={btnClassName}
            onClick={handlePrev}
          >
            Previous Page
          </Button>
          <Button
            disabled={isSubmitting}
            className={`${btnClassName} bg-muted hover:bg-border`}
            as={Link}
            href={`/u/${cid}?preview=true`}
            target="_blank"
          >
            Preview
          </Button>
        </div>
        <div className={containerClassName}>
          <Button
            loading={isSubmitting}
            className={btnClassName}
            onClick={() => withEditAccess(handleSave)}
          >
            Save
          </Button>
          <Button
            disabled={next === 3 || isSubmitting}
            className={`${btnClassName} bg-muted hover:bg-border`}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  return (
    <HomeLayout className="">
      <div className="mb-12">
        <Typography variant="h3">Edit Profile page</Typography>

        <Typography variant="caption">Add your Profile</Typography>
        {isTestUser ? <Alert className="mt-4">{EDIT_ACCESS_MSG}</Alert> : null}
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
