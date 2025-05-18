"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Briefcase, FileText, AlertCircle, CheckCircle, Users, Building2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function EmployerNotificationsPage() {
  // Remove wage-related notifications from the employer notifications page

  // Update the notifications array to filter out wage-related items
  const notifications = [
    {
      id: 1,
      title: "New Job Application",
      description: "Rajesh Kumar has applied for the Construction Worker position",
      type: "application",
      date: "2 hours ago",
      read: false,
      link: "/employer/jobs/1/applicants",
    },
    {
      id: 2,
      title: "Grievance Filed",
      description: "Sunil Verma has filed a grievance regarding delayed payment",
      type: "grievance",
      date: "1 day ago",
      read: false,
      link: "/employer/grievances/1",
    },
    {
      id: 3,
      title: "Job Posting Expiring",
      description: "Your job posting for Site Supervisor will expire in 2 days",
      type: "job",
      date: "2 days ago",
      read: false,
      link: "/employer/jobs/2",
    },
    {
      id: 5,
      title: "Profile Update Reminder",
      description: "Please complete your company profile to attract more applicants",
      type: "profile",
      date: "1 week ago",
      read: true,
      link: "/employer/profile",
    },
    {
      id: 6,
      title: "Applicant Shortlisted",
      description: "You shortlisted Dinesh Patel for the Construction Worker position",
      type: "application",
      date: "3 days ago",
      read: true,
      link: "/employer/jobs/1/applicants",
    },
    {
      id: 7,
      title: "Grievance Resolved",
      description: "You marked the grievance 'Safety Equipment' as resolved",
      type: "grievance",
      date: "4 days ago",
      read: true,
      link: "/employer/grievances",
    },
    {
      id: 8,
      title: "Job Posting Success",
      description: "Your job posting for Electrician is getting good traction with 5 new applications",
      type: "job",
      date: "5 days ago",
      read: true,
      link: "/employer/jobs/3/applicants",
    },
    {
      id: 9,
      title: "Document Verification Required",
      description: "Please verify Manoj Singh's documents before finalizing the hiring process",
      type: "application",
      date: "6 days ago",
      read: true,
      link: "/employer/applicants",
    },
    {
      id: 10,
      title: "Job Edited",
      description: "You have edited the job posting for Plumber position.",
      type: "job",
      date: "1 day ago",
      read: false,
      link: "/employer/jobs/4",
    },
    {
      id: 11,
      title: "Job Closed",
      description: "The job posting for Carpenter position has been closed.",
      type: "job",
      date: "2 days ago",
      read: true,
      link: "/employer/jobs/5",
    },
    {
      id: 12,
      title: "Applicant Hired",
      description: "You have hired Suresh for the Electrician position.",
      type: "application",
      date: "3 days ago",
      read: true,
      link: "/employer/jobs/3/applicants",
    },
    {
      id: 13,
      title: "Applicant Rejected",
      description: "You have rejected Ramesh's application for the Construction Worker position.",
      type: "application",
      date: "4 days ago",
      read: true,
      link: "/employer/jobs/1/applicants",
    },
    {
      id: 16,
      title: "Profile Updated Successfully",
      description: "Your company profile has been updated successfully.",
      type: "profile",
      date: "7 days ago",
      read: true,
      link: "/employer/profile",
    },
  ]

  const [notificationState, setNotifications] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotifications(
      notificationState.map((notification) => {
        if (notification.id === id) {
          return { ...notification, read: true }
        }
        return notification
      }),
    )
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    setNotifications(
      notificationState.map((notification) => {
        return { ...notification, read: true }
      }),
    )
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-5 w-5" />
      case "grievance":
        return <AlertCircle className="h-5 w-5" />
      case "welfare":
        return <FileText className="h-5 w-5" />
      case "application":
        return <Users className="h-5 w-5" />
      case "profile":
        return <Building2 className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getIconBg = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-600"
      case "grievance":
        return "bg-orange-100 text-orange-600"
      case "welfare":
        return "bg-purple-100 text-purple-600"
      case "application":
        return "bg-yellow-100 text-yellow-600"
      case "profile":
        return "bg-indigo-100 text-indigo-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const unreadCount = notificationState.filter((notification) => !notification.read).length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employer Notifications</h2>
          <p className="text-muted-foreground">Stay updated with activities related to your employer account.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="grievances">Grievances</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {notificationState.length > 0 ? (
            <div className="grid gap-4">
              {notificationState.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-colors ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full p-2 ${getIconBg(notification.type)}`}>
                          {getIcon(notification.type)}
                        </div>
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                      </div>
                      <CardDescription>{notification.date}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{notification.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={notification.link}>View Details</Link>
                    </Button>
                    {!notification.read && (
                      <Button variant="ghost" onClick={() => markAsRead(notification.id)}>
                        Mark as Read
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CheckCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">All caught up!</h3>
              <p className="mt-2 text-sm text-muted-foreground">You have no new notifications.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          {notificationState.filter((n) => n.type === "application").length > 0 ? (
            <div className="grid gap-4">
              {notificationState
                .filter((n) => n.type === "application")
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-colors ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full p-2 ${getIconBg(notification.type)}`}>
                            {getIcon(notification.type)}
                          </div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                        </div>
                        <CardDescription>{notification.date}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{notification.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href={notification.link}>View Details</Link>
                      </Button>
                      {!notification.read && (
                        <Button variant="ghost" onClick={() => markAsRead(notification.id)}>
                          Mark as Read
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="rounded-md border p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No application notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">You have no new application notifications.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          {notificationState.filter((n) => n.type === "job").length > 0 ? (
            <div className="grid gap-4">
              {notificationState
                .filter((n) => n.type === "job")
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-colors ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full p-2 ${getIconBg(notification.type)}`}>
                            {getIcon(notification.type)}
                          </div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                        </div>
                        <CardDescription>{notification.date}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{notification.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href={notification.link}>View Details</Link>
                      </Button>
                      {!notification.read && (
                        <Button variant="ghost" onClick={() => markAsRead(notification.id)}>
                          Mark as Read
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="rounded-md border p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No job notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">You have no new job notifications.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="grievances" className="space-y-4">
          {notificationState.filter((n) => n.type === "grievance").length > 0 ? (
            <div className="grid gap-4">
              {notificationState
                .filter((n) => n.type === "grievance")
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-colors ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full p-2 ${getIconBg(notification.type)}`}>
                            {getIcon(notification.type)}
                          </div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                        </div>
                        <CardDescription>{notification.date}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{notification.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href={notification.link}>View Details</Link>
                      </Button>
                      {!notification.read && (
                        <Button variant="ghost" onClick={() => markAsRead(notification.id)}>
                          Mark as Read
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="rounded-md border p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No grievance notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">You have no new grievance notifications.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
