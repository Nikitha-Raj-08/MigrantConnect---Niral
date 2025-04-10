"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function WagesPage() {
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [currentJob, setCurrentJob] = useState<any>(null)
  const [issueType, setIssueType] = useState<string>("delayed")
  const [otherIssueText, setOtherIssueText] = useState<string>("")
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [selectedWage, setSelectedWage] = useState<any>(null)
  const [reportReason, setReportReason] = useState("")
  const [reportType, setReportType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showOtherIssueField, setShowOtherIssueField] = useState(false)
  const [otherIssueDescription, setOtherIssueDescription] = useState("")

  // Mock data for wages
  const currentWages = [
    {
      id: 1,
      jobTitle: "Construction Worker",
      employer: "ABC Builders",
      startDate: "01/05/2023",
      endDate: "Ongoing",
      salary: "₹15,000/month",
      paymentStatus: "Pending",
      dueDate: "30/05/2023",
    },
    {
      id: 2,
      jobTitle: "Carpenter Assistant",
      employer: "Home Solutions",
      startDate: "15/04/2023",
      endDate: "Ongoing",
      salary: "₹16,000/month",
      paymentStatus: "Paid",
      paidDate: "15/05/2023",
    },
  ]

  // Mock data for current jobs
  const currentJobs = [
    {
      id: 1,
      title: "Construction Helper",
      employer: "Metro Projects",
      location: "Delhi",
      startDate: "15 Mar 2023",
      dailyWage: "₹600",
      daysWorked: 22,
      totalEarned: "₹13,200",
      paymentStatus: "Paid",
      paymentDate: "05 Apr 2023",
    },
    {
      id: 2,
      title: "Carpenter Assistant",
      employer: "Home Solutions",
      location: "Gurgaon",
      startDate: "01 Apr 2023",
      dailyWage: "₹700",
      daysWorked: 18,
      totalEarned: "₹12,600",
      paymentStatus: "Pending",
      paymentDate: "Expected by 05 May 2023",
    },
  ]

  // Mock data for past jobs
  const pastJobs = [
    {
      id: 101,
      title: "Painter",
      employer: "Modern Homes",
      location: "Noida",
      period: "01 Jan 2023 - 28 Feb 2023",
      totalEarned: "₹32,000",
      paymentStatus: "Paid",
      paymentDate: "05 Mar 2023",
    },
    {
      id: 102,
      title: "Plumber Assistant",
      employer: "City Services",
      location: "Delhi",
      period: "15 Nov 2022 - 15 Dec 2022",
      totalEarned: "₹18,000",
      paymentStatus: "Paid",
      paymentDate: "20 Dec 2022",
    },
  ]

  const paymentHistory = [
    {
      id: 101,
      jobTitle: "Construction Helper",
      employer: "Metro Projects",
      period: "March 2023",
      amount: "₹14,500",
      paymentDate: "05/04/2023",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 102,
      jobTitle: "Construction Helper",
      employer: "Metro Projects",
      period: "February 2023",
      amount: "₹14,500",
      paymentDate: "05/03/2023",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 103,
      jobTitle: "Painter",
      employer: "Modern Homes",
      period: "January 2023",
      amount: "₹16,000",
      paymentDate: "02/02/2023",
      paymentMethod: "Cash",
    },
  ]

  const disputes = [
    {
      id: 201,
      jobTitle: "Construction Worker",
      employer: "XYZ Construction",
      period: "December 2022",
      amount: "₹15,000",
      status: "In Progress",
      filedDate: "15/01/2023",
      description: "Payment delayed by more than 30 days",
    },
  ]

  const handleReportIssue = (job: any) => {
    setCurrentJob(job)
    setShowReportDialog(true)
    setReportSubmitted(false)
    setIssueType("delayed")
    setOtherIssueText("")
  }

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the report to a backend
    setReportSubmitted(true)
  }

  const handleReportTypeChange = (value: string) => {
    setReportType(value)
    setShowOtherIssueField(value === "other")
  }

  const submitReport = () => {
    if (!reportType) return
    if (reportType === "other" && !otherIssueDescription.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after showing success message
      setTimeout(() => {
        setReportDialogOpen(false)
      }, 2000)
    }, 1500)
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
        <h2 className="text-3xl font-bold tracking-tight">My Wages</h2>
        <p className="text-muted-foreground">Track your earnings and payment status</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Month Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹31,000</div>
            <p className="text-xs text-muted-foreground">From 2 active jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹15,000</div>
            <p className="text-xs text-muted-foreground">Due on 30/05/2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings (2023)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹76,000</div>
            <p className="text-xs text-muted-foreground">From 5 jobs</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Jobs & Wages</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="past">Past Jobs & Wages</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4">
            {currentJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.employer}</CardDescription>
                    </div>
                    <Badge variant={job.paymentStatus === "Paid" ? "default" : "secondary"}>{job.paymentStatus}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm">{job.location}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Start Date</div>
                      <div className="text-sm">{job.startDate}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Daily Wage</div>
                      <div className="text-sm">{job.dailyWage}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Days Worked</div>
                      <div className="text-sm">{job.daysWorked} days</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Total Earned</div>
                        <div className="text-lg font-bold">{job.totalEarned}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Payment Date</div>
                        <div className="text-sm">{job.paymentDate}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => handleReportIssue(job)}>
                    Report Issue
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of all your past payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.jobTitle}</TableCell>
                      <TableCell>{payment.employer}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Payment Disputes</CardTitle>
                <CardDescription>Track the status of your payment disputes</CardDescription>
              </div>
              <Link href="/grievances/create">
                <Button size="sm">Report New Issue</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {disputes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Employer</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Filed Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.jobTitle}</TableCell>
                        <TableCell>{dispute.employer}</TableCell>
                        <TableCell>{dispute.period}</TableCell>
                        <TableCell>{dispute.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{dispute.status}</Badge>
                        </TableCell>
                        <TableCell>{dispute.filedDate}</TableCell>
                        <TableCell>
                          <Link href={`/grievances/${dispute.id}`}>
                            <Button variant="outline" size="sm" className="h-8">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                  <h3 className="text-lg font-medium">No Active Disputes</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    You don't have any active payment disputes. If you're experiencing issues with your payments, you
                    can report them.
                  </p>
                  <Link href="/grievances/create" className="mt-4">
                    <Button>Report Payment Issue</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4">
            {pastJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.employer}</CardDescription>
                    </div>
                    <Badge variant="default">{job.paymentStatus}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm">{job.location}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Period</div>
                      <div className="text-sm">{job.period}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Payment Date</div>
                      <div className="text-sm">{job.paymentDate}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Total Earned</div>
                        <div className="text-lg font-bold">{job.totalEarned}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Issue Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Report Wage Issue</DialogTitle>
            <DialogDescription>
              Report an issue with your wages for {currentJob?.title} at {currentJob?.employer}.
            </DialogDescription>
          </DialogHeader>

          {!reportSubmitted ? (
            <form onSubmit={handleSubmitReport}>
              <div className="grid gap-4 py-4">
                <div>
                  <Label className="mb-2 block">Issue Type</Label>
                  <RadioGroup value={issueType} onValueChange={setIssueType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delayed" id="delayed" />
                      <Label htmlFor="delayed">Delayed Payment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="incorrect" id="incorrect" />
                      <Label htmlFor="incorrect">Incorrect Amount</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other Issue</Label>
                    </div>
                  </RadioGroup>
                </div>

                {issueType === "other" && (
                  <div>
                    <Label htmlFor="other-issue-description" className="mb-2 block">
                      Please describe the issue
                    </Label>
                    <Textarea
                      id="other-issue-description"
                      placeholder="Describe your issue in detail..."
                      value={otherIssueText}
                      onChange={(e) => setOtherIssueText(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="details" className="mb-2 block">
                    Additional Details
                  </Label>
                  <Textarea id="details" placeholder="Provide any additional details about the issue..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Report</Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Report Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                Your wage issue report has been submitted. We will investigate and get back to you soon.
              </p>
              <p className="text-sm">Report Reference: REP-{Math.floor(Math.random() * 1000000)}</p>
              <Button onClick={() => setShowReportDialog(false)}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
