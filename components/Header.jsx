"use client";

import React from "react";
import BrandImage from "./BrandImage";
import FormField from "./FormField";
import Link from "next/link";
import { Button } from "./ui/button";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

const Header = () => {
  const { isLogin } = useAuth();

  return (
    <div
      className="
  fixed top-0 left-0 w-full
  bg-background z-10
  "
    >
      <div className="contained flex-between">
        <div className="flex items-center gap-8">
          <BrandImage />
          <FormField LeftIcon={SearchIcon} RightIcon={ListFilterIcon} />
        </div>

        <div className="flex items-center gap-8">
          <Button
            as={Link}
            href="/"
            variant="link"
            size="lg-min"
            className="text-black-mild/50"
          >
            My Matches
          </Button>
          {isLogin ? (
            <Button
              as={Link}
              href="/u/1?edit=true"
              variant="ghost"
              size="lg-min"
              className="text-black-mild/50 hover:no-underline"
            >
              Profile
            </Button>
          ) : (
            <Button
              as={Link}
              href="/auth/login"
              variant="ghost"
              size="lg-min"
              className="text-black-mild/50 hover:no-underline"
            >
              Login
            </Button>
          )}
          {isLogin ? (
            <Button
              as={Link}
              href="/u/upgrade"
              size="lg-min"
              className="hover:no-underline"
            >
              Upgrade
            </Button>
          ) : (
            <Button
              as={Link}
              href="/auth/signup"
              size="lg-min"
              className="hover:no-underline"
            >
              Sign up
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
