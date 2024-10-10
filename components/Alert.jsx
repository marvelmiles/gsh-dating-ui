import React from "react";
import { AlertDescription, AlertTitle, Alert as NativeAlert } from "./ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

const Alert = ({ children, ...rest }) => {
  return (
    <NativeAlert {...rest}>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </NativeAlert>
  );
};

export default Alert;
