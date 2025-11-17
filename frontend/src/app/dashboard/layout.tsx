"use client";

import React from "react";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Reduced vertical padding for denser task listing */}
        <div className="app-container py-4 lg:py-6">{children}</div>
      </main>
    </div>
  );
}
