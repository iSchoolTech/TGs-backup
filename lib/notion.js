import { NotionAPI } from "notion-client";

// import { previewImagesEnabled, useOfficialNotionAPI } from './config'
// import { getPreviewImageMap } from './preview-images'

const notion = new NotionAPI();

export async function getPage(pageId) {
  const recordMap = await notion.getPage(pageId);

  //   if (previewImagesEnabled) {
  //     const previewImageMap = await getPreviewImageMap(recordMap)
  //     ;(recordMap as any).preview_images = previewImageMap
  //   }

  return recordMap;
}

// export async function search(params: SearchParams): Promise<SearchResults> {
//   return notion.search(params);
// }
