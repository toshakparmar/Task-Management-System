"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "All Tasks", href: "/dashboard" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="app-container">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md bg-white border border-gray-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary-600">
                Task Manager
              </h1>
              {user && (
                <p className="text-xs sm:text-sm text-gray-600">
                  Welcome, {user.name}
                </p>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-3">
              {nav.map((n) => (
                <Link
                  key={n.name}
                  href={n.href}
                  className="text-sm text-gray-700 hover:text-primary-600"
                >
                  {n.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 truncate max-w-[220px]">
                  {user?.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await logout();
                    router.push("/auth/login");
                  }}
                  className="px-3 py-1 text-sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 mb-2">
            <div className="bg-white border border-gray-100 rounded-md p-3 space-y-2">
              {nav.map((n) => (
                <Link
                  key={n.name}
                  href={n.href}
                  className="block text-gray-700 py-2 px-2 rounded hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {n.name}
                </Link>
              ))}

              <div className="border-t border-gray-100 pt-2">
                <div className="text-sm text-gray-700 mb-2">{user?.email}</div>
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await logout();
                    router.push("/auth/login");
                  }}
                  className="w-full py-2"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
