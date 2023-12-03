import { PageContainer } from "~/app/_components/page-contaiiner";
import { ComingSoon } from "~/components/ui/coming-soon";

const BillingsPage = () => {
  return (
    <PageContainer
      title="Look at costs"
      description="Tbh everythings free....for now :)"
    >
      <ComingSoon />
    </PageContainer>
  );
};
export default BillingsPage;
