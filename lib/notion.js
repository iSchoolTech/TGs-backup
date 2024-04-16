import { NotionAPI } from "notion-client";

// import { previewImagesEnabled, useOfficialNotionAPI } from './config'
// import { getPreviewImageMap } from './preview-images'

const notion = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2,
});

export async function getPage(pageId) {
  const data = await notion.getPage(pageId);

  if (Object.keys(data.collection_query).length !== 0) {
    const filteredBlocks = {};
    const unmatchedBlocks = [];

    for (const blockId in data.block) {
      const blockValue = data.block[blockId].value;

      if (blockValue && blockValue.type === "page") {
        const title = blockValue.properties.title[0][0];
        if (title.includes(searchQuery)) {
          filteredBlocks[blockId] = data.block[blockId];
        } else {
          unmatchedBlocks.push(blockId);
        }
      } else {
        filteredBlocks[blockId] = data.block[blockId];
      }
    }

    const newData = { ...data };
    newData.block = { ...filteredBlocks };

    // Update collection_query based on unmatchedBlocks (automatic access)
    if (data.collection_query && unmatchedBlocks.length > 0) {
      const firstCollectionId = Object.keys(data.collection_query)[0]; // Get first collection ID
      const firstQuery = data.collection_query[firstCollectionId];
      const firstQueryId = Object.keys(firstQuery)[0]; // Get first query ID within the collection

      if (firstQuery && firstQuery.hasOwnProperty(firstQueryId)) {
        const results = firstQuery[firstQueryId].collection_group_results;
        if (results && results.blockIds) {
          newData.collection_query[firstCollectionId][
            firstQueryId
          ].collection_group_results.blockIds = results.blockIds.filter(
            (id) => !unmatchedBlocks.includes(id)
          );
        }
      }
    }
    return newData;
  } else {
    return data;
  }
  //   const block = recordMap.block[pageId]?.value;
  //   console.log(block);
  //   if (previewImagesEnabled) {
  //     const previewImageMap = await getPreviewImageMap(recordMap)
  //     ;(recordMap as any).preview_images = previewImageMap
  //   }
}

// export async function search(params: SearchParams): Promise<SearchResults> {
//   return notion.search(params);
// }
