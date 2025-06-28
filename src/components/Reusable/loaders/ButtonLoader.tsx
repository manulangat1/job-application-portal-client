import { type CSSProperties } from "react";
import { BounceLoader } from "react-spinners";
import type { LoaderInterface } from "../../Common/constant/constant";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
function ButtonLoader({ isLoading }: LoaderInterface) {
  return (
    <BounceLoader
      color="white"
      loading={isLoading}
      cssOverride={override}
      size={10}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default ButtonLoader;
