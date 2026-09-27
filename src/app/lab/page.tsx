import { redirect } from "next/navigation";

export default function LabRootPage() {
  redirect("/lab/info");
  return null;
}