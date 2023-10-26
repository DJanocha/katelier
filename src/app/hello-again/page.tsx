import Link from "next/link";
import { LinkButton } from "~/app/_components/link-button";
import { PageContainer } from "~/app/_components/page-contaiiner";
import { UserLoginForm } from "~/app/_components/user-login-form";
import { buttonVariants } from "~/components/ui/button";

const HelloAgainPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-row gap-1 ">
        {/* <LinkButton href="/hello" label="Create account" /> */}
        <Link
          className="rounded-xl border border-blue-400 bg-slate-200 px-2 py-1 text-black"
          href="/hello"
        >
          main page
        </Link>
        <Link
          className="rounded-xl border border-blue-400 bg-slate-200 px-2 py-1 text-black"
          href="/"
        >
          create account
        </Link>
      </div>

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
