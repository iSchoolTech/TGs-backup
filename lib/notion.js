import { NotionAPI } from "notion-client";
import {
  getAllPagesInSpace,
  getCanonicalPageId,
  getPageProperty,
} from "notion-utils";
import pMemoize from "p-memoize";

// import { previewImagesEnabled, useOfficialNotionAPI } from './config'
// import { getPreviewImageMap } from './preview-images'

const notion = new NotionAPI();

export async function getPage(pageId) {
  const recordMap = await notion.getPage(pageId);

  //   const block = recordMap.block[pageId]?.value;
  //   console.log(block);
  //   if (previewImagesEnabled) {
  //     const previewImageMap = await getPreviewImageMap(recordMap)
  //     ;(recordMap as any).preview_images = previewImageMap
  //   }

  return recordMap;
}

export async function getSiteMap(rootNotionPageId) {
  const partialSiteMap = await getAllPages(rootNotionPageId);

  return {
    ...partialSiteMap,
  };
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args),
});

async function getAllPagesImpl(rootNotionPageId) {
  const getPage = async (pageId, ...args) => {
    console.log("\nnotion getPage", uuidToId(pageId));
    return notion.getPage(pageId, ...args);
  };

  const pageMap = await getAllPagesInSpace(rootNotionPageId, getPage);

  const canonicalPageMap = Object.keys(pageMap).reduce((map, pageId) => {
    const recordMap = pageMap[pageId];
    if (!recordMap) {
      console.log(`Error loading page "${pageId}"`);
    }

    const block = recordMap.block[pageId]?.value;
    if (!(getPageProperty("Public", block, recordMap) ?? true)) {
      return map;
    }

    const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
      uuid,
    });

    if (map[canonicalPageId]) {
      // you can have multiple pages in different collections that have the same id
      // TODO: we may want to error if neither entry is a collection page
      console.warn("error duplicate canonical page id", {
        canonicalPageId,
        pageId,
        existingPageId: map[canonicalPageId],
      });

      return map;
    } else {
      return {
        ...map,
        [canonicalPageId]: pageId,
      };
    }
  }, {});

  return {
    pageMap,
    canonicalPageMap,
  };
}
// export async function search(params: SearchParams): Promise<SearchResults> {
//   return notion.search(params);
// }
