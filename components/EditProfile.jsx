"use client";

import React, { useState } from "react";
import Typography from "./Typography";
import { MatchCardHeader } from "./Matchs/MatchCard";
import { Button } from "./ui/button";
import FormField from "./FormField";
import EditIcon from "./icons/EditIcon";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Dropdown from "./Dropdown";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import MatchsView from "./Matchs/MatchsView";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckIcon, CircleAlertIcon } from "lucide-react";
import FilePicker from "./FilePicker";
import Table from "./Table";

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

  const handleEditCover = () => {
    router.push(
      window.location.search.toLowerCase().replace(`&next=${next}`, "") +
        `&next=${1}`
    );
  };

  const navBtns = (
    <div className="flex-between my-8">
      <Button
        disabled={!next}
        variant="outline"
        className="w-[132px]"
        onClick={handlePrev}
      >
        Previous Page
      </Button>
      <Button disabled={next === 3} className="w-[132px]" onClick={handleNext}>
        Next
      </Button>
    </div>
  );

  const serviceRows = [
    ["30 Minutes", <FormField />, <FormField />],
    ["1 Hour", <FormField />, <FormField />],
    ["2 Hours", <FormField />, <FormField />],
    ["3 Hours", <FormField />, <FormField />],
    ["6 Hours", <FormField />, <FormField />],
    ["12 Hours", <FormField />, <FormField />],
    ["24 Hours", <FormField />, <FormField />],
    ["48 Hours", <FormField />, <FormField />],
    ["Another 24 Hours", <FormField />, <FormField />],
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
            <div className="match-card layout-contained">
              <MatchCardHeader
                galleryProps={{
                  ...cardHeadergalleryProps,
                  indexIndicatorHolder: (
                    <Button onClick={handleEditCover} className="text-white">
                      Edit Cover
                    </Button>
                  ),
                }}
              />
              <div className="match-card-body">
                <div className="flex-between">
                  <div className="flex items-center gap-2">
                    <Typography className="font-bold" variant="text">
                      Tamara, 27
                    </Typography>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-none"
                    >
                      <EditIcon />
                    </Button>
                  </div>
                  <div className="online-indicator">
                    <div className="online-indicator-dot" />
                    <Typography>Online</Typography>
                  </div>
                </div>

                <FormField
                  placeholder="Tell us who you're"
                  as="textarea"
                  containerClassName="max-w-none mt-4"
                  wrapperClassName="w-full"
                  className="h-[100px]"
                />

                <div className="mt-12">
                  <RadioGroup
                    defaultValue="Female"
                    className="flex items-center gap-8"
                  >
                    <RadioGroupItem
                      Icon={CheckIcon}
                      className="border-black-mild text-black-mild"
                      label="Female"
                    />
                    <RadioGroupItem
                      Icon={CheckIcon}
                      className="border-black-mild text-black-mild"
                      label="Male"
                    />
                    <RadioGroupItem
                      Icon={CheckIcon}
                      className="border-black-mild text-black-mild"
                      label="Duo with a Girl"
                    />
                  </RadioGroup>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-8">
                  <FormField label="Age" wrapperClassName="w-full" />
                  <FormField label="Height" wrapperClassName="w-full" />
                  <FormField label="Weight" wrapperClassName="w-full" />
                  <Dropdown label="Ethnicity" triggerClassName="w-full" />
                  <Dropdown label="Hair Colour" triggerClassName="w-full" />
                  <Dropdown label="Hair Length" triggerClassName="w-full" />
                  <Dropdown label="Breast Size" triggerClassName="w-full" />
                  <Dropdown label="Breast Type" triggerClassName="w-full" />
                  <FormField label="Nationality" wrapperClassName="w-full" />
                  <Dropdown label="Travel" triggerClassName="w-full" />
                  <Dropdown label="Language" triggerClassName="w-full" />
                  <Dropdown label="Tatoo" triggerClassName="w-full" />
                  <Dropdown label="Piercing" triggerClassName="w-full" />
                  <Dropdown label="Smoking" triggerClassName="w-full" />
                  <Dropdown label="Eye Colour" triggerClassName="w-full" />
                  <Dropdown label="Pubic Hair" triggerClassName="w-full" />
                  <Dropdown
                    label="Are you a Porn star"
                    triggerClassName="w-full"
                  />
                  <Dropdown label="Meeting with" triggerClassName="w-full" />
                  <FormField label="Phone Contact" wrapperClassName="w-full" />
                  <FormField label="Country" wrapperClassName="w-full" />
                  <FormField label="City" wrapperClassName="w-full" />
                </div>

                <div className="my-4 flex flex-col gap-4">
                  <Typography>Social Media</Typography>
                  <div className="flex items-center gap-8">
                    <Checkbox
                      id="fb"
                      label={
                        <div className="relative aspect-square w-[15px] h-[15px]">
                          <Image fill alt="" src="/images/fb-icon.png" />
                        </div>
                      }
                    />
                    <Checkbox
                      id="tg"
                      label={
                        <div className="relative aspect-square w-[15px] h-[15px]">
                          <Image fill alt="" src="/images/tg-icon.png" />
                        </div>
                      }
                    />

                    <Checkbox
                      id="wa"
                      label={
                        <div className="relative aspect-square w-[15px] h-[15px]">
                          <Image fill alt="" src="/images/wa-icon.png" />
                        </div>
                      }
                    />
                  </div>
                  <FormField label="Telegram ID" />
                </div>

                {navBtns}
              </div>
            </div>
          ),
          1: (
            <div>
              <Typography variant="h3" className="mb-8 text-center">
                Upload Your Picture (4 Pictures required)
              </Typography>

              <div className="grid grid-cols-4 gap-2 gap-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <FilePicker key={i} />
                ))}
              </div>
              {navBtns}
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

              {navBtns}
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
                {navBtns}
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
