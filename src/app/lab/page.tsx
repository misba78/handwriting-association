import { redirect } from "next/navigation";

export default function SchoolRootPage() {
  redirect("/school/institutes");
  return null;
}