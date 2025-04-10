"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, Briefcase, DollarSign, AlertCircle, FileText, CheckCircle } from "lucide-react"

export default function NotificationsPage() {
  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      title: "New Job Match",
      description: "A new job matching your skills is available: Construction Worker at ABC Builders",
      type: "job",
      date: "2 hours ago",
      read: false,
      link: "/jobs/1",
    },
    {
      id: 2,
      title: "Payment Received",
      description: "You have received a payment of ₹15,000 from Home Solutions",
      type: "payment",
      date: "1 day ago",
      read: false,
      link: "/wages",
    },
    {
      id: 3,
      title: "Grievance Update",
      description: "XYZ Construction has responded to your grievance about delayed payment",
      type: "grievance",
      date: "2 days ago",
      read: true,
      link: "/grievances/1",
    },
    {
      id: 4,
      title: "New Welfare Scheme",
      description: "You may be eligible for the Pradhan Mantri Awas Yojana housing scheme",
      type: "welfare",
      date: "1 week ago",
      read: true,
      link: "/welfare",
    },
    {
      id: 5,
      title: "Job Application Update",
      description: "Your application for Carpenter at XYZ Interiors has been viewed",
      type: "job",
      date: "1 week ago",
      read: true,
      link: "/applications",
    },
  ]

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-5 w-5" />
      case "payment":
        return <DollarSign className="h-5 w-5" />
      case "grievance":
        return <AlertCircle className="h-5 w-5" />
      case "welfare":
        return <FileText className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  // Get background color based on notification type
  const getIconBg = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-600"
      case "payment":
        return "bg-green-100 text-green-600"
      case "grievance":
        return "bg-orange-100 text-orange-600"
      case "welfare":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
            <p className="text-muted-foreground">Stay updated with job matches, payments, and more</p>
          </div>
          <Button variant="outline">Mark All as Read</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>You have {notifications.filter((n) => !n.read).length} unread notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <Link href={notification.link} key={notification.id}>
              <div
                className={`flex gap-4 p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-muted/50"}`}
              >
                <div className={`rounded-full p-2 ${getIconBg(notification.type)}`}>{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{notification.date}</span>
                      {!notification.read && <Badge className="h-2 w-2 rounded-full p-0 bg-primary" />}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                </div>
              </div>
            </Link>
          ))}

          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">You don't have any notifications at the moment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
