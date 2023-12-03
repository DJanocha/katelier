import { AppPathnames } from "~/constants/app-pathnames";
import { PageContainer } from "../_components/page-contaiiner";
import { TileLink } from "../_components/tile-link";

export default function BrowsePage() {
  return (
    <PageContainer title="browse your stuff" description="(images, notes etc)">
      <div className="flex h-full flex-1 flex-col justify-end">
        <div className="grid w-full grid-cols-2 gap-4 py-8 sm:grid-cols-2 md:gap-8">
          <TileLink
            href={AppPathnames["/browse/photos"]}
            title="Browse photos"
          />
          <TileLink
            href={AppPathnames["/browse/notes"]}
            title="Browse notes"
          />
        </div>
      </div>
    </PageContainer>
  );
}
