"use client";
import React from "react";
import { Suspense } from "react";

function useHydration() {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
const LocalDateTime = ({ timestamp }: { timestamp: number }) => {
  const iso = new Date(timestamp * 1000).toISOString();
  const hydrated = useHydration();
  return (
    <Suspense key={hydrated ? "local" : "utc"}>
      <time dateTime={iso} title={iso}>
        {new Date(timestamp * 1000).toLocaleString()}
      </time>
    </Suspense>
  );
}
export default LocalDateTime;