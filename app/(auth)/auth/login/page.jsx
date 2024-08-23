"use client";

import React, { useEffect } from "react";
import AuthPaperCard from "../../components/AuthPaperCard";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  authBtnProps,
  authFormFieldProps,
} from "../../components/SigninAndSignUpLayout";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "react-toastify";
import useForm from "@/app/hooks/useForm";
import { createRelativeUrl, replaceParam } from "@/lib/axios";

const page = () => {
  const { handleLogin } = useAuth();

  const { isSubmitting, handleSubmit, reset, register } = useForm({
    required: true,
  });

  const router = useRouter();

  const searchParams = useSearchParams();

  const timedout = searchParams.get("timedout") || "";

  useEffect(() => {
    if (timedout.toLowerCase() === "true") {
      router.replace(replaceParam(`timedout=${timedout}`));
      toast("Session timedout, please login again.");
    }
  }, [timedout]);

  const onSubmit = async (e) => {
    try {
      const { errors, formData } = handleSubmit(e);

      if (errors) return toast("Email or password is invalid!");

      await handleLogin(formData);

      if (searchParams.get("redirect"))
        router.replace(decodeURIComponent(createRelativeUrl()));
      else router.push("/");
    } catch (err) {
      toast(err.message, { type: "error" });
    } finally {
      reset(true);
    }
  };

  return (
    <AuthPaperCard
      title="Login"
      subTitle="Welcome back, we have been expecting you!"
      onSubmit={onSubmit}
    >
      <FormField {...authFormFieldProps} type="email" {...register("email")} />

      <FormField
        {...authFormFieldProps}
        type="password"
        {...register("password")}
      />

      <Button {...authBtnProps} disabled={isSubmitting}>
        Login
      </Button>
    </AuthPaperCard>
  );
};

export default page;
