"use client";

import dynamic from "next/dynamic";

const OceanScene = dynamic(() => import("./OceanScene"), { ssr: false });

export default function SceneLoader() {
  return <OceanScene />;
}
