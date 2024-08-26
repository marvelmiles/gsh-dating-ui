"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthPaperCard from "../../components/AuthPaperCard";
import useForm from "@/app/hooks/useForm";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  authBtnProps,
  authFormFieldProps,
} from "../../components/SigninAndSignUpLayout";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

const page = () => {
  const router = useRouter();

  const { isSubmitting, handleSubmit, reset, register } = useForm({
    required: true,
  });

  const onSubmit = async (e) => {
    try {
      const { errors, formData } = handleSubmit(e);

      if (errors) return;

      const res = await axios.post(`/auth/signup`, {
        ...formData,
        bio: { fullname: formData.fullname },
      });

      if (!res.success) throw res;

      toast("Account setup successful. Please login  and continue.", {
        type: "success",
      });

      router.push("/auth/login");
    } catch (err) {
      toast(err.message, { type: "error" });
    } finally {
      reset(true);
    }
  };

  return (
    <AuthPaperCard
      onSubmit={onSubmit}
      withPolicyText={false}
      title="Sign Up to Start meeting Your Needs!"
      subTitle="Create an account with just One click!"
      onContinue={() => router.push("/auth/setup-password")}
    >
      <FormField
        {...authFormFieldProps}
        placeholder="Email"
        type="email"
        {...register("email")}
      />

      <FormField
        {...authFormFieldProps}
        placeholder="Fullname"
        {...register("fullname")}
      />

      <FormField
        {...authFormFieldProps}
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      <FormField
        {...authFormFieldProps}
        type="password"
        placeholder="Password"
        {...register("confirmPassword")}
      />

      <Button {...authBtnProps} disabled={isSubmitting}>
        Signup
      </Button>
    </AuthPaperCard>
  );
};

export default page;
