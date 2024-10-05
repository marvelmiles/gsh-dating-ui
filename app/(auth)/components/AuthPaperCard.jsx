import Typography from "@/components/Typography";
import React from "react";
import AuthLayout from "./AuthLayout";

const AuthPaperCard = ({
  children,
  title = "",
  subTitle = "",
  withPolicyText = true,
  asForm = true,
  pageElement,
  ...rest
}) => {
  const Comp = asForm ? "form" : "div";

  return (
    <AuthLayout pageElement={pageElement}>
      <Comp
        {...rest}
        className="
        bg-peach rounded-[30px] px-8 py-14 flex-center
        w-full max-w-[900px] mx-auto
        "
      >
        <div className="flex flex-col gap-8 w-full max-w-[483px]">
          <div className="text-center">
            <Typography variant="h3" className="font-garamond font-medium">
              {title}
            </Typography>
            <Typography className="font-garamond">{subTitle}</Typography>
          </div>
          {/* <Divider className="bg-primary" /> */}
          {children}
          {withPolicyText && (
            <Typography className="font-garamond text-center">
              By clicking continue you agree to our Terms, Privacy Policy and
              Refund and Cancellation Policy
            </Typography>
          )}
        </div>
      </Comp>
    </AuthLayout>
  );
};

export default AuthPaperCard;
