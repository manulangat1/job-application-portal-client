import React, { type CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Loader({ isLoading, size, style }: any) {
  return (
    <main className={style === true ? "loader-class" : ""}>
      <p>Please wait a moment!!</p>
      <ClipLoader
        color="green"
        loading={isLoading}
        cssOverride={override}
        size={size ? 150 : size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </main>
  );
}

export default Loader;
