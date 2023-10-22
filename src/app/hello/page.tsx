import { LinkButton } from "~/app/_components/link-button";
import { PageContainer } from "~/app/_components/page-contaiiner";
import { UserRegisterForm } from "~/app/_components/user-register-form";

const HelloPage = () => {
  return (
    <PageContainer>
      <LinkButton href="/hello-again" label="Log in" />

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below to create your account
            </p>
          </div>
          <UserRegisterForm />
        </div>
      </div>
    </PageContainer>
  );
};
export default HelloPage;
