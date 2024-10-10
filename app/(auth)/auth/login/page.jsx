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
import { replaceParam } from "@/lib/axios";
import Typography from "@/components/Typography";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
const page = () => {
  const { handleLogin, handleLogout } = useAuth();

  const formApi = useForm({
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

    handleLogout();
  }, [timedout]);

  const handleFormData = async (e) => {
    const { errors, formData } = formApi.handleSubmit(e);

    if (errors) return toast("Email or password is invalid!");

    handleLogin(formData, formApi);
  };

  return (
    <AuthPaperCard
      withTestLogin
      formApi={formApi}
      title="Login"
      subTitle="Welcome back, we have been expecting you!"
      pageElement={
        <Button as={Link} size="md" href="/auth/signup">
          Signup
        </Button>
      }
      onSubmit={handleFormData}
    >
      <FormField
        {...authFormFieldProps}
        placeholder="Email"
        type="email"
        {...formApi.register("email")}
      />

      <FormField
        {...authFormFieldProps}
        placeholder="Password"
        type="password"
        {...formApi.register("password")}
      />
      <div className="flex-between -mt-8">
        <Checkbox
          label="Remember Me"
          checked={
            formApi.formData.rememberMe === undefined ||
            formApi.formData.rememberMe
          }
          onCheckedChange={(rememberMe) =>
            formApi.reset((data) => ({ ...data, rememberMe }))
          }
        />
        <Typography
          as={Link}
          href="/auth/forgot-password"
          className="font-medium"
        >
          Forgot password
        </Typography>
      </div>

      <Button {...authBtnProps} loading={formApi.isSubmitting}>
        Login
      </Button>
    </AuthPaperCard>
  );
};

export default page;
