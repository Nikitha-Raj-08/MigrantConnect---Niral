"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, AlertCircle, Search, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"

export default function WorkerDashboard() {
  const [showApplicationDetails, setShowApplicationDetails] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  // Mock data for worker dashboard
  const worker = {
    name: "Rajesh Kumar",
    id: "MIG-12345",
    location: "Delhi, India",
    skills: ["Construction", "Carpentry", "Painting"],
    profileCompletion: 85,
  }

  const jobRecommendations = [
    {
      id: 1,
      title: "Construction Worker",
      company: "ABC Builders",
      location: "Delhi",
      salary: "₹15,000 - ₹18,000/month",
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Carpenter",
      company: "XYZ Interiors",
      location: "Gurgaon",
      salary: "₹18,000 - ₹22,000/month",
      postedDate: "1 day ago",
    },
    {
      id: 3,
      title: "Painter",
      company: "Modern Homes",
      location: "Noida",
      salary: "₹16,000 - ₹20,000/month",
      postedDate: "3 days ago",
    },
  ]

  const activeApplications = [
    {
      id: 101,
      title: "Construction Helper",
      company: "Metro Projects",
      status: "Applied",
      appliedDate: "5 days ago",
      jobDescription:
        "Assist in construction activities including material handling, site cleanup, and basic construction tasks.",
      location: "Delhi",
      salary: "₹14,000 - ₹16,000/month",
      workingHours: "8 hours/day, 6 days/week",
      contactPerson: "Amit Sharma",
      contactEmail: "amit.sharma@metroprojects.com",
      applicationNotes: "Highlighted previous experience in construction work.",
    },
    {
      id: 102,
      title: "Carpenter Assistant",
      company: "Home Solutions",
      status: "Selected",
      appliedDate: "2 weeks ago",
      jobDescription: "Assist the lead carpenter in furniture making, repairs, and installations.",
      location: "Gurgaon",
      salary: "₹16,000 - ₹18,000/month",
      workingHours: "9 hours/day, 5 days/week",
      contactPerson: "Rahul Verma",
      contactEmail: "rahul.verma@homesolutions.com",
      applicationNotes: "Mentioned carpentry skills and experience with various tools.",
    },
  ]

  const grievances = [
    {
      id: 201,
      title: "Delayed Payment",
      company: "Previous Employer",
      status: "In Progress",
      filedDate: "1 week ago",
    },
  ]

  // Mock data for wages
  const wages = {
    currentMonth: "₹16,500",
    pendingPayments: "₹3,200",
    lastPayment: "₹8,200 (April 15, 2023)",
  }

  const viewApplicationDetails = (application: any) => {
    setSelectedApplication(application)
    setShowApplicationDetails(true)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Worker Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {worker.name}</p>
        </div>
        <Link href="/jobs">
          <Button className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" /> Find Jobs
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt={worker.name} />
              <AvatarFallback>
                {worker.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{worker.name}</CardTitle>
              <CardDescription>ID: {worker.id}</CardDescription>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" /> {worker.location}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium">Skills</div>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/profile">
              <Button variant="outline" size="sm">
                View Full Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Wages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wages.currentMonth}</div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-muted-foreground">Pending: {wages.pendingPayments}</p>
              <p className="text-xs text-muted-foreground">Last: {wages.lastPayment}</p>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="/wages">
              <Button variant="link" size="sm" className="px-0">
                View Wage Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Job Recommendations</CardTitle>
            <CardDescription>Based on your skills and experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobRecommendations.map((job) => (
              <div key={job.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                <div className="flex justify-between">
                  <div className="font-medium">{job.title}</div>
                  <Badge variant="outline">{job.postedDate}</Badge>
                </div>
                <div className="text-sm">{job.company}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" /> {job.location}
                </div>
                <div className="text-sm font-medium">{job.salary}</div>
                <div className="flex justify-end">
                  <Link href={`/jobs/${job.id}`}>
                    <Button size="sm">View Job</Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/jobs" className="w-full">
              <Button variant="outline" className="w-full">
                View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Applications</CardTitle>
            <CardDescription>Track your job applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeApplications.map((application) => (
              <div key={application.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                <div className="flex justify-between">
                  <div className="font-medium">{application.title}</div>
                  <Badge variant={application.status === "Selected" ? "default" : "secondary"}>
                    {application.status}
                  </Badge>
                </div>
                <div className="text-sm">{application.company}</div>
                <div className="text-xs text-muted-foreground">Applied {application.appliedDate}</div>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => viewApplicationDetails(application)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/applications" className="w-full">
              <Button variant="outline" className="w-full">
                View All Applications
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Grievance Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            {grievances.length > 0 ? (
              grievances.map((grievance) => (
                <div key={grievance.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">{grievance.title}</div>
                    <Badge variant={grievance.status === "Resolved" ? "default" : "outline"}>{grievance.status}</Badge>
                  </div>
                  <div className="text-sm">{grievance.company}</div>
                  <div className="text-xs text-muted-foreground">Filed {grievance.filedDate}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-muted-foreground">No active grievances</div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/grievances" className="w-full">
              <Button variant="outline" className="w-full">
                View All Grievances
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Welfare Schemes</CardTitle>
            <CardDescription>Government schemes you may be eligible for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="font-medium">PM-KISAN Scheme</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Income support of ₹6,000 per year for eligible farmer families
                </div>
                <div className="mt-2 flex justify-end">
                  <Link href="/welfare">
                    <Button size="sm">Apply Now</Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-medium">Pradhan Mantri Awas Yojana</div>
                <div className="text-sm text-muted-foreground mt-1">Housing subsidy for construction of houses</div>
                <div className="mt-2 flex justify-end">
                  <Link href="/welfare">
                    <Button size="sm" variant="outline">
                      Check Eligibility
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/welfare" className="w-full">
              <Button variant="outline" className="w-full">
                View All Schemes
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={showApplicationDetails} onOpenChange={setShowApplicationDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Details of your application for {selectedApplication?.title} at {selectedApplication?.company}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{selectedApplication.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedApplication.company}</p>
                </div>
                <Badge variant={selectedApplication.status === "Selected" ? "default" : "secondary"}>
                  {selectedApplication.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-sm">{selectedApplication.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Salary</h4>
                  <p className="text-sm">{selectedApplication.salary}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Working Hours</h4>
                  <p className="text-sm">{selectedApplication.workingHours}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Applied Date</h4>
                  <p className="text-sm">{selectedApplication.appliedDate}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Job Description</h4>
                <p className="text-sm mt-1">{selectedApplication.jobDescription}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Your Application Notes</h4>
                <p className="text-sm mt-1">{selectedApplication.applicationNotes}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                    <p className="text-sm">{selectedApplication.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm">{selectedApplication.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
