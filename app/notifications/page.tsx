"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Briefcase, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "application",
      title: "Application Status Update",
      message: "Your application for Construction Worker at ABC Builders has been reviewed.",
      date: "2 hours ago",
      read: false,
      link: "/applications",
    },
    {
      id: 2,
      type: "job",
      title: "New Job Match",
      message: "A new job matching your skills has been posted: Carpenter at XYZ Interiors.",
      date: "1 day ago",
      read: true,
      link: "/jobs/2",
    },
    {
      id: 3,
      type: "grievance",
      title: "Grievance Update",
      message: "Your grievance regarding working hours has received a response.",
      date: "2 days ago",
      read: false,
      link: "/grievances/201",
    },
    {
      id: 4,
      type: "application",
      title: "Interview Invitation",
      message: "You have been invited for an interview for the Site Helper position at Metro Projects.",
      date: "3 days ago",
      read: true,
      link: "/applications",
    },
    {
      id: 5,
      type: "job",
      title: "Job Recommendation",
      message: "Based on your profile, we recommend applying for Painter at Modern Homes.",
      date: "4 days ago",
      read: true,
      link: "/jobs/3",
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    return notification.type === activeTab
  })

  const markAllAsRead = () => {
    // In a real app, this would call an API to mark notifications as read
    console.log("Marking all notifications as read")
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application":
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
      case "job":
        return <Briefcase className="h-5 w-5 text-green-500" />
      case "grievance":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your latest activities</p>
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="application">Applications</TabsTrigger>
            <TabsTrigger value="job">Jobs</TabsTrigger>
            <TabsTrigger value="grievance">Grievances</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all"
                  ? "All Notifications"
                  : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Notifications`}
              </CardTitle>
              <CardDescription>
                {filteredNotifications.length} {filteredNotifications.length === 1 ? "notification" : "notifications"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 rounded-lg border p-4 ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{notification.title}</p>
                        {!notification.read && <Badge variant="outline">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                        <Link href={notification.link}>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don't have any {activeTab === "all" ? "" : activeTab} notifications at the moment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
