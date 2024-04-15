import NotionRendererCustom from "@/components/NotionRendererCustom";
import { NotionAPI } from "notion-client";

export default async function Home() {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage("adb75301a7204803bed03a2ea335400a");

  return (
    <main>
      <NotionRendererCustom recordMap={recordMap} />
    </main>
  );
}
