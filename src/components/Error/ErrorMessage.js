import * as React from "react";
import { Alert } from "react-bootstrap";
const ErrorMessage = ({ error }) => {
  const variant = "danger";
  return (
    <Alert transition={false} variant={variant}>
      {error.message}
    </Alert>
  );
};

export default ErrorMessage;
