import React from "react";

interface ReusableButtonInterface {
  name: string;
  sm?: boolean;
  danger?: boolean;
}

function ReusableButton({ name, sm, danger }: ReusableButtonInterface) {
  const className = [
    "btn",
    "next-btn",
    sm ? "sm-btn" : "",
    danger ? "btn-danger" : "", // optional: supports `danger`
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} type="submit">
      {" "}
      {name}
    </button>
  );
}

export default ReusableButton;
