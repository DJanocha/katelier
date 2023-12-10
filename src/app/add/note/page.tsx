import { PageContainer } from "~/app/_components/page-contaiiner";
import { CreateNewNote } from "./create-new-note";

export default function AddPhotoPage() {
  return (
    <PageContainer
      title="Add a new note"
      description="You'll use it in your projects"
      showSeparator
    >
      <CreateNewNote />
    </PageContainer>
  );
}
