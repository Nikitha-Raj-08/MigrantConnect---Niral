"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GrievanceDetailPage({ params }: { params: { id: string } }) {
  const [showRespondDialog, setShowRespondDialog] = useState(false)
  const [responseText, setResponseText] = useState("")
  const [responseSubmitted, setResponseSubmitted] = useState(false)
  const [showAcknowledgeDialog, setShowAcknowledgeDialog] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)
  // Update the useState initialization to use a function that looks up the grievance by ID
  const [grievance, setGrievance] = useState(() => {
    // This would be an API call in a real app
    // For now, we'll use mock data based on the ID
    const id = params.id

    // Mock data for different grievances
    const grievancesData = {
      "1": {
        id: "1",
        title: "Delayed Payment Issue",
        description:
          "I have not received my payment for the work completed at Metro Projects from March 1-15, 2023. The payment was due on April 1, 2023, but it's been over a week and I haven't received it yet. I have contacted the employer multiple times but haven't received a clear response.",
        status: "In Progress",
        filedDate: "April 8, 2023",
        employer: "Metro Projects",
        jobTitle: "Construction Helper",
        workPeriod: "March 1-15, 2023",
        amountDue: "₹8,400",
        communications: [
          {
            sender: "Worker",
            message: "I have not received my payment yet. Please look into this matter.",
            timestamp: "April 8, 2023, 10:30 AM",
          },
          {
            sender: "Admin",
            message: "We have received your grievance and are looking into it. We will contact the employer.",
            timestamp: "April 8, 2023, 2:15 PM",
          },
          {
            sender: "Admin",
            message:
              "We have contacted the employer and they have acknowledged the delay. They have promised to process the payment within 2 days.",
            timestamp: "April 9, 2023, 11:45 AM",
          },
        ],
      },
      "2": {
        id: "2",
        title: "Safety Equipment Not Provided",
        description:
          "I have been working at the construction site for 2 weeks now, and despite multiple requests, I have not been provided with proper safety equipment like helmet, gloves, and safety boots. This is putting my safety at risk, especially when working at heights.",
        status: "New",
        filedDate: "May 22, 2023",
        employer: "ABC Builders",
        jobTitle: "Construction Worker",
        workPeriod: "May 8-22, 2023",
        amountDue: "N/A",
        communications: [],
      },
      "101": {
        id: "101",
        title: "Unsafe Working Conditions",
        description:
          "Lack of safety equipment at the construction site. Workers were required to work at heights without proper harnesses or safety nets. There was also inadequate lighting in certain areas making it difficult to see potential hazards.",
        status: "Resolved",
        filedDate: "March 10, 2023",
        resolvedDate: "March 25, 2023",
        employer: "ABC Builders",
        jobTitle: "Site Worker",
        workPeriod: "February 15 - March 10, 2023",
        amountDue: "N/A",
        resolution: "Employer provided all necessary safety equipment",
        communications: [
          {
            sender: "Worker",
            message: "I'm concerned about the lack of safety equipment at the site.",
            timestamp: "March 10, 2023, 9:15 AM",
          },
          {
            sender: "Admin",
            message: "We've notified the employer about this safety concern.",
            timestamp: "March 11, 2023, 11:30 AM",
          },
          {
            sender: "Employer",
            message: "We will provide all necessary safety equipment by next week.",
            timestamp: "March 15, 2023, 2:45 PM",
          },
          {
            sender: "Worker",
            message: "I've received the safety equipment. Thank you for addressing this issue.",
            timestamp: "March 22, 2023, 10:20 AM",
          },
        ],
      },
      "102": {
        id: "102",
        title: "Incorrect Wage Calculation",
        description:
          "Overtime hours not included in January payment. I worked an additional 12 hours over the standard working hours, but these were not accounted for in my payment. I have time sheets signed by my supervisor to prove these hours.",
        status: "Resolved",
        filedDate: "February 5, 2023",
        resolvedDate: "February 15, 2023",
        employer: "Metro Projects",
        jobTitle: "Electrician",
        workPeriod: "January 1-31, 2023",
        amountDue: "₹3,600 (for overtime)",
        resolution: "Employer recalculated wages and paid the difference",
        communications: [
          {
            sender: "Worker",
            message: "My overtime hours were not included in my January payment.",
            timestamp: "February 5, 2023, 8:45 AM",
          },
          {
            sender: "Admin",
            message: "We're reviewing your timesheet and will contact the employer.",
            timestamp: "February 6, 2023, 1:20 PM",
          },
          {
            sender: "Employer",
            message: "We've verified the overtime hours and will process the additional payment.",
            timestamp: "February 10, 2023, 3:30 PM",
          },
        ],
      },
    }

    // Return the grievance data for the requested ID, or a default if not found
    return (
      grievancesData[id] || {
        id: params.id,
        title: "Grievance Details",
        description: "Grievance details not found.",
        status: "Unknown",
        filedDate: "Unknown",
        employer: "Unknown",
        jobTitle: "Unknown",
        workPeriod: "Unknown",
        amountDue: "Unknown",
        communications: [],
      }
    )
  })

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault()

    // Add the new response to communications
    const newCommunication = {
      sender: "Worker",
      message: responseText,
      timestamp: new Date().toLocaleString(),
    }

    setGrievance({
      ...grievance,
      communications: [...grievance.communications, newCommunication],
    })

    setResponseText("")
    setResponseSubmitted(true)
  }

  const markAsResolved = () => {
    setGrievance({
      ...grievance,
      status: "Resolved",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/grievances"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to grievances
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Grievance Details</h2>
          <p className="text-muted-foreground">Grievance ID: {grievance.id}</p>
        </div>
        <Badge
          variant={
            grievance.status === "Resolved" ? "default" : grievance.status === "In Progress" ? "secondary" : "outline"
          }
        >
          {grievance.status}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{grievance.title}</CardTitle>
            <CardDescription>Filed on {grievance.filedDate}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">{grievance.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Employer</h3>
                <p className="text-sm text-muted-foreground">{grievance.employer}</p>
              </div>
              <div>
                <h3 className="font-medium">Job Title</h3>
                <p className="text-sm text-muted-foreground">{grievance.jobTitle}</p>
              </div>
              <div>
                <h3 className="font-medium">Work Period</h3>
                <p className="text-sm text-muted-foreground">{grievance.workPeriod}</p>
              </div>
              <div>
                <h3 className="font-medium">Amount Due</h3>
                <p className="text-sm text-muted-foreground">{grievance.amountDue}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button onClick={() => setShowRespondDialog(true)}>Respond</Button>
              {grievance.status === "Resolved" && !acknowledged && (
                <Button variant="outline" onClick={() => setShowAcknowledgeDialog(true)}>
                  Acknowledge Resolution
                </Button>
              )}
              {grievance.status !== "Resolved" && (
                <Button variant="outline" onClick={() => markAsResolved()}>
                  <CheckCircle className="h-4 w-4 mr-2" /> Mark as Resolved
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication History</CardTitle>
            <CardDescription>All messages related to this grievance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grievance.communications.map((communication, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    communication.sender === "Worker" ? "bg-muted ml-6" : "bg-primary/10 mr-6"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{communication.sender}</span>
                    <span className="text-xs text-muted-foreground">{communication.timestamp}</span>
                  </div>
                  <p className="text-sm">{communication.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Respond Dialog */}
      <Dialog open={showRespondDialog} onOpenChange={setShowRespondDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Respond to Grievance</DialogTitle>
            <DialogDescription>
              Add your response to this grievance. This will be visible to the admin and the employer.
            </DialogDescription>
          </DialogHeader>

          {!responseSubmitted ? (
            <form onSubmit={handleSubmitResponse}>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="response" className="mb-2 block">
                    Your Response
                  </Label>
                  <Textarea
                    id="response"
                    placeholder="Type your response here..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Response</Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Response Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                Your response has been submitted. The admin will review it and take appropriate action.
              </p>
              <Button
                onClick={() => {
                  setShowRespondDialog(false)
                  setResponseSubmitted(false)
                }}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Acknowledge Resolution Dialog */}
      <Dialog open={showAcknowledgeDialog} onOpenChange={setShowAcknowledgeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Acknowledge Resolution</DialogTitle>
            <DialogDescription>
              The employer has marked this grievance as resolved. Please confirm if you are satisfied with the
              resolution.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback (Optional)</Label>
                <Textarea id="feedback" placeholder="Provide any feedback about the resolution..." rows={4} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAcknowledgeDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setAcknowledged(true)
                setShowAcknowledgeDialog(false)
                setGrievance({ ...grievance, status: "Resolved" })
              }}
            >
              Acknowledge Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
