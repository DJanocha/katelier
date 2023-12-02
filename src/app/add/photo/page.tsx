import { PageContainer } from "~/app/_components/page-contaiiner";
import { AddPhotoForm } from "./add-photo-form";

export default function AddPhotoPage() {
  return (
    <PageContainer title="Add a new photo" description="You'll use it in your projects">
      <AddPhotoForm />
    </PageContainer>
  );
}
