"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, AlertCircle, MessageSquare, Plus, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GrievancesPage() {
  // State for file new grievance dialog
  const [isNewGrievanceOpen, setIsNewGrievanceOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [grievanceForm, setGrievanceForm] = useState({
    title: "",
    type: "",
    employer: "",
    description: "",
  })

  // State for respond to grievance dialog
  const [isRespondDialogOpen, setIsRespondDialogOpen] = useState(false)
  const [selectedGrievance, setSelectedGrievance] = useState<any>(null)
  const [responseText, setResponseText] = useState("")
  const [responseSubmitted, setResponseSubmitted] = useState(false)

  // State for showing/hiding description
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({})

  // Mock data for grievances
  const [activeGrievances, setActiveGrievances] = useState([
    {
      id: 1,
      title: "Delayed Payment",
      employer: "XYZ Construction",
      type: "Wage Dispute",
      status: "In Progress",
      filedDate: "15/05/2023",
      lastUpdated: "20/05/2023",
      description:
        "Payment delayed by more than 30 days for April work. I have contacted the site supervisor multiple times but have not received any clear answer about when I will be paid. I need this payment urgently as I have family expenses to cover.",
      responses: [
        {
          from: "Employer",
          message: "We are looking into this issue and will process the payment soon.",
          date: "20/05/2023",
        },
      ],
    },
    {
      id: 2,
      title: "Safety Equipment Not Provided",
      employer: "ABC Builders",
      type: "Safety Concern",
      status: "New",
      filedDate: "22/05/2023",
      lastUpdated: "22/05/2023",
      description:
        "I have been working at the construction site for 2 weeks now, and despite multiple requests, I have not been provided with proper safety equipment like helmet, gloves, and safety boots. This is putting my safety at risk, especially when working at heights.",
      responses: [],
    },
  ])

  const resolvedGrievances = [
    {
      id: 101,
      title: "Unsafe Working Conditions",
      employer: "ABC Builders",
      type: "Safety Concern",
      status: "Resolved",
      filedDate: "10/03/2023",
      resolvedDate: "25/03/2023",
      description:
        "Lack of safety equipment at the construction site. Workers were required to work at heights without proper harnesses or safety nets. There was also inadequate lighting in certain areas making it difficult to see potential hazards.",
      resolution: "Employer provided all necessary safety equipment",
    },
    {
      id: 102,
      title: "Incorrect Wage Calculation",
      employer: "Metro Projects",
      type: "Wage Dispute",
      status: "Resolved",
      filedDate: "05/02/2023",
      resolvedDate: "15/02/2023",
      description:
        "Overtime hours not included in January payment. I worked an additional 12 hours over the standard working hours, but these were not accounted for in my payment. I have time sheets signed by my supervisor to prove these hours.",
      resolution: "Employer recalculated wages and paid the difference",
    },
  ]
  )

  // Handle form input changes for new grievance
  const handleInputChange = (field: string, value: string) => {
    setGrievanceForm({
      ...grievanceForm,
      [field]: value,
    })
  }

  // Handle new grievance submission
  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Add new grievance to active grievances
      const newGrievance = {
        id: Date.now(),
        title: grievanceForm.title,
        employer: grievanceForm.employer,
        type: grievanceForm.type,
        status: "New",
        filedDate: new Date().toLocaleDateString(),
        lastUpdated: new Date().toLocaleDateString(),
        description: grievanceForm.description,
        responses: [],
      }

      setActiveGrievances([newGrievance, ...activeGrievances])
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after showing success message
      setTimeout(() => {
        setIsSuccess(false)
        setIsNewGrievanceOpen(false)
        setGrievanceForm({
          title: "",
          type: "",
          employer: "",
          description: "",
        })
      }, 2000)
    }, 1500)
  }

  // Handle opening respond dialog
  const handleOpenRespondDialog = (grievance: any) => {
    setSelectedGrievance(grievance)
    setIsRespondDialogOpen(true)
    setResponseText("")
    setResponseSubmitted(false)
  }

  // Handle response submission
  const handleSubmitResponse = () => {
    if (!responseText.trim()) return
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Add response to the grievance
      const updatedGrievances = activeGrievances.map((grievance) => {
        if (grievance.id === selectedGrievance.id) {
          return {
            ...grievance,
            responses: [
              ...grievance.responses,
              {
                from: "Worker",
                message: responseText,
                date: new Date().toLocaleDateString(),
              },
            ],
            lastUpdated: new Date().toLocaleDateString(),
          }
        }
        return grievance
      })

      setActiveGrievances(updatedGrievances)
      setIsSubmitting(false)
      setResponseSubmitted(true)

      // Reset after showing success message
      setTimeout(() => {
        setIsRespondDialogOpen(false)
        setResponseSubmitted(false)
      }, 2000)
    }, 1500)
  }

  // Toggle description expansion
  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Mark a grievance as resolved
  const markAsResolved = (id: number) => {
    const grievanceToResolve = activeGrievances.find((g) => g.id === id)

    if (grievanceToResolve) {
      // Remove from active grievances
      setActiveGrievances(activeGrievances.filter((g) => g.id !== id))

      // Add to resolved grievances with resolution details
      const resolvedGrievance = {
        ...grievanceToResolve,
        status: "Resolved",
        resolvedDate: new Date().toLocaleDateString(),
        resolution: "Marked as resolved by worker",
      }

      // In a real app, this would be an API call
      // For now, we're just updating our local state
      // This is simplified - in real app you might need to refresh data from API
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
            <h2 className="text-3xl font-bold tracking-tight">Grievances</h2>
            <p className="text-muted-foreground">Report and track issues with employers</p>
          </div>
          <Button onClick={() => setIsNewGrievanceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> File New Grievance
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Grievances</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Grievances</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeGrievances.length > 0 ? (
            activeGrievances.map((grievance) => (
              <Card key={grievance.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {grievance.title}
                        <Badge variant="outline">{grievance.type}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Filed against {grievance.employer} on {grievance.filedDate}
                      </CardDescription>
                    </div>
                    <Badge
                      className="w-fit"
                      variant={
                        grievance.status === "New"
                          ? "default"
                          : grievance.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {grievance.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {expandedDescriptions[grievance.id]
                        ? grievance.description
                        : grievance.description.length > 100
                          ? `${grievance.description.slice(0, 100)}...`
                          : grievance.description}
                    </p>
                    {grievance.description.length > 100 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-8 px-2 text-xs"
                        onClick={() => toggleDescription(grievance.id)}
                      >
                        {expandedDescriptions[grievance.id] ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" /> Show More
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Responses</h4>
                    {grievance.responses.length > 0 ? (
                      grievance.responses.map((response, index) => (
                        <div key={index} className="rounded-lg border p-3 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{response.from}</span>
                            <span className="text-xs text-muted-foreground">{response.date}</span>
                          </div>
                          <p className="text-sm">{response.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No responses yet</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 justify-between">
                  <div className="text-sm text-muted-foreground">Last updated: {grievance.lastUpdated}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-1" onClick={() => handleOpenRespondDialog(grievance)}>
                      <MessageSquare className="h-4 w-4" /> Respond
                    </Button>
                    <Link href={`/grievances/${grievance.id}`}>
                      <Button variant="secondary">View Details</Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="gap-1 text-green-600 hover:text-green-700 border-green-600 hover:bg-green-50"
                      onClick={() => markAsResolved(grievance.id)}
                    >
                      <CheckCircle className="h-4 w-4" /> Mark Resolved
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No Active Grievances</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  You don't have any active grievances. If you're experiencing issues with your employer, you can file a
                  new grievance.
                </p>
                <Button className="mt-4" onClick={() => setIsNewGrievanceOpen(true)}>
                  File New Grievance
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedGrievances.length > 0 ? (
            resolvedGrievances.map((grievance) => (
              <Card key={grievance.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {grievance.title}
                        <Badge variant="outline">{grievance.type}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Filed against {grievance.employer} on {grievance.filedDate}
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="w-fit bg-green-500">
                      {grievance.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {expandedDescriptions[grievance.id]
                        ? grievance.description
                        : grievance.description.length > 100
                          ? `${grievance.description.slice(0, 100)}...`
                          : grievance.description}
                    </p>
                    {grievance.description.length > 100 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-8 px-2 text-xs"
                        onClick={() => toggleDescription(grievance.id)}
                      >
                        {expandedDescriptions[grievance.id] ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" /> Show More
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Resolution</h4>
                    <p className="text-sm text-muted-foreground">{grievance.resolution}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Resolved on: {grievance.resolvedDate}</div>
                  <Link href={`/grievances/${grievance.id}`}>
                    <Button variant="secondary">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No Resolved Grievances</h3>
                <p className="text-sm text-muted-foreground mt-1">You don't have any resolved grievances yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* File New Grievance Dialog */}
      <Dialog open={isNewGrievanceOpen} onOpenChange={setIsNewGrievanceOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-medium text-center">Grievance Submitted Successfully!</h3>
              <p className="text-center text-muted-foreground max-w-md">
                Your grievance has been submitted. You can track its status on the grievances page.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>File a Grievance</DialogTitle>
                <DialogDescription>
                  Report an issue with your employer. Please provide all the necessary details.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmitGrievance} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Grievance Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Delayed Payment, Unsafe Working Conditions"
                    value={grievanceForm.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Grievance Type</Label>
                  <Select
                    value={grievanceForm.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select grievance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wage Dispute">Wage Dispute</SelectItem>
                      <SelectItem value="Safety Concern">Safety Concern</SelectItem>
                      <SelectItem value="Harassment">Harassment</SelectItem>
                      <SelectItem value="Job Termination">Job Termination</SelectItem>
                      <SelectItem value="Working Hours">Working Hours</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employer">Employer Name</Label>
                  <Input
                    id="employer"
                    placeholder="Enter the employer's name"
                    value={grievanceForm.employer}
                    onChange={(e) => handleInputChange("employer", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about the issue, including dates, times, and any relevant information"
                    rows={5}
                    value={grievanceForm.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsNewGrievanceOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Grievance"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Respond to Grievance Dialog */}
      <Dialog open={isRespondDialogOpen} onOpenChange={setIsRespondDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Respond to Grievance</DialogTitle>
            <DialogDescription>
              Add your response to this grievance. This will be visible to the admin and the employer.
            </DialogDescription>
          </DialogHeader>

          {responseSubmitted ? (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Response Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                Your response has been submitted. The admin will review it and take appropriate action.
              </p>
              <Button onClick={() => setIsRespondDialogOpen(false)}>Close</Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="response">Your Response</Label>
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
                <Button variant="outline" onClick={() => setIsRespondDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitResponse} disabled={isSubmitting || !responseText.trim()}>
                  {isSubmitting ? "Submitting..." : "Submit Response"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
