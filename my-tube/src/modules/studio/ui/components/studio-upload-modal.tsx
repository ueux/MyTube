'use client'

import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { toast } from "sonner"

export const StudioUploadModal = () => {
    const utils = trpc.useUtils()
    const create = trpc.videos.create.useMutation(
        {
            onSuccess: () => {
                toast.success("Video Created")
            utils.studio.getMany.invalidate()
            },
            onError: (error) => {
            toast.error(error.message)
        }}
    )

    return (
       <Button onClick={()=>create.mutate()} disabled={create.isPending} variant={'secondary'}>
          {create.isPending?<Loader2Icon className="animate-spin"/>:<PlusIcon />}
          Create
        </Button>
    )
}