import { PageContainer } from "~/app/_components/page-contaiiner";
import { PhotoGallery } from "~/app/_components/photo-gallery";
import { api } from "~/trpc/server";

export default async function BrowsePhotosPage() {
  const images = await api.files.getMyImages.query();
  return (
    <PageContainer title="Your photos">
      <PhotoGallery images={images} />
    </PageContainer>
  );
}
