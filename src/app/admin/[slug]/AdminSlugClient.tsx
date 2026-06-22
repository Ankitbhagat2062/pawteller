"use client";

import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";


type SLUG_TO_COMPONENT = {
  [key: string]: ComponentType<{ token: string }>;
};

export default function AdminSlugClient({
  tokenFromServer,
  normalizedSlug,
  componentMap,
}: {
  tokenFromServer?: string;
  normalizedSlug?: string;
  componentMap: SLUG_TO_COMPONENT;
}) {
  const [tokenFromLocalStorage, setTokenFromLocalStorage] = useState<string | null>(null);

  // Read localStorage only after mount (avoids timing/race issues)
  useEffect(() => {
    setTokenFromLocalStorage(window.localStorage.getItem("adminAuthToken"));
  }, []);

  const token = useMemo(
    () => tokenFromServer ?? tokenFromLocalStorage,
    [tokenFromServer, tokenFromLocalStorage]
  );

  // If slug is missing, redirect right away
  useEffect(() => {
    if (!normalizedSlug) redirect("/admin");
  }, [normalizedSlug]);

  // Redirect once we definitively know there's no token
  useEffect(() => {
    if (tokenFromServer) return; // server provided it
    if (tokenFromLocalStorage === null) return; // localStorage not loaded yet
    if (!token) redirect("/admin");
  }, [token, tokenFromLocalStorage, tokenFromServer]);

  const Component = normalizedSlug ? componentMap[normalizedSlug] : undefined;
  if (!Component) return null;

  // Wait until token is known
  if (!token) return null;

  return <Component token={token} />;
}


