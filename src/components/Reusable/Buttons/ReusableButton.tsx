import React from "react";

interface ReusableButtonInterface {
  name: string;
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClick: any;
  id?: number;
  action?: string;
  sm?: boolean;
  danger?: boolean;
}

function ReusableButton({
  name,
  onClick,
  id,
  action,
  sm,
  danger,
}: ReusableButtonInterface) {
  const className = [
    "btn",
    "next-btn",
    sm ? "sm-btn" : "",
    danger ? "btn-danger" : "", // optional: supports `danger`
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={className}
      onClick={() => onClick(id, action)}
      type="submit"
    >
      {" "}
      {name}
    </button>
  );
}

export default ReusableButton;
