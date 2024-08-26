"use client";

import React from "react";
import AuthPaperCard from "../../../../components/AuthPaperCard";
import useForm from "@/app/hooks/useForm";
import {
  authBtnProps,
  authFormFieldProps,
} from "../../../../components/SigninAndSignUpLayout";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const { isSubmitting, handleSubmit, reset, handleChange, formData } = useForm(
    {
      required: true,
      defaultFormData: params,
    }
  );

  const router = useRouter();

  const onSubmit = async (e) => {
    try {
      const { errors, formData } = handleSubmit(e);

      if (errors) return;

      const res = await axios.post(
        `/auth/verify-token/password-reset`,
        formData
      );

      if (!res.success) throw res;

      toast("Password verified successfully", { type: "success" });

      router.push("/auth/reset-password");
    } catch (err) {
      toast(err.message);
    } finally {
      reset(true);
    }
  };

  return (
    <AuthPaperCard
      withPolicyText={false}
      title="Verification Code"
      onSubmit={onSubmit}
    >
      <FormField
        {...authFormFieldProps}
        placeholder="Verification code"
        type="number"
        name="code"
        disabled={isSubmitting}
        value={formData.code}
        onChange={(e) => {
          if (e.target.value.length === 5) return;
          handleChange(e);
        }}
      />

      <Button {...authBtnProps} disabled={isSubmitting}>
        Verify
      </Button>
    </AuthPaperCard>
  );
};

export default page;
