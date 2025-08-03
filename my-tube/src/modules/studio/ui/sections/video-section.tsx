'use client'

import { InfiniteScroll } from "@/components/infinite-scroll"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DEFAULT_LIMIT } from "@/constants"
import { snakeCaseToTitle } from "@/lib/utils"
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail"
import { trpc } from "@/trpc/client"
import { format } from "date-fns"
import { Globe2Icon, LockIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export const VideoSection = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <VideoSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideoSectionSuspense = () => {
    const router = useRouter()
    const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery({ limit: DEFAULT_LIMIT },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor
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
                        <TableRow onClick={() => router.push(`/studio/videos/${video.id}`)} key={video.id} className="cursor-pointer">
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <div className="relative aspect-video w-36 shrink-0">
                                        <VideoThumbnail imageUrl={video.thumbnailUrl} previewUrl={video.previewUrl} title={video.title} duration={video.duration || 0} />
                                    </div>
                                    <div className="flex flex-col overflow-hidden gap-1">
                                        <span className="text-sm line-clamp-1" > {video.title}</span>
                                        <span className="text-sx line-clamp-1 text-muted-foreground" > {video.description || "No Description"}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell >
                                <div className="flex items-center ">
                                    {video.visibility === "private" ? <LockIcon className="size-4 mr-2" /> :
                                        <Globe2Icon className="size-4 mr-2" />}
                                    {snakeCaseToTitle(video.visibility)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className=" flex items-center">
                                    {snakeCaseToTitle(video.muxStatus || "error")}
                                </div>
                            </TableCell>
                            <TableCell className="text-sm truncate">{format(new Date(video.createdAt), "d MMM yyyy")}</TableCell>
                            <TableCell>{video.title}</TableCell>
                            <TableCell>{video.title}</TableCell>
                            <TableCell>{video.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <InfiniteScroll hasNextPage={query.hasNextPage}
            isFetchingNextPage={query.isFetchingNextPage} fetchNextPage={query.fetchNextPage} />
    </div>)
}