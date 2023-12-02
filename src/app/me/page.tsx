import { PageContainer } from "~/app/_components/page-contaiiner";
import { Separator } from "~/components/ui/separator";
import { EditMeForm } from "./edit-me-form";
import { api } from "~/trpc/server";

const MePage = async() => {
  const {me} = await api.me.getMe.query()
  return (
    <PageContainer>
      <div className="w-full my-4">
        <h3 className="text-lg font-medium">Hi, {me?.name}!</h3>
        <p className="text-sm text-muted-foreground">
          Inspect or update your contact info.
        </p>
      </div>
      <Separator />
      <EditMeForm />
    </PageContainer>
  );
};
export default MePage;
