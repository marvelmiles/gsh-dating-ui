"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Typography from "../Typography";
import GalleryImageIcon from "../icons/GalleryImageIcon";
import CirclePlayIcon from "../icons/CirclePlayIcon";
import BadgeMarkIcon from "../icons/BadgeMarkIcon";
import MatchCardGallery from "../MatchCardGallery";
import Table from "../Table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const MatchCardHeader = ({ galleryProps }) => {
  return (
    <div className="match-card-header">
      <Button size="icon-lg" className="match-card-badge">
        <BadgeMarkIcon />
      </Button>
      <MatchCardGallery
        {...galleryProps}
        carouselContent={"match-card-header"}
      />
      <div
        className="
  absolute left-[15px] bottom-[20px] z-[2]
  text-white bg-transparent hover:bg-transparent
  flex items-center gap-2
  "
      >
        <div className=" flex items-center gap-2 text-white">
          <GalleryImageIcon />
          <Typography variant="text"> 4</Typography>
        </div>
        <div className=" flex items-center gap-2 text-white">
          <CirclePlayIcon />
          <Typography variant="text">4</Typography>
        </div>
      </div>
    </div>
  );
};

const MatchCard = ({
  contained = false,
  galleryProps,
  details = false,
  containerClassName = "",
}) => {
  const [openMoreServices, setOpenMoreServices] = useState(false);

  const router = useRouter();

  const serviceRows = details
    ? [
        [
          "30 Minutes",
          {
            content: <span>$50</span>,
          },
          {
            content: <span>$75</span>,
          },
        ],

        [
          "1 hour",
          {
            content: <span>$80</span>,
          },
          {
            content: <span>$100</span>,
          },
        ],

        [
          "2 Hours",
          {
            content: <span>$120</span>,
          },
          {
            content: <span>$140</span>,
          },
        ],
        [
          "2 Hours",
          {
            content: <span>$120</span>,
          },
          {
            content: <span>$140</span>,
          },
        ],
        [
          "30 Minutes",
          {
            content: <span>$50</span>,
          },
          {
            content: <span>$75</span>,
          },
        ],

        [
          "1 hour",
          {
            content: <span>$80</span>,
          },
          {
            content: <span>$100</span>,
          },
        ],

        [
          "2 Hours",
          {
            content: <span>$120</span>,
          },
          {
            content: <span>$140</span>,
          },
        ],
        [
          "2 Hours",
          {
            content: <span>$120</span>,
          },
          {
            content: <span>$140</span>,
          },
        ],
      ].slice(0, openMoreServices ? undefined : 4)
    : undefined;

  const profileRows = details
    ? [
        [
          {
            content: (
              <div>
                <span>Gender: </span>
                <span>Female</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Age: </span>
                <span>27</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Location: </span>
                <span>Paris/France</span>
              </div>
            ),
          },
        ],
        [
          {
            content: (
              <div>
                <span>Hair Colour: </span>
                <span>Brown</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Hair Length: </span>
                <span>Medium Long</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Pubic Hair: </span>
                <span>Shaved</span>
              </div>
            ),
          },
        ],
        [
          {
            content: (
              <div>
                <span>Bust Size: </span>
                <span>0</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Bust type: </span>
                <span>Natural</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Tarvel: </span>
                <span>Europe</span>
              </div>
            ),
          },
        ],
      ]
    : undefined;

  return (
    <div
      onClick={() => router.push("/u/1")}
      className={cn(
        `
      match-card layout-${contained ? "contained" : ""}
      `,
        containerClassName
      )}
    >
      <MatchCardHeader galleryProps={galleryProps} />
      <div className="match-card-body">
        <div className="flex-between">
          <div className="flex items-center gap-2">
            <Typography className="font-bold" variant="text">
              Tamara, 27
            </Typography>
          </div>
          <div className="online-indicator">
            <div className="online-indicator-dot" />
            <Typography>Online</Typography>
          </div>
        </div>
        <Typography>
          Well I consider myself a hard-working and very independent woman,
          lover girl and ever loving partner. If you belive you’re a match with
          my personality and you can be mine, kindly inbox me.
        </Typography>

        {details && (
          <div className="my-8">
            <div>
              <Table
                containerClassName="border"
                tdClassName="hover:bg-transparent"
                heads={[
                  "Duration Of Services",
                  "Incall Rates",
                  "Outcall Rates",
                ]}
                rows={serviceRows}
              />
              <Button
                variant="link"
                onClick={() => setOpenMoreServices(!openMoreServices)}
                className="ml-auto"
              >
                {openMoreServices ? "View Less" : " View More"}
              </Button>
            </div>

            <div className="my-8 flex flex-col gap-4">
              <Typography variant="text" className="font-bold">
                Profile
              </Typography>

              <Table
                cellClassName="border"
                tdClassName="hover:bg-transparent"
                rows={profileRows}
              />
            </div>

            <div className="my-8 flex flex-col gap-4">
              <Typography variant="text" className="font-bold">
                Contact
              </Typography>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-8">
                    <Typography>Cell Phone</Typography>
                    <Typography>+33 567 876 9874 148</Typography>
                  </div>

                  <div className="flex items-center gap-8">
                    <Typography>Country</Typography>
                    <Typography>France</Typography>
                  </div>

                  <div className="flex items-center gap-8">
                    <Typography>City</Typography>
                    <Typography>Paris</Typography>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative h-[15px] w-[15px] aspect-square">
                    <Image fill alt="" src="/images/fb-icon.png" />
                  </div>
                  <div className="relative h-[15px] w-[15px] aspect-square">
                    <Image fill alt="" src="/images/tg-icon.png" />
                  </div>
                  <div className="relative h-[15px] w-[15px] aspect-square">
                    <Image fill alt="" src="/images/wa-icon.png" />
                  </div>
                </div>

                <Button variant="outline" className="max-w-fit">
                  Message Tamara
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
