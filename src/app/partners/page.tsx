import { redirect } from "next/navigation";

export default function PartnersRootPage() {
  redirect("/partners/info");
  return null;
}