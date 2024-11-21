import * as React from "react"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@mantine/core"
import { useZuStore } from "@/store/zuStore"
import { Play } from "lucide-react"



export function VideoModal({ videoKey }: { videoKey: string | undefined }) {
    const [open, setOpen] = React.useState(false)
    const { movie } = useZuStore((state) => state);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="" color="red" size="md" radius="md" >
                    <Play size={18} className="mx-2" /> Play Now
                </Button>
            </DialogTrigger>
            <DialogContent className="h-[65%]  w-full max-w-5xl  p-0">
                {
                    movie ? <div className="w-full h-full scale-105 rounded-md ">
                        <iframe width="100%" height="100%" className="h-full w-full ratio ratio-16x9 rounded-lg border-red-400 border-4 "
                            src={`${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}${videoKey}?controls=0&autoplay=1&rel=0&Showinfo=0&cc_load_policy=1`}
                            title={movie?.title || movie?.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        />
                    </div> : <div className="w-full h-[484px] flex items-center justify-center">
                        No video found
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}
