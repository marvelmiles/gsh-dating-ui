"use client";

import React from "react";
import BrandImage from "./BrandImage";
import FormField from "./FormField";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight, MenuIcon, SearchIcon } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import Popover from "./Popover";
import useScreen from "@/app/hooks/useScreen";
import useForm from "@/app/hooks/useForm";
import { useRouter } from "next/navigation";

const NavLinks = ({ isMenu = false }) => {
  const { currentUser, memUpdateUser } = useAuth();

  const btnClass = "w-full text-black-mild hover:no-underline md:w-auto";

  const { formData, handleChange } = useForm();

  const router = useRouter();

  const handleSearch = () => {
    const isSearch =
      window.location.pathname.toLowerCase().indexOf("/search") > -1 ||
      window.location.pathname.toLowerCase().indexOf("/u/matches") > -1 ||
      window.location.pathname === "/";

    if (isSearch || formData.search) memUpdateUser(formData);

    if (!isSearch && formData.search) router.push("/search");
  };

  return (
    <div
      style={isMenu ? { width: "calc(100% - 70px)" } : undefined}
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
        value={formData.search || currentUser.search || undefined}
        onIconClick={handleSearch}
        LeftIcon={SearchIcon}
        type="search"
        containerClassName="w-full"
        wrapperClassName="w-full md:max-w-[180px] lg:max-w-fit"
        onChange={(e) => {
          if (!e.target.value) memUpdateUser({ search: "" });
          handleChange(e);
        }}
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
          href="/u/matches"
          variant="link"
          size={isMenu ? undefined : "md"}
          className={`
          ${btnClass} hover:underline text-black-mild ${
            isMenu ? "justify-between p-0 h-auto" : ""
          }
          `}
        >
          <span>My Matches</span>

          <ChevronRight className="md:hidden" />
        </Button>
        {currentUser.isLogin ? (
          <Button
            as={Link}
            href={`/u/${currentUser.id}?edit=true`}
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
            variant="outline"
            size="md"
            className={btnClass}
          >
            Login
          </Button>
        )}
        {currentUser.isLogin ? (
          <Button as={Link} href="/auth/login" size="md" className={btnClass}>
            Logout
          </Button>
        ) : (
          <Button as={Link} href="/auth/signup" size="md" className={btnClass}>
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
          <Popover className="" content={<NavLinks isMenu />}>
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
