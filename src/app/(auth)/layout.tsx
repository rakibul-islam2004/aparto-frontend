import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Aparto",
  description: "Login or register to Aparto",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
