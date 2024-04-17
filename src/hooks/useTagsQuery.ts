import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"

export const useTagsQuery = () => {
  const posts = usePostsQuery()

  const tags = getAllSelectItemsFromPosts("Module Code", posts)

  return tags
}
