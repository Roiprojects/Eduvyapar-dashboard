"use client";

import dynamic from "next/dynamic";

const AcademicScene = dynamic(() => import("./AcademicScene"), { ssr: false });

export default function SceneLoader() {
  return <AcademicScene />;
}
