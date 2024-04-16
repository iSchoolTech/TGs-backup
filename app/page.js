import NotionPage from "@/components/NotionPage";
import { rootNotionPageId } from "@/lib/config";
import * as notion from "@/lib/notion";

export default async function Home() {
  const pageId = rootNotionPageId;
  const recordMap = await notion.getPage(pageId);
  console.log(notion.getSiteMap(pageId));
  return (
    <main>
      <NotionPage recordMap={recordMap} />
    </main>
  );
}
