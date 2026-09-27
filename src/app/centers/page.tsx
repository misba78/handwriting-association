import { redirect } from "next/navigation";

export default function CentersRootPage() {
  redirect("/centers/info");
  return null;
}