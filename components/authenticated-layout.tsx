"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 ml-0 md:ml-64 transition-all duration-300 min-h-screen">{children}</main>
    </div>
  )
}
