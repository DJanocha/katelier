import { PageContainer } from "~/app/_components/page-contaiiner";
import { ComingSoon } from "~/components/ui/coming-soon";

const SupportPage = () => {
  return (
    <PageContainer
      title="Would you like to support us?"
      description="Here's how:"
    >
      <ComingSoon />
    </PageContainer>
  );
};
export default SupportPage;
