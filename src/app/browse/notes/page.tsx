import { PageContainer } from "~/app/_components/page-contaiiner";
import { api } from "~/trpc/server";
import { Note } from "./note";

export default async function BrowseNotesPage() {
    const myNotes = await api.notes.getMyNotes.query();
    return (
        <PageContainer title="Your quick notes" className="overflow-auto flex flex-col gap-4">
            {myNotes.map(note => (<Note note={note} key={note.id} />))}
        </PageContainer>


    );
}
