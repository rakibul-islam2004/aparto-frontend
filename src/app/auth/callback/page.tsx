"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleOAuthCallback = useAuthStore((state) => state.handleOAuthCallback);
  const [error, setError] = useState("");

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const errorMessage = searchParams.get("error");

    if (errorMessage) {
      setError(errorMessage);
      setTimeout(() => router.push("/login"), 3000);
      return;
    }

    if (accessToken && refreshToken) {
      handleOAuthCallback(accessToken, refreshToken);
      router.push("/");
    } else {
      setError("Authentication failed. No tokens received.");
      setTimeout(() => router.push("/login"), 3000);
    }
  }, [searchParams, handleOAuthCallback, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center">
        {error ? (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
            <p>{error}</p>
            <p className="text-sm mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Completing authentication...</p>
          </div>
        )}
      </div>
    </div>
  );
}