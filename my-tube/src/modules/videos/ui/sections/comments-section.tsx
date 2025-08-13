'use client'

import { CommentForm } from '@/modules/comments/ui/components/comment-form'
import { trpc } from '@/trpc/client'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { CommentItem } from '../../../comments/ui/components/comment-item'

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
  const [comments]=trpc.comments.getMany.useSuspenseQuery({videoId})
  return (<div className='mt-6'>
    <div className='flex flex-col gap-6'>
      <h1 className=''>{ } Comments</h1>
      <CommentForm videoId={videoId} />
    </div>
    <div className='flex flex-col gap-4 mt-2'>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment}/>
      ))}
    </div>
  </div>)
}
