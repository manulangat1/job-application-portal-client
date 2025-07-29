import React from "react";
import { Card, CardContent } from "@mui/material";
interface Props {
  numberOfApplications: number;
  status: string;
}
function ReusableCard({ numberOfApplications, status }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <h1 className="card-title">
          {numberOfApplications} {status}{" "}
        </h1>
      </CardContent>
    </Card>
  );
}

export default ReusableCard;
