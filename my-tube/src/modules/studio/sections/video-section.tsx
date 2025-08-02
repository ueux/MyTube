'use client'

import { InfiniteScroll } from "@/components/infinite-scroll"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DEFAULT_LIMIT } from "@/constants"
import { trpc } from "@/trpc/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export const VideoSection = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <VideoSectionSuspense/>
            </ErrorBoundary>
        </Suspense>
    )
}

const VideoSectionSuspense = () => {
    const router=useRouter()
    const [videos,query] = trpc.studio.getMany.useSuspenseInfiniteQuery({ limit: DEFAULT_LIMIT },
        {
            getNextPageParam:(lastPage)=>lastPage.nextCursor
        }
    )
    return (<div>
        <div className="border-y">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-6 w-[510px]">Video</TableHead>
                        <TableHead className="">Visibility</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="">Date</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                        <TableHead className="text-right">Comments</TableHead>
                        <TableHead className="text-right pr-6">Likes</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {videos.pages.flatMap((page) => page.items).map((video) => (
                            <TableRow onClick={()=>router.push(`/studio/videos/${video.id}`)} key={video.id} className="cursor-pointer">
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.title}</TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <InfiniteScroll  hasNextPage={query.hasNextPage}
            isFetchingNextPage={query.isFetchingNextPage } fetchNextPage={query.fetchNextPage}/>
    </div>)
}