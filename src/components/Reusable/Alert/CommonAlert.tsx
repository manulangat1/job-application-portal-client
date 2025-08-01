import { Alert } from "@mui/material";
import React from "react";
interface Props {
  severity: string | any;
  message: string;
}
function CommonAlert({ severity, message }: Props) {
  return (
    <Alert variant="filled" severity={severity}>
      <p>{message}</p>
    </Alert>
  );
}

export default CommonAlert;
