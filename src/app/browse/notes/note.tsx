"use client";

import { CheckIcon, EditIcon, UndoIcon, XIcon } from "lucide-react";
import image from "next/image";
import { useRouter } from "next/navigation";
import { type ComponentProps, useCallback, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { type CreatedNote } from "~/validators/created-note";

export type NoteProps = {
    note: CreatedNote;
};
export const Note = ({ note }: NoteProps) => {
    const { toast } = useToast();
    const apiUtils = api.useUtils();
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const [value, setValue] = useState(note.content)
    const { mutate: updateMyNote } = api.notes.updateMyNote.useMutation({
        onSuccess: async () => {
            setIsEditing(false)
            await apiUtils.notes.invalidate();
            router.refresh()
        },
        onError: ({ message }) => {
            toast({ variant: "destructive", title: "Note not updated", description: message ?? "" })
        }
    })
    const undoChanges = useCallback<NonNullable<ComponentProps<'button'>['onChange']>>(() => {
        setIsEditing(false)
        setValue(note.content)
    }, [note.content])
    const { mutate: deleteNote } = api.notes.deleteNote.useMutation({
        onSuccess: async () => {
            await apiUtils.notes.invalidate();
            router.refresh()
        },
        onError: ({ message }) => {
            toast({
                variant: "destructive",
                title: "Note not deleted",
                description: message,
            });
        },
    });
    if (isEditing) {
        return (

            <div className="flex flex-row gap-2 max-w-full h-max ">
                <Textarea value={value} className="h-96" onChange={e => setValue(e.currentTarget.value)} />
                <div className="flex flex-col justify-start gap-2">
                    <Button variant={"ghost"} onClick={() => updateMyNote({ id: note.id, updatedNote: { ...note, content: value } })}>
                        <CheckIcon className="h-6 w-6 " />
                    </Button>
                    <Button variant={"ghost"} onClick={undoChanges}>
                        <UndoIcon className="h-6 w-6 " />
                    </Button>
                </div>
            </div>
        )

    }
    return (
        // <pre>{content}</pre>
        <div className="gap-2 flex flex-row max-w-full h-max">
            <pre
                className={
                    "overflow-x-scroll w-full  rounded-xl border border-white/20 bg-white/40 p-4 backdrop-blur-2xl hover:bg-white/20 focus:scale-105 focus-visible:neon-orange"
                }
            >
                {note.content}
            </pre>
            <div className="flex flex-col justify-start gap-2">
                <Button variant={"ghost"} onClick={() => setIsEditing(true)}>
                    <EditIcon className="h-6 w-6 " />
                </Button>
                {/* <Button variant={"ghost"} onClick={() => deleteNote({ id: note.id })}>
                    <XIcon className="h-6 w-6 " />
                </Button> */}



                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"ghost"}>
                            <XIcon className="h-6 w-6 " />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently
                                delete your account and remove your data from our
                                servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => deleteNote({ id: note.id })}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};
