import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";

export default function AdminPage() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return <section className="container flex h-full w-full flex-col"></section>;
}
