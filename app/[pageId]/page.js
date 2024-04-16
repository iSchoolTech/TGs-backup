import NotionPage from "@/components/NotionPage";
import * as notion from "@/lib/notion";

export default async function Page({ params }) {
  const pageId = params.pageId;
  const recordMap = await notion.getPage(pageId);

  return (
    <main>
      <NotionPage recordMap={recordMap} />
    </main>
  );
}
