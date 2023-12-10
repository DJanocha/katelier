"use client";

import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import {
    createNoteValidator,
    type CreateNote,
} from "~/validators/created-note";

export const CreateNewNote = () => {
    const createNewNoteForm = useForm<CreateNote>({
        resolver: zodResolver(createNoteValidator),
    });
    const { toast } = useToast();
    const resetForm = useCallback(() => {
        createNewNoteForm.reset({ content: "", description: "" })
    }, [])
    const { mutate, isLoading } = api.notes.createNewNote.useMutation({
        onSuccess: () => {
            toast({ title: "New note created" });
            resetForm()
        },
        onError: ({ message }) => {
            toast({
                variant: "destructive",
                title: "Note not created",
                description: message,
            });
        },
    });
    const createNewNote = useCallback<SubmitHandler<CreateNote>>(
        (formVals) => {

            mutate(formVals);
        },
        [mutate],
    );

    return (
        <Form {...createNewNoteForm}>
            <form onSubmit={createNewNoteForm.handleSubmit(createNewNote)}>
                <div className="flex flex-col gap-4 w-full">
                    <FormField
                        control={createNewNoteForm.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Note description" {...field} />
                                </FormControl>
                                {/* <FormDescription>This is your password</FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createNewNoteForm.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel aria-required>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Your note content..."
                                        required
                                        className="h-80 flex-1"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>This is your email .</FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-row gap-2">

                        <Button className="w-full" variant={'secondary'} onClick={resetForm}>
                            clear
                        </Button>
                        <Button className="w-full" disabled={isLoading} type="submit">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create note
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};
