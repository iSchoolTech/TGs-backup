"use client";
import { NotionRenderer } from "react-notion-x";
// import { Collection } from "react-notion-x/build/third-party/collection";
import dynamic from "next/dynamic";
import "react-notion-x/src/styles.css";

// Lazy loading
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

export default function NotionPage({ recordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      darkMode={false}
      fullPage={true}
      components={{ Collection }}
    />
  );
}