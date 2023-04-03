import React from 'react'
import { notFound } from 'next/navigation'
import { Answer, Author, Comment, RenderDiscussion } from './render'
import { fetchCommunityHelp, fetchCommunityHelps } from '@root/graphql'

type DateFromSource = string

const isDiscussionData = (
  data: any,
): data is {
  id: string
  title?: string
  slug?: string
  discordID?: string
  githubID?: string
  communityHelpType?: 'discord' | 'github'
  communityHelpJSON: {
    title: string
    id: string
    author: Author
    answer?: Answer
    body: string
    createdAt: DateFromSource
    url: string
    commentTotal: number
    upvotes: number
    comments: Comment[]
    slug: string
  }
} => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'slug' in data &&
    'discordID' in data &&
    'githubID' in data &&
    'communityHelpType' in data &&
    'communityHelpJSON' in data
  )
}

const Discussion = async ({ params }) => {
  const { discussion: slug } = params

  const discussion = await fetchCommunityHelp(slug)

  if (!discussion) return notFound()

  if (!isDiscussionData(discussion)) {
    throw new Error('Unexpected discussion data')
  }

  return <RenderDiscussion {...discussion} />
}

export default Discussion

export async function generateStaticParams() {
  const discussions = await fetchCommunityHelps()
  return discussions?.map(({ slug }) => slug) ?? []
}
