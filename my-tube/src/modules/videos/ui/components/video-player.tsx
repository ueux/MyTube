'use client'

import MuxPLayer from "@mux/mux-player-react"

interface VideoPlayerProps{
    playbackId?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    autoPlay?: boolean;
    onPlay?:()=>void
}

export const VideoPlayer = ({ playbackId, thumbnailUrl,autoPlay,onPlay }: VideoPlayerProps) => {

    return (<MuxPLayer playbackId={playbackId||""}
        poster={thumbnailUrl || "/placehoder.svg"}
        playerInitTime={0}
        autoPlay={autoPlay}
        thumbnailTime={0}
        className="w-full h-full object-contain"
        accentColor="#FF2056"
        onPlay={onPlay}
    />)
}