"use client";

import React from "react";
import useForm from "@/app/hooks/useForm";

import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import AuthPaperCard from "@/app/(auth)/components/AuthPaperCard";
import {
  authBtnProps,
  authFormFieldProps,
} from "@/app/(auth)/components/SigninAndSignUpLayout";

const page = ({ params }) => {
  const { isSubmitting, handleSubmit, reset, register } = useForm({
    required: true,
    defaultFormData: params,
  });

  const router = useRouter();

  const onSubmit = async (e) => {
    try {
      const { errors, formData } = handleSubmit(e);

      if (errors) return;

      const res = await axios.post(`/auth/reset-password`, formData);

      if (!res.success) throw res;

      toast("Password reset successful", { type: "success" });

      router.push("/auth/login");
    } catch (err) {
      toast(err.message);
    } finally {
      reset(true);
    }
  };

  return (
    <AuthPaperCard
      withPolicyText={false}
      title="Reset Password"
      onSubmit={onSubmit}
    >
      <FormField
        {...authFormFieldProps}
        placeholder="New Password"
        type="password"
        {...register("password")}
      />

      <FormField
        {...authFormFieldProps}
        placeholder="Confirm Password"
        type="password"
        {...register("confirmPassword")}
      />

      <Button {...authBtnProps} disabled={isSubmitting}>
        Reset
      </Button>
    </AuthPaperCard>
  );
};

export default page;
