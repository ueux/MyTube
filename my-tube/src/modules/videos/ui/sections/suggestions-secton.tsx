'use client'

import { DEFAULT_LIMIT } from '@/constants'
import { trpc } from '@/trpc/client'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { VideoRowCard } from '../components/video-row-card'
import { VideoGridCard } from '../components/video-grid-card'
import { InfiniteScroll } from '@/components/infinite-scroll'

interface SuggestionsSectionProps {
  videoId: string,
  isManual?:boolean
}

export const SuggestionsSection = ({ videoId }: SuggestionsSectionProps) => {
  return (
    <Suspense fallback={<SuggestionsSectionSkeleton />}>
      <ErrorBoundary fallback={<>Error</>}>
        <SuggestionsSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  )
}

const SuggestionsSectionSkeleton = () => {
  return (<>
    Loading
  </>)
}

const SuggestionsSectionSuspense = ({ videoId ,isManual}: SuggestionsSectionProps) => {
  const [suggestions, query] = trpc.suggestions.getMany.useSuspenseInfiniteQuery({ videoId, limit: DEFAULT_LIMIT },
    { getNextPageParam: (lastPage) => lastPage.nextCursor })
  return (<>
    <div className='hidden md:block space-y-10'>
      {suggestions.pages.flatMap((page) => page.items.map((video) => (
        <VideoRowCard key={video.id} data={video} size={"compact"} />
      )))}
    </div>
    <div className='block md:hidden space-y-10'>
      {suggestions.pages.flatMap((page) => page.items.map((video) => (
        <VideoGridCard key={video.id} data={video}  />
      )))}
    </div>
    <InfiniteScroll isManual={isManual} hasNextPage={query.hasNextPage} isFetchingNextPage={query.isFetchingNextPage} fetchNextPage={query.fetchNextPage}/>
  </>)
}