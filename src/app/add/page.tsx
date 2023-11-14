import { PageContainer } from "~/app/_components/page-contaiiner";
import { TileLink } from "~/app/_components/tile-link";
import { AppPathnames } from "~/constants/app-pathnames";

const AddPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col justify-end flex-1 h-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-8 w-full py-8">
        <TileLink
          href={AppPathnames["/add/photo"]}
          title="Add photo"
          description="lorem ipsum some description"
        />
        <TileLink href={AppPathnames["/add/note"]} title="Add note" description="leave a note for later" />
      </div>

      </div>
    </PageContainer>
  );
};
export default AddPage;
