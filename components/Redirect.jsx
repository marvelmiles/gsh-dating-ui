"use client";

import React, { useEffect } from "react";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Redirect = ({
  to = "/",
  message = "Redirecting...",
  toastMsg = "You're not allowed to view that page.",
}) => {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      clearTimeout(id);

      if (toastMsg) {
        const _id = setTimeout(() => {
          clearTimeout(_id);
          toast(toastMsg);
        }, 500);
      }

      router.replace(to);
    }, 200);
  }, [to, toastMsg]);

  return <Loading fullScreen message={message} />;
};

export default Redirect;
