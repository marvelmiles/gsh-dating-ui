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
import { defaultUser } from "@/app/providers/AuthProvider";
import { truncateText } from "@/app/utils/serializers";

export const MatchCardHeader = ({ galleryProps, user = defaultUser }) => {
  return (
    <div className="match-card-header">
      <Button size="icon-lg" className="match-card-badge">
        <BadgeMarkIcon />
      </Button>
      <MatchCardGallery
        {...galleryProps}
        medias={user?.profileCover}
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
          <Typography variant="text">
            {user?.profileCover.slice(0, 4).filter((url) => !!url).length}
          </Typography>
        </div>
        <div className=" flex items-center gap-2 text-white">
          <CirclePlayIcon />
          <Typography variant="text">
            {user.profileCover.slice(4).length}
          </Typography>
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
  user = defaultUser,
}) => {
  const [openMoreServices, setOpenMoreServices] = useState(false);

  const router = useRouter();

  const serviceRows = details
    ? [
        "30 Minutes",
        "1 Hour",
        "2 Hours",
        "3 Hours",
        "6 Hours",
        "12 Hours",
        "24 Hours",
        "48 Hours",
        "Another 24 Hours",
      ]
        .map((text) => [
          text,
          user.bio[`${text}-incall`] || "--",
          user.bio[`${text}-outcall`] || "--",
        ])
        .slice(0, openMoreServices ? undefined : 4)
    : undefined;

  const profileRows = details
    ? [
        [
          {
            content: (
              <div>
                <span>Gender: </span>
                <span>{user.bio.gender || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Age: </span>
                <span>{user.bio.age || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Location: </span>
                <span>
                  {user.bio.city || "--"}/{user.bio.residentCountry || "--"}
                </span>
              </div>
            ),
          },
        ],
        [
          {
            content: (
              <div>
                <span>Hair Colour: </span>
                <span>{user.bio.hairColor || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Hair Length: </span>
                <span>{user.bio.hairLength || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Pubic Hair: </span>
                <span>{user.bio.pubicHair || "--"}</span>
              </div>
            ),
          },
        ],
        [
          {
            content: (
              <div>
                <span>Bust Size: </span>
                <span>{user.bio.breastSize || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Bust type: </span>
                <span>{user.bio.breastType || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Tarvel: </span>
                <span>{user.bio.nationality || "--"}</span>
              </div>
            ),
          },
        ],
      ]
    : undefined;

  return (
    <div
      onClick={() => router.push(`/u/${user.id}`)}
      className={cn(
        `
      match-card layout-${contained ? "contained" : ""}
      `,
        containerClassName
      )}
    >
      <MatchCardHeader user={user} galleryProps={galleryProps} />
      <div className="match-card-body">
        <div className="flex-between">
          <div className="flex items-center gap-2 text-ellipsis min-w-0">
            <Typography className="font-bold text-ellipsis" variant="text">
              {user.bio.fullname}
            </Typography>
          </div>
          <div className="online-indicator">
            <div
              className={`online-indicator-dot ${
                user.isLogin ? "" : "offline"
              }`}
            />
            <Typography>{user.isLogin ? "Online" : "Offline"}</Typography>
          </div>
        </div>
        {user.bio.aboutMe && (
          <Typography className="break-all">
            {truncateText(user.bio.aboutMe, details ? Infinity : undefined)}
          </Typography>
        )}

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
                    <Typography>{user.bio.phone || "--"}</Typography>
                  </div>

                  <div className="flex items-center gap-8">
                    <Typography>Country</Typography>
                    <Typography>{user.bio.residentCountry || "--"}</Typography>
                  </div>

                  <div className="flex items-center gap-8">
                    <Typography>City</Typography>
                    <Typography>{user.bio.city || "--"}</Typography>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {user.bio.facebookID && (
                    <a
                      href={user.bio.facebookID}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative h-[15px] w-[15px] aspect-square">
                        <Image fill alt="" src="/images/fb-icon.png" />
                      </div>
                    </a>
                  )}
                  {user.bio.telgramID && (
                    <a
                      href={user.bio.telegramID}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative h-[15px] w-[15px] aspect-square">
                        <Image fill alt="" src="/images/tg-icon.png" />
                      </div>
                    </a>
                  )}

                  {user.bio.whatsappID && (
                    <a
                      href={user.bio.whatsappID}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative h-[15px] w-[15px] aspect-square">
                        <Image fill alt="" src="/images/wa-icon.png" />
                      </div>
                    </a>
                  )}
                </div>

                {/* <Button variant="outline" className="max-w-fit">
                  Message Tamara
                </Button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
