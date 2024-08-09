"use client";

import React from "react";
import SigninAndSignUpLayout from "../../components/SigninAndSignUpLayout";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <SigninAndSignUpLayout
      withPolicyText={false}
      title="Sign Up to Start meeting Your Needs!"
      subTitle="Create an account with just One click!"
      onContinue={() => router.push("/auth/setup-password")}
    />
  );
};

export default page;
