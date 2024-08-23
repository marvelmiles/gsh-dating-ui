"use client";

import React from "react";
import Typography from "./Typography";
import { Button } from "./ui/button";
import FormField from "./FormField";
import Dropdown from "./Dropdown";
import MatchsView from "./Matchs/MatchsView";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlertIcon } from "lucide-react";
import FilePicker from "./FilePicker";
import Table from "./Table";
import EditUserBiodata from "./EditProfile/EditUserBiodata";

const EditProfile = ({ cardHeadergalleryProps }) => {
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
      <Button
        disabled={!next || isSubmitting}
        variant="outline"
        className="w-[132px]"
        onClick={handlePrev}
      >
        Previous Page
      </Button>
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

  const serviceRows = [
    ["30 Minutes", <FormField key={1} />, <FormField key={2} />],
    ["1 Hour", <FormField key={3} />, <FormField key={4} />],
    ["2 Hours", <FormField key={5} />, <FormField key={6} />],
    ["3 Hours", <FormField key={7} />, <FormField key={8} />],
    ["6 Hours", <FormField key={9} />, <FormField key={10} />],
    ["12 Hours", <FormField key={11} />, <FormField key={12} />],
    ["24 Hours", <FormField key={13} />, <FormField key={14} />],
    ["48 Hours", <FormField key={15} />, <FormField key={16} />],
    ["Another 24 Hours", <FormField key={17} />, <FormField key={18} />],
  ];

  return (
    <div className="">
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
          1: (
            <div>
              <Typography variant="h3" className="mb-8 text-center">
                Upload Your Picture (4 Pictures required)
              </Typography>

              <div
                className="
              grid grid-cols-1 gap-4 sm:grid-cols-2 
              md:grid-cols-3 lg:grid-cols-4
              "
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <FilePicker containerClassName="w-full" key={i} />
                ))}
              </div>
              {renderActionBtns}
            </div>
          ),
          2: (
            <div>
              <Typography as="div" className="border p-4">
                <div>
                  <CircleAlertIcon
                    size={25}
                    className="text-white fill-primary"
                  />
                </div>
                <div>
                  To increase the credibility and visibility of your profile, we
                  strongly recommend to upload your video. The video will be
                  displayed on your profile and video listing page. Visitors
                  love to filter escorts based on video. If you don´t add video
                  visitors won´t be able to find you!!!
                </div>
              </Typography>

              <div className="p-4">
                <Typography variant="h3" className="my-8 text-center">
                  Upload a Nice Video Of You
                </Typography>

                <FilePicker isVideo containerClassName="mx-auto" />

                <ul className="mt-8 list-disc">
                  <li>Accepted video formats: .mkv, .mp4, .mov </li>
                  <li>Maximum video size 100Mb</li>
                  <li>Maximum video length is 5 minutes</li>
                  <li>Minimum video length is 10 seconds</li>
                </ul>
              </div>

              {renderActionBtns}
            </div>
          ),
          3: (
            <div>
              <Typography as="div" className="border p-4">
                <div>
                  <CircleAlertIcon
                    size={25}
                    className="text-white fill-primary"
                  />
                </div>
                <div>
                  To increase the credibility and visibility of your profile, we
                  strongly recommend to add rates. Rates appear in the filters
                  on the main page and other important pages. Visitors love to
                  filter escorts based on rates. If you don’t add rates visitors
                  won’t be able to find you!!!
                </div>
              </Typography>

              <div className="my-8">
                <Dropdown
                  label="Currency"
                  items={["Eur"]}
                  triggerClassName="w-full max-w-[500px]"
                />
                <Table
                  className="my-8 border"
                  tdClassName="hover:bg-transparent"
                  heads={[
                    "Duration Of Services",
                    "Incall Rates",
                    "Outcall Rates",
                  ]}
                  rows={serviceRows}
                />
                {renderActionBtns}
              </div>
            </div>
          ),
        }[next]
      }

      <MatchsView
        withPagniation
        orientation="horizontal"
        title="Similar Searches"
      />
    </div>
  );
};

export default EditProfile;
