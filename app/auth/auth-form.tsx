"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/store/slices/userSlice";
import { RootState } from "@/store";
export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector(
    (state: RootState) => state.user
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up logic
        await dispatch(
          registerUser({ username, email, password }) as any
        ).unwrap();

        // After successful registration, automatically sign in
        const loginResult = await dispatch(
          loginUser({ email, password }) as any
        ).unwrap();

        if (loginResult) {
          toast.success("Account created and signed in successfully!");
          router.push("/");
        }
      } else {
        // Sign in logic
        const result = await dispatch(
          loginUser({ email, password }) as any
        ).unwrap();

        if (result) {
          toast.success("Signed in successfully!");
          router.push("/");
        }
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: "/" })
      .catch(() => toast.error("Error signing in with " + provider))
      .finally(() => setIsLoading(false));
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
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthSignIn("facebook")}
          disabled={isLoading}
        >
          <Icons.facebook className="mr-2 h-4 w-4" /> Facebook
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthSignIn("twitter")}
          disabled={isLoading}
        >
          <Icons.twitter className="mr-2 h-4 w-4" /> Twitter
        </Button>
      </div>
    </form>
  );
}
