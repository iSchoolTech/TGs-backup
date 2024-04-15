"use client";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";

export default function NotionRendererCustom({ recordMap }) {
  return (
    <NotionRenderer recordMap={recordMap} darkMode={false} fullPage={true} />
  );
}
