import { LinkButton } from "~/app/_components/link-button";
import { PageContainer } from "~/app/_components/page-contaiiner";
import { UserLoginForm } from "~/app/_components/user-login-form";

const HelloAgainPage = () => {
  return (
    <PageContainer>
      <LinkButton href="/hello" label="Create account" />

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Hello again
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below to enter Katelier
            </p>
          </div>
          <UserLoginForm />
        </div>
      </div>
    </PageContainer>
  );
};

export default HelloAgainPage;
