import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewJob from "./NewJob";
function Home() {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(!loading);
  //   setTimeout(() => {
  //     setLoading(!loading);
  //   }, 300);
  // }, []);
  return (
    <main>
      {loading === true ? (
        <Skeleton count={25} /> // Five-line loading skeleton
      ) : (
        <main>
          <h1> How are you doing</h1>
        </main>
      )}
    </main>
  );
}

export default Home;
