"use client";

import React from "react";
import BrandImage from "./BrandImage";
import FormField from "./FormField";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon, SearchIcon } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import Popover from "./Popover";
import useScreen from "@/app/hooks/useScreen";

const NavLinks = ({ isMenu = false }) => {
  const { isLogin } = useAuth();

  const btnClass = "text-black-mild hover:no-underline w-full md:w-auto";

  return (
    <div
      className={`
      min-w-0 flex-1 items-center
    ${
      isMenu
        ? `flex flex-col gap-y-4`
        : `
    hidden md:flex gap-x-4
    `
    } 
    `}
    >
      <FormField
        LeftIcon={SearchIcon}
        type="search"
        containerClassName=""
        wrapperClassName="md:max-w-[180px] lg:max-w-fit"
      />
      <div
        className={`
        flex min-w-0 flex-1 flex-shrink items-center 
        justify-end
        ${isMenu ? "flex-col gap-y-4 w-full" : "gap-x-4"}
        `}
      >
        <Button
          as={Link}
          href="/"
          variant="link"
          size={isMenu ? undefined : "md"}
          className={`
          ${btnClass} hover:underline text-black-mild ${
            isMenu ? "justify-normal p-0 h-auto" : ""
          }
          `}
        >
          My Matches
        </Button>
        {isLogin ? (
          <Button
            as={Link}
            href="/u/1?edit=true"
            variant="outline"
            size="md"
            className={btnClass}
          >
            Profile
          </Button>
        ) : (
          <Button
            as={Link}
            href="/auth/login"
            variant="ghost"
            size="md"
            className={btnClass}
          >
            Login
          </Button>
        )}
        {isLogin ? (
          <Button as={Link} href="/u/upgrade" size="md" className={btnClass}>
            Upgrade
          </Button>
        ) : (
          <Button
            as={Link}
            href="/auth/signup"
            size="md"
            className="hover:no-underline"
          >
            Sign up
          </Button>
        )}
      </div>
    </div>
  );
};

const Header = () => {
  const { isScreen } = useScreen({ screen: 768 });

  return (
    <div
      className="
  fixed top-0 left-0 w-full
  bg-background z-10
  "
    >
      <div className="contained flex-between">
        <BrandImage />

        {isScreen ? null : (
          <Popover content={<NavLinks isMenu />}>
            <Button variant="outline" size="icon" className="flex md:hidden">
              <MenuIcon />
            </Button>
          </Popover>
        )}

        <NavLinks />
      </div>
    </div>
  );
};

export default Header;
