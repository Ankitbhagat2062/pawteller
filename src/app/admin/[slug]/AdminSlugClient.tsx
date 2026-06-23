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
   const token = tokenFromServer
  // If slug is missing, redirect right away
  useEffect(() => {
    if (!normalizedSlug || !token) redirect("/admin");
  }, [normalizedSlug]);


  const Component = normalizedSlug ? componentMap[normalizedSlug] : undefined;
  if (!Component || !token) return null;

  // Wait until token is known
  return <Component token={token} />;
}


