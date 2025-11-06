"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";

const authRoutes = ["/auth/login", "/auth/register"];

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = authRoutes.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Content */}
      {!isAuthPage ? (
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      ) : (
        <main className="flex-1">{children}</main>
      )}

      {/* Footer */}
      {!isAuthPage && (
        <footer className="w-full border-t bg-background py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Uni-Fied by Pranshu Mangale, Param Soni, Twisha Patel
        </footer>
      )}
    </div>
  );
}
