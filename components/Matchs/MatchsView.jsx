"use client";

import React, { useState } from "react";
import MatchCard from "./MatchCard";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Dropdown from "../Dropdown";
import FormField from "../FormField";
import Typography from "../Typography";
import { cn } from "@/lib/utils";

const MatchsView = ({
  withPagniation = false,
  orientation = "vertical",
  title,
  containerClassName,
}) => {
  const [matches, setMatches] = useState(Array.from({ length: 50 }));

  const handleApplyFilter = () => {};

  const renderFilterBtns = () => {
    return (
      <div className={`flex gap-8 my-4`}>
        <Dropdown
          orientation="horizontal"
          label="Gender"
          items={["Man", "Woman"]}
          containerClassName={`max-w-none items-center`}
        />
        <FormField
          type="number"
          label="Age"
          orientation="horizontal"
          containerClassName="items-center max-w-[130px]"
        />
        <FormField
          label="Country of Residence"
          orientation="horizontal"
          containerClassName="items-center"
        />
        <Button size="default-min" onClick={handleApplyFilter}>
          Filter
        </Button>
      </div>
    );
  };

  return (
    <div
      className={cn(
        `flex flex-col gap-4 ${title ? "mt-[80px]" : ""}`,
        containerClassName
      )}
    >
      {!withPagniation && renderFilterBtns()}

      {title && (
        <Typography
          variant="h3"
          className="font-bold mb-10 font-garamond text-center"
        >
          {title}
        </Typography>
      )}
      {orientation === "horizontal" ? (
        <div className="flex gap-8">
          {matches.slice(0, 4).map((_, i) => (
            <MatchCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 gap-y-12 grid-cols-4">
          {matches.map((_, i) => (
            <MatchCard key={i} />
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
