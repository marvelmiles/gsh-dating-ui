"use client";

import React from "react";
import AuthPaperCard from "../../components/AuthPaperCard";
import useForm from "@/app/hooks/useForm";
import {
  authBtnProps,
  authFormFieldProps,
} from "../../components/SigninAndSignUpLayout";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";

const page = () => {
  const { isSubmitting, handleSubmit, reset, register } = useForm({
    required: true,
  });

  const router = useRouter();

  const onSubmit = async (e) => {
    try {
      const { errors, formData } = handleSubmit(e);

      if (errors) return;

      const res = await axios.post(`/auth/recover-password`, formData);

      if (!res.success) throw res;

      toast("Verification code sent to mail", { type: "success" });

      router.push(`/auth/token-verification/password/${res.data.id}`);
    } catch (err) {
      toast(err.message);
    } finally {
      reset(true);
    }
  };

  return (
    <AuthPaperCard
      withPolicyText={false}
      title="Verification Email"
      onSubmit={onSubmit}
    >
      <FormField
        {...authFormFieldProps}
        placeholder="Email"
        type="email"
        {...register("email")}
      />

      <Button {...authBtnProps} loading={isSubmitting}>
        Send Code
      </Button>
      {/* <Button
        disabled={isSubmitting}
        variant="link"
        onClick={onSubmit}
        className="ml-auto text-current font-medium -mt-10"
      >
        Resend code
      </Button> */}
    </AuthPaperCard>
  );
};

export default page;
