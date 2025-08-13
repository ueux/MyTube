'use client'

import { CommentForm } from '@/modules/comments/ui/components/comment-form'
import { trpc } from '@/trpc/client'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { CommentItem } from '../../../comments/ui/components/comment-item'
import { DEFAULT_LIMIT } from '@/constants'
import { InfiniteScroll } from '@/components/infinite-scroll'

interface CommentsSectionProps {
  videoId: string,
}

export const CommentsSection = ({ videoId }: CommentsSectionProps) => {
  return (
    <Suspense fallback={<CommentsSectionSkeleton />}>
      <ErrorBoundary fallback={<>Error</>}>
        <CommentsSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  )
}

const CommentsSectionSkeleton = () => {
  return (<>
    Loading
  </>)
}

const CommentsSectionSuspense = ({ videoId }: CommentsSectionProps) => {
  const [comments,query] = trpc.comments.getMany.useSuspenseInfiniteQuery({ videoId, limit: DEFAULT_LIMIT },
  {getNextPageParam:(lastPage)=>lastPage.nextCursor})
  return (<div className='mt-6'>
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-bold'>{comments.pages[0].totalCount} Comments</h1>
      <CommentForm videoId={videoId} />
    </div>
    <div className='flex flex-col gap-4 mt-2'>
      {comments.pages.flatMap((page) => page.items).map((comment) => (
        <CommentItem key={comment.id} comment={comment}/>
      ))}
      <InfiniteScroll hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage} fetchNextPage={query.fetchNextPage} />
    </div>
  </div>)
}
