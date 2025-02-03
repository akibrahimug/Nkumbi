"use client";

import { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthForm } from "./auth-form";
import Loading from "./loading";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Suspense fallback={<Loading />}>
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to Nkumbi
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account or create a new one
              </p>
            </div>
            <AuthForm />
          </div>
        </div>
      </Suspense>
    );
  }

  return null;
}
