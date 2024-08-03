import React from "react";
import BrandImage from "./BrandImage";
import FormField from "./FormField";
import Link from "next/link";
import { Button } from "./ui/button";
import { ListFilterIcon, SearchIcon } from "lucide-react";

const Header = () => {
  return (
    <div
      className="
  fixed top-0 left-0 border w-full
  "
    >
      <div className="contained flex-between">
        <div className="flex items-center gap-8">
          <BrandImage />
          <FormField LeftIcon={SearchIcon} RightIcon={ListFilterIcon} />
        </div>

        <div className="flex items-center gap-8">
          <Button variant="link" size="default-min">
            My Matches
          </Button>
          <Button variant="ghost" size="default-min">
            Login
          </Button>
          <Button size="default-min">Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
