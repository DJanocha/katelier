import Link from "next/link";
import { PageContainer } from "~/app/_components/page-contaiiner";

import { api } from "~/trpc/server";

export default async function Home() {
  const { me } = await api.auth.getMe.query();

  return (
    <PageContainer>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="flex flex-col text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          My email is{" "}
          <span className="text-[hsl(280,100%,70%)]">{me?.email}</span>
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>

        {/* <CrudShowcase /> */}
      </div>
    </PageContainer>
  );
}

// async function CrudShowcase() {
//   // const latestPost = await api.post.getLatest.query();
//   const latestPost = await api.return(
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>,
//   );
// }
