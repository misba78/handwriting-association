import { redirect } from "next/navigation";

export default function ActivitiesRootPage() {
  redirect("/activities/exhibitions");
  return null;
}