import React, { type CSSProperties } from "react";
import { SyncLoader } from "react-spinners";
import type { LoaderInterface } from "../../Common/constant/constant";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Loader({ isLoading, size, style }: LoaderInterface) {
  return (
    <main className={style === true ? "loader-class" : ""}>
      <p>Please wait a moment!!</p>
      <SyncLoader
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
