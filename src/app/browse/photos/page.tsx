import { isEmpty } from "lodash";
import { PageContainer } from "~/app/_components/page-contaiiner";
import { PhotoGallery } from "~/app/_components/photo-gallery";
import { api } from "~/trpc/server";

export default async function BrowsePhotosPage() {
  const images = await api.files.getMyImages.query();
  const isGalleryEmpty = isEmpty(images);
  return (
    <PageContainer title="Your photos" className="px-0">
      {isGalleryEmpty ? (
        <span className="text-wrap text-3xl font-bold text-red-100">
          {`Gallery is still empty :)`}
        </span>
      ) : (
        <PhotoGallery images={images} />
      )}
    </PageContainer>
  );
}
