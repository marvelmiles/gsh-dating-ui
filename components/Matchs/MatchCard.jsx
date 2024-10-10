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
import { getMediaMainCover } from "@/app/utils/media";
import { formatToCurrency } from "@/app/utils";

export const MatchCardHeader = ({
  galleryProps,
  profileCover = [],
  mainCoverOnly = false,
}) => {
  return (
    <div className="match-card-header">
      <div
        className="
      absolute top-0 left-0 w-full bg-contrast z-[2] p-3
      "
      >
        <Button size="icon-lg" className="match-card-badge">
          <BadgeMarkIcon />
        </Button>
      </div>
      <MatchCardGallery
        {...galleryProps}
        medias={mainCoverOnly ? getMediaMainCover(profileCover) : profileCover}
        carouselContent={"match-card-header"}
      />
      <div
        className="
  absolute left-[15px] bottom-[20px] z-[2]
  text-white bg-contrast flex items-center gap-2
  "
      >
        <div className=" flex items-center gap-2">
          <GalleryImageIcon />
          <Typography variant="text">
            {profileCover.slice(0, 4).filter((url) => !!url).length}
          </Typography>
        </div>
        <div className=" flex items-center gap-2">
          <CirclePlayIcon />
          <Typography variant="text">{profileCover.slice(4).length}</Typography>
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
  mainCoverOnly = true,
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
          user.bio[`${text}-incall`]
            ? formatToCurrency(user.bio[`${text}-incall`])
            : "--",
          user.bio[`${text}-outcall`]
            ? formatToCurrency(user.bio[`${text}-outcall`])
            : "--",
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
                <span>Height: </span>
                <span>{user.bio.height || "--"}ft</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Weight: </span>
                <span>{user.bio.weight || "--"} pounds</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Ethnicity: </span>
                <span>{user.bio.ethnicity || "--"}</span>
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
                <span>Interested In: </span>
                <span>{user.bio.interestedIn || "--"}</span>
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
                <span>Nationality: </span>
                <span>{user.bio.nationality || "--"}</span>
              </div>
            ),
          },
        ],
        [
          {
            content: (
              <div>
                <span>Travel: </span>
                <span>{user.bio.travel || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Piercing: </span>
                <span>{user.bio.piercing || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Smoking: </span>
                <span>{user.bio.smoking || "--"}</span>
              </div>
            ),
          },
        ],
        [
          {
            content: (
              <div>
                <span>Eye Colour: </span>
                <span>{user.bio.eyeColor || "--"}</span>
              </div>
            ),
          },
          {
            content: (
              <div>
                <span>Porn Star: </span>
                <span>{user.bio.pornStar || "--"}</span>
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
      ]
    : undefined;

  return (
    <div
      onClick={details ? undefined : () => router.push(`/u/${user.id}`)}
      className={cn(
        `
      match-card layout-${contained ? "contained" : ""}
      `,
        containerClassName
      )}
    >
      <MatchCardHeader
        mainCoverOnly={mainCoverOnly}
        profileCover={user.profileCover}
        galleryProps={galleryProps}
      />
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
                  {user.bio.telegramID && (
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
