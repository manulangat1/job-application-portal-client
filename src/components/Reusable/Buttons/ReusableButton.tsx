import React from "react";

interface ReusableButtonInterface {
  name: string;
}

function ReusableButton({ name }: ReusableButtonInterface) {
  return (
    <button className="btn next-btn" type="submit">
      {" "}
      {name}
    </button>
  );
}

export default ReusableButton;
