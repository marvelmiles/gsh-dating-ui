"use client";

import React, { useState } from "react";
import MatchCard from "./MatchCard";
import { Button } from "../ui/button";
import { ListFilterIcon } from "lucide-react";
import Popover from "../Popover";
import Dropdown from "../Dropdown";
import FormField from "../FormField";

const MatchsView = () => {
  const [matches, setMatches] = useState(Array.from({ length: 50 }));
  const [openFilter, setOpenFilter] = useState(false);

  const handleApplyFilter = () => {
    setOpenFilter(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Popover
          open={openFilter}
          onOpenChange={setOpenFilter}
          content={
            <div className="flex flex-col gap-8">
              <Dropdown
                containerClassName="max-w-none"
                label="Gender"
                items={["Man", "Woman"]}
              />
              <FormField type="number" label="Age" />
              <FormField label="Country of Residence" />
              <Button onClick={handleApplyFilter} className="ml-auto">
                Apply
              </Button>
            </div>
          }
        >
          <Button variant="outline">
            <span>Filter</span>
            <ListFilterIcon size={18} />
          </Button>
        </Popover>
      </div>
      <div className="grid gap-8 gap-y-12 grid-cols-4">
        {matches.map((_, i) => (
          <MatchCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default MatchsView;
