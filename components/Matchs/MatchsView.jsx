"use client";

import React, { useState } from "react";
import MatchCard from "./MatchCard";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Dropdown from "../Dropdown";
import FormField from "../FormField";
import Typography from "../Typography";
import { cn } from "@/lib/utils";
import useScreen from "@/app/hooks/useScreen";

const MatchsView = ({
  withPagniation = false,
  orientation = "vertical",
  title,
  containerClassName,
}) => {
  const [matches, setMatches] = useState(Array.from({ length: 10 }));

  const { isScreen } = useScreen({ screen: 1024 });

  const handleApplyFilter = () => {};

  const renderFilterBtns = () => {
    const contClass = "w-[46%] sm:w-[120px] lg:w-auto lg:items-center";

    return (
      <div
        className={`
      flex flex-wrap gap-x-4 gap-y-2 my-4 sm:items-center 
      sm:gap-y-6
      `}
      >
        <Dropdown
          orientation={isScreen ? "horizontal" : undefined}
          label="Gender"
          items={["Man", "Woman"]}
          containerClassName={contClass}
        />
        <FormField
          type="number"
          label="Age"
          orientation={isScreen ? "horizontal" : undefined}
          containerClassName={contClass}
          className="py-3"
        />
        <FormField
          label="Country of Residence"
          orientation={isScreen ? "horizontal" : undefined}
          containerClassName={`${contClass} w-full sm:w-auto`}
          className="py-3"
        />
        <div
          className="
          mt-3 sm:mt-0 w-full lg:w-auto
          "
        >
          <Button
            size="default-min"
            onClick={handleApplyFilter}
            // className="ml-auto"
          >
            Filter
          </Button>
        </div>
      </div>
    );
  };

  const galleryProps = { medias: [1] };

  const gridClass = `
  grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  xl:grid-cols-4
  `;

  return (
    <div
      className={cn(
        `w-full flex flex-col gap-4 ${title ? "mt-[80px]" : ""}`,
        containerClassName
      )}
    >
      {!withPagniation && renderFilterBtns()}

      {title && (
        <Typography
          variant="h3"
          className="font-bold mb-5 font-garamond text-center"
        >
          {title}
        </Typography>
      )}
      {orientation === "horizontal" ? (
        <div className={gridClass}>
          {matches.slice(0, 4).map((_, i) => (
            <MatchCard
              galleryProps={{
                ...galleryProps,
                medias: [1],
              }}
              key={i}
            />
          ))}
        </div>
      ) : (
        <div className={gridClass}>
          {matches.map((_, i) => (
            <MatchCard galleryProps={galleryProps} key={i} />
          ))}
        </div>
      )}

      {withPagniation && (
        <div className="my-12 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon-xl"
              className="hover:bg-muted/50"
              disabled
            >
              <ChevronLeftIcon />
            </Button>
            <Typography variant="text">1</Typography>
            <Button
              variant="ghost"
              size="icon-xl"
              className="hover:bg-muted/50"
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div>
            <Typography variant="h3" className="mb-8 text-center">
              Filter Your Matches
            </Typography>
            {renderFilterBtns()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchsView;
