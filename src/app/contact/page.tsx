import { redirect } from "next/navigation";

export default function ContactRootPage() {
  redirect("/contact/inquiry");
  return null;
}