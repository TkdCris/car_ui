import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export const useSession = async () => {
  let session;

  if (typeof window === "undefined") {
    session = await auth();
  } else {
    session = await getSession();
  }

  return session;
}
