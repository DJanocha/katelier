import { redirect } from "next/navigation";
import { AppPathnames } from "~/constants/app-pathnames";

export default function Home() {
  redirect(AppPathnames['/preview']);
}

