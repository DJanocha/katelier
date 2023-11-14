'use client'
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function NotFount() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-4 bg-gradient-to-b to-red-400 from-red-600 p-4 rounded-xl text-center shadow-inner">
      <span className="text-3xl text-wrap font-bold text-red-100">
        Page not found
      </span>
      <Button variant={"default"} onClick={()=>router.back()}>Go back</Button>

    </div>
  )
}
