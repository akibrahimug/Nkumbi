"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Icons } from "@/app/components/ui/icons";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { registerUser } from "@/store/slices/userSlice";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up logic
        const resultAction = await dispatch(
          registerUser({ username, email, password })
        );
        if (registerUser.rejected.match(resultAction)) {
          // If there's an error from the signup route
          const errorMsg = resultAction.payload as string;
          toast.error(errorMsg);
          return;
        }

        // After successful registration, automatically sign in
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult && signInResult.error) {
          toast.error(signInResult.error);
          return;
        }

        toast.success("Account created and signed in successfully!");
        router.push("/");
      } else {
        // Sign in logic (Credentials)
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult && signInResult.error) {
          toast.error(signInResult.error);
          return;
        }

        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      toast.error("Error signing in with " + provider);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div>
          <Label htmlFor="username">Name</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
            placeholder="johndoe"
          />
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="john.doe@example.com"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-blue-600 hover:underline"
          disabled={isLoading}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthSignIn("google")}
          disabled={isLoading}
        >
          <Icons.google className="mr-2 h-4 w-4" /> Google
        </Button>
        {/* Add more providers if needed */}
      </div>
    </form>
  );
}
