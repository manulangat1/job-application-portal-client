import React, { type CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Loader({ isLoading }: any) {
  return (
    <main className="loader-class">
      <p>Please wait a moment!!</p>
      <ClipLoader
        color="green"
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </main>
  );
}

export default Loader;
