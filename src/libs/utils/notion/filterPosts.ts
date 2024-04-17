import { TPosts, TPostProductionState, TPostType } from "src/types"

export type FilterPostsOptions = {
  acceptStatus?: TPostProductionState
  acceptType?: TPostType
}

const initialOption: FilterPostsOptions = {
  acceptStatus: "Ready",
  acceptType: "K12",
}
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption
) {
  const { acceptStatus = ["Ready"], acceptType = ["K12"] } = options
  const filteredPosts = posts
    // filter data
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime)
      if (!post["Teacher Guide Name"] || postDate > tomorrow) return false
      return true
    })
    // filter status
    .filter((post) => {
      const postStatus = post["Production State"]
      return acceptStatus.includes(postStatus)
    })
    // filter type
    .filter((post) => {
      const postType = post.Type
      return acceptType.includes(postType)
    })

  return filteredPosts
}
