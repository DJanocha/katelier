import { PageContainer } from "~/app/_components/page-contaiiner";
import { Separator } from "~/components/ui/separator";

const settingsPage = () => {
  return (
    <PageContainer>
      <div className="w-full my-4">
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your preferences.
        </p>
      </div>
      <Separator />
    </PageContainer>
  );
};
export default settingsPage;
