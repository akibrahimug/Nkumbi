"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/slices/userSlice";

export default function SyncSession() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setUser({
          _id: session.user.email,
          name: session.user.name,
          email: session.user.email,
          avatar: session.user.image,
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [session, status, dispatch]);

  return null;
}
