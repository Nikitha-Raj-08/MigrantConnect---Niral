"use client"

import {
  Home,
  Search,
  DollarSign,
  AlertCircle,
  FileText,
  UserCircle,
  Briefcase,
  Building2,
  Bell,
  LogOut,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "./ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  // Determine if user is worker or employer based on path
  // This is a simplified approach - in a real app, you'd use auth context
  const isWorker = !pathname.includes("/employer")

  return (
    <div>
      <Sidebar className="border-r dark:border-gray-800 dark:bg-gray-900 transition-colors duration-300 w-64 fixed h-full z-40">
        <div className="flex flex-col h-full justify-between">
          <div>
            <SidebarHeader className="border-b dark:border-gray-800">
              <div className="flex items-center gap-2 px-4 py-3">
                <Users className="h-6 w-6" />
                <span className="text-xl font-bold">MigrantConnect</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {isWorker ? (
                  // Worker navigation items
                  <>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                          <Link href="/dashboard" className="flex items-center">
                            <Home className="h-5 w-5 mr-3" />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/jobs"}>
                          <Link href="/jobs" className="flex items-center">
                            <Search className="h-5 w-5 mr-3" />
                            <span>Find Jobs</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/wages"}>
                          <Link href="/wages" className="flex items-center">
                            <DollarSign className="h-5 w-5 mr-3" />
                            <span>My Wages</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/grievances"}>
                          <Link href="/grievances" className="flex items-center">
                            <AlertCircle className="h-5 w-5 mr-3" />
                            <span>Grievances</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/welfare"}>
                          <Link href="/welfare" className="flex items-center">
                            <FileText className="h-5 w-5 mr-3" />
                            <span>Welfare Schemes</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                          <Link href="/profile" className="flex items-center">
                            <UserCircle className="h-5 w-5 mr-3" />
                            <span>My Profile</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  </>
                ) : (
                  // Employer navigation items
                  <>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/employer/dashboard"}>
                          <Link href="/employer/dashboard" className="flex items-center">
                            <Home className="h-5 w-5 mr-3" />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.includes("/employer/jobs")}>
                          <Link href="/employer/jobs" className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-3" />
                            <span>Manage Jobs</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/employer/wages"}>
                          <Link href="/employer/wages" className="flex items-center">
                            <DollarSign className="h-5 w-5 mr-3" />
                            <span>Wage Management</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.includes("/employer/grievances")}>
                          <Link href="/employer/grievances" className="flex items-center">
                            <AlertCircle className="h-5 w-5 mr-3" />
                            <span>Grievances</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.includes("/employer/profile")}>
                          <Link href="/employer/profile" className="flex items-center">
                            <Building2 className="h-5 w-5 mr-3" />
                            <span>Company Profile</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  </>
                )}
              </SidebarMenu>
            </SidebarContent>
          </div>

          {/* Footer items fixed at bottom */}
          <SidebarFooter className="border-t dark:border-gray-800 mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isWorker ? pathname === "/notifications" : pathname === "/employer/employer-notifications"}
                >
                  <Link
                    href={isWorker ? "/notifications" : "/employer/employer-notifications"}
                    className="flex items-center"
                  >
                    <Bell className="h-5 w-5 mr-3" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/login" className="flex items-center">
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </div>
        <div className="absolute right-4 top-4 md:hidden">
          <SidebarTrigger />
        </div>
      </Sidebar>
    </div>
  )
}
