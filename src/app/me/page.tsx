import { PageContainer } from "~/app/_components/page-contaiiner";
import { api } from "~/trpc/server";
import { EditMeForm } from "./edit-me-form";

const MePage = async () => {
  const { me } = await api.me.getMe.query();
  return (
    <PageContainer
      title={`Hi, ${me?.name}!`}
      description="Inspect or update your contact info."
      showSeparator
    >
      <EditMeForm />
    </PageContainer>
  );
};
export default MePage;
