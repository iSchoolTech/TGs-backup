import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"
let slug: string
const filter: FilterPostsOptions = {
  acceptStatus: "Ready",
  acceptType: "K12",
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, filter)

  return {
    paths: filteredPost.map((row) => `/${row["Teacher Guide Name"]}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  slug = context.params?.slug as string

  // const posts = await getPosts()
  // const feedPosts = filterPosts(posts)
  // await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)

  // const detailPosts = filterPosts(posts, filter)
  // const postDetail = detailPosts.find(
  //   (t: any) => t["Teacher Guide Name"] === slug
  // )
  const recordMap = await getRecordMap(slug)
  console.log(recordMap)
  await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
    // ...postDetail,
    recordMap,
  }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  if (!post) return <CustomError />

  // const image =
  //   post.thumbnail ??
  //   CONFIG.ogImageGenerateURL ??
  //   `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(
  //     post["Teacher Guide Name"]
  //   )}.png`

  // const date = post.date?.start_date || post.createdTime || ""

  const meta = {
    title: "test",
    date: new Date().toISOString(),
    // image: image,
    description: "",
    type: post.Type,
    url: `${CONFIG.link}/${slug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
