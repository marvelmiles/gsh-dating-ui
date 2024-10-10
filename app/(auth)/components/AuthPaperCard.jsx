import Typography from "@/components/Typography";
import React from "react";
import AuthLayout from "./AuthLayout";
import Divider from "@/components/Divider";
import { Button } from "@/components/ui/button";
import { authBtnProps } from "./SigninAndSignUpLayout";
import { PersonIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/app/providers/AuthProvider";

const AuthPaperCard = ({
  children,
  title = "",
  subTitle = "",
  withPolicyText = true,
  asForm = true,
  pageElement,
  topEl,
  withTestLogin = true,
  formApi,
  ...rest
}) => {
  const { handleLogin } = useAuth();

  const Comp = asForm ? "form" : "div";

  return (
    <AuthLayout pageElement={pageElement}>
      <div
        className="
      flex flex-col gap-4 w-full max-w-[900px] mx-auto
      "
      >
        {topEl}
        <Comp
          {...rest}
          className="
        bg-peach rounded-[30px] px-8 py-14 flex-center 
        flex-col
        "
        >
          <div className="flex flex-col gap-8 w-full max-w-[483px]">
            <div className="text-center">
              <Typography variant="h3" className="font-garamond font-medium">
                {title}
              </Typography>
              <Typography className="font-garamond">{subTitle}</Typography>
            </div>
            {withTestLogin ? (
              <>
                <Button
                  {...authBtnProps}
                  type="button"
                  onClick={() => handleLogin({ provider: "sandbox" }, formApi)}
                  variant="outline"
                  loading={formApi.isSubmitting}
                >
                  <PersonIcon
                    className="
  w-[24px] h-[24px] min-w-[24px] min-h-[24px]
  "
                  />
                  <span>Login as a Test User</span>
                </Button>

                <Divider className="bg-primary" />
              </>
            ) : null}
            {children}
            {withPolicyText && (
              <Typography className="font-garamond text-center">
                By clicking continue you agree to our Terms, Privacy Policy and
                Refund and Cancellation Policy
              </Typography>
            )}
          </div>
        </Comp>
      </div>
    </AuthLayout>
  );
};

export default AuthPaperCard;
