import { NextPage } from "next"
import { AppProps } from "next/app"
import { ExtendedRecordMap } from "notion-types"
import { ReactElement, ReactNode } from "react"

// TODO: refactor types
export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type TPostProductionState =
  | "Not started"
  | "In progress"
  | "In Review"
  | "In Edits"
  | "In Final Review"
  | "In Final Edits"
  | "In Visual Review"
  | "Ready"
  | "Published"
export type TPostType = "K12"

export type TPost = {
  id: string
  date: { start_date: string }
  createdTime: string
  Type: TPostType
  "Teacher Guide Name": string
  "Module Code": string
  "Production State": TPostProductionState
  "Slides Link": string
  thumbnail?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
}

export type PostDetail = TPost & {
  recordMap: ExtendedRecordMap
}

export type TPosts = TPost[]

export type TModuleCodes = {
  [moduleCode: string]: number
}

export type ThemeType = "dark" | "light"
