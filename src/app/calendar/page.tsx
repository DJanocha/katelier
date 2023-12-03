import { PageContainer } from "~/app/_components/page-contaiiner";
import { ComingSoon } from "~/components/ui/coming-soon";

const CalendarPage = () => {
  return (
    <PageContainer title="Manage your activities" description="Check what happened on specific day">
      <ComingSoon/>
    </PageContainer>
  );
};
export default CalendarPage;
