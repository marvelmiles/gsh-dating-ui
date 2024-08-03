import React from "react";
import MatchCard from "./MatchCard";
import { Button } from "../ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilterIcon,
} from "lucide-react";
import Typography from "../Typography";
import Popover from "../Popover";
import Dropdown from "../Dropdown";
import FormField from "../FormField";

const MatchsView = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Popover
          contentClassName="p-0"
          content={
            <div className="flex flex-col gap-8 w-[80%]">
              <Dropdown items={["Man"]} />
              <FormField type="number" label="Age" />
              <FormField label="Country of Residence" />
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
        {Array.from({ length: 50 }).map((_, i) => (
          <MatchCard key={i} />
        ))}
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center gap-4 w-full">
          <Button disabled size="icon-lg" variant="transparent">
            <ChevronLeftIcon />
          </Button>
          <Typography variant="h5" className="text-black-mild">
            1
          </Typography>
          <Button size="icon-lg" variant="transparent">
            <ChevronRightIcon />
          </Button>
        </div>

        {/* <div>
          <Typography>Filter Your Matches</Typography>
        </div> */}
      </div>
    </div>
  );
};

export default MatchsView;
