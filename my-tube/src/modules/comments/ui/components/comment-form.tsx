import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { commentInsertSchema } from "@/db/schema";
import { trpc } from "@/trpc/client";
import { useClerk, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface CommentFormProps {
    videoId: string;
    onSuccess?: () => void;
}

export const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
    const clerk = useClerk()
    const { user } = useUser()
    const utils = trpc.useUtils()
    const create = trpc.comments.create.useMutation({
        onSuccess: () => {
            utils.comments.getMany.invalidate({ videoId });
            form.reset()
            toast.success("Comment added")
            onSuccess?.()
        },
        onError: (error) => {
            toast.error("Something went wrong")
            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn()
            }
        }
    })
    const commentFormSchema = commentInsertSchema.omit({ userId: true });
    const form = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: { videoId, value: "" }
    })
    const handleSumbit = (values: z.infer<typeof commentFormSchema>) => {
        create.mutate(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSumbit)} className=" flex gap-4 group">
                <UserAvatar size={"lg"} imageUrl={user?.imageUrl || "/user-logo.svg"} name={user?.username || "User"} />
                <div className="flex-1">
                    <FormField name="value" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea {...field} placeholder="Add a comment..." className="resize-none bg-transparent overflow-hidden min-h-0" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} />
                    <div className="justify-end gap-2 mt-2 flex">
                        <Button type="submit" disabled={create.isPending} size={"sm"}>Comment</Button>
                    </div>
                </div>
            </form>
        </Form>)
}