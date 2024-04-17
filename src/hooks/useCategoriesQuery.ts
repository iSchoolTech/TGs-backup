import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"

export const useCategoriesQuery = () => {
  const posts = usePostsQuery()
  const categories = getAllSelectItemsFromPosts("Module Code", posts)

  return {
    [DEFAULT_CATEGORY]: posts.length,
    ...categories,
  }
}
