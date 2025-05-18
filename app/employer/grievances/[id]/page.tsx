"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, Clock, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function GrievanceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [response, setResponse] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isResolved, setIsResolved] = useState(false)

  // Mock data for the grievance
  const grievance = {
    id: params.id,
    title: "Working Hours Dispute",
    description:
      "I have been consistently asked to work more than the agreed 8 hours per day without overtime compensation. This has been happening for the past 3 weeks.",
    worker: {
      id: "W12345",
      name: "Dinesh Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Open",
    filedDate: "May 10, 2025",
    category: "Working Conditions",
    location: "Delhi Construction Site",
    communications: [
      {
        id: 1,
        sender: "worker",
        message:
          "I have been consistently asked to work more than the agreed 8 hours per day without overtime compensation. This has been happening for the past 3 weeks.",
        timestamp: "May 10, 2025, 10:30 AM",
      },
      {
        id: 2,
        sender: "employer",
        message:
          "Thank you for bringing this to our attention. We'll investigate this matter with the site supervisor and get back to you soon.",
        timestamp: "May 10, 2025, 2:15 PM",
      },
      {
        id: 3,
        sender: "worker",
        message:
          "It's been three days and the situation hasn't improved. Yesterday I worked 11 hours again without any overtime pay.",
        timestamp: "May 13, 2025, 9:45 AM",
      },
    ],
  }

  const handleSubmitResponse = () => {
    if (response.trim()) {
      // In a real app, this would send the response to an API
      console.log("Submitting response:", response)
      setResponse("")
      // Show confirmation dialog
      setShowConfirmation(true)
    }
  }

  const handleResolveGrievance = () => {
    // In a real app, this would update the grievance status via API
    console.log("Marking grievance as resolved")
    setIsResolved(true)
    setShowConfirmation(false)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Link href="/employer/grievances">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Grievance Details</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{grievance.title}</CardTitle>
                  <CardDescription>Filed on {grievance.filedDate}</CardDescription>
                </div>
                <Badge variant={isResolved ? "default" : "outline"}>{isResolved ? "Resolved" : grievance.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={grievance.worker.avatar || "/placeholder.svg"} alt={grievance.worker.name} />
                    <AvatarFallback>
                      {grievance.worker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{grievance.worker.name}</div>
                    <div className="text-sm text-muted-foreground">Worker ID: {grievance.worker.id}</div>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="text-lg font-medium">Communication History</h3>
                  <div className="space-y-4">
                    {grievance.communications.map((comm) => (
                      <div
                        key={comm.id}
                        className={`flex ${comm.sender === "employer" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            comm.sender === "employer" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{comm.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              comm.sender === "employer" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {comm.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Respond to Grievance</CardTitle>
              <CardDescription>Your response will be sent to the worker who filed this grievance</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type your response here..."
                className="min-h-[120px]"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                disabled={isResolved}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              {!isResolved && (
                <Button variant="outline" onClick={() => handleResolveGrievance()}>
                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as Resolved
                </Button>
              )}
              <Button onClick={handleSubmitResponse} disabled={!response.trim() || isResolved}>
                <Send className="mr-2 h-4 w-4" /> Send Response
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grievance Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Category</h3>
                <p className="text-sm">{grievance.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Location</h3>
                <p className="text-sm">{grievance.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Status</h3>
                <div className="flex items-center gap-2 mt-1">
                  {isResolved ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Resolved</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">{grievance.status}</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">Filed Date</h3>
                <p className="text-sm">{grievance.filedDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Worker Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={grievance.worker.avatar || "/placeholder.svg"} alt={grievance.worker.name} />
                  <AvatarFallback>
                    {grievance.worker.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{grievance.worker.name}</div>
                  <div className="text-sm text-muted-foreground">Worker ID: {grievance.worker.id}</div>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Worker Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Response Sent</DialogTitle>
            <DialogDescription>Your response has been sent to the worker.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Would you like to mark this grievance as resolved?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Keep Open
            </Button>
            <Button onClick={handleResolveGrievance}>Mark as Resolved</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
