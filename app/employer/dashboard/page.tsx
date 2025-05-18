"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Users, AlertCircle, Plus } from "lucide-react"
import { useState } from "react"

export default function EmployerDashboard() {
  // Mock data for employer dashboard
  const employer = {
    name: "ABC Construction Company",
    id: "EMP-5678",
    location: "Delhi, India",
    contactPerson: "Amit Sharma",
    profileCompletion: 90,
    industry: "Construction",
  }

  const postedJobs = [
    {
      id: 1,
      title: "Construction Worker",
      location: "Delhi",
      applicants: 12,
      status: "Active",
      postedDate: "5 days ago",
    },
    {
      id: 2,
      title: "Site Supervisor",
      location: "Gurgaon",
      applicants: 8,
      status: "Active",
      postedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Electrician",
      location: "Noida",
      applicants: 5,
      status: "Closed",
      postedDate: "3 weeks ago",
    },
  ]

  const recentApplicants = [
    {
      id: 101,
      name: "Rajesh Kumar",
      jobTitle: "Construction Worker",
      skills: ["Construction", "Carpentry"],
      appliedDate: "2 days ago",
    },
    {
      id: 102,
      name: "Sunil Verma",
      jobTitle: "Construction Worker",
      skills: ["Construction", "Painting"],
      appliedDate: "3 days ago",
    },
    {
      id: 103,
      name: "Manoj Singh",
      jobTitle: "Site Supervisor",
      skills: ["Construction", "Management"],
      appliedDate: "1 day ago",
    },
  ]

  const [grievances, setGrievances] = useState([
    {
      id: 201,
      title: "Working Hours Dispute",
      worker: "Dinesh Patel",
      status: "New",
      filedDate: "2 days ago",
    },
  ])

  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)
  const [showApplicantDetails, setShowApplicantDetails] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employer Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {employer.name}</p>
        </div>
        <Link href="/employer/jobs/create">
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      {/* Top row with company profile and active jobs */}
      <div className="grid gap-4 grid-cols-12">
        {/* Company Profile Card - wider */}
        <Card className="col-span-9">
          <CardHeader className="flex flex-row items-center gap-4 py-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt={employer.name} />
              <AvatarFallback>
                <Building2 className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{employer.name}</CardTitle>
              <CardDescription>ID: {employer.id}</CardDescription>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" /> {employer.location}
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Contact Person</div>
                <div className="text-sm">{employer.contactPerson}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Industry</div>
                <div className="text-sm">{employer.industry}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="py-3">
            <Link href="/employer/profile">
              <Button variant="outline" size="sm">
                View Company Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Active Jobs Card */}
        <Card className="col-span-3">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{postedJobs.filter((job) => job.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">{postedJobs.length} total jobs posted</p>
          </CardContent>
          <CardFooter className="pt-0 pb-3">
            <Link href="/employer/jobs">
              <Button variant="link" size="sm" className="px-0">
                View All Jobs
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Posted Jobs</CardTitle>
              <CardDescription>Manage your job postings</CardDescription>
            </div>
            <Link href="/employer/jobs/create">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> New Job
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {postedJobs.map((job) => (
              <div key={job.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                <div className="flex justify-between">
                  <div className="font-medium">{job.title}</div>
                  <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" /> {job.location}
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-1 h-3 w-3" /> {job.applicants} applicants
                </div>
                <div className="text-xs text-muted-foreground">Posted {job.postedDate}</div>
                <div className="flex justify-end gap-2">
                  <Link href={`/employer/jobs/${job.id}/applicants`}>
                    <Button variant="outline" size="sm">
                      View Applicants
                    </Button>
                  </Link>
                  <Link href={`/employer/jobs/${job.id}`}>
                    <Button size="sm">Manage</Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/employer/jobs" className="w-full">
              <Button variant="outline" className="w-full">
                View All Jobs
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Grievances Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Grievances</CardTitle>
            <CardDescription>Recent worker grievances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {grievances.length > 0 ? (
              grievances.map((grievance) => (
                <div key={grievance.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">{grievance.title}</div>
                    <Badge variant={grievance.status === "Resolved" ? "default" : "outline"}>{grievance.status}</Badge>
                  </div>
                  <div className="text-sm">Filed by: {grievance.worker}</div>
                  <div className="text-xs text-muted-foreground">Filed {grievance.filedDate}</div>
                  <div className="flex justify-end">
                    <Link href={`/employer/grievances/${grievance.id}`}>
                      <Button size="sm">Respond</Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-muted-foreground">No active grievances</div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/employer/grievances" className="w-full">
              <Button variant="outline" className="w-full">
                View All Grievances
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {/* Recent Applicants Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-xl font-bold">Recent Applicants</CardTitle>
              <CardDescription>Latest job applications</CardDescription>
            </div>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplicants.map((applicant) => (
              <div key={applicant.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                <div className="flex justify-between">
                  <div className="font-medium">{applicant.name}</div>
                </div>
                <div className="text-sm">{applicant.jobTitle}</div>
                <div className="flex flex-wrap gap-1">
                  {applicant.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">Applied {applicant.appliedDate}</div>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedApplicant(applicant)
                      setShowApplicantDetails(true)
                    }}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/employer/applicants" className="w-full">
              <Button variant="outline" className="w-full">
                View All Applicants
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Applicant Details Dialog */}
      <Dialog open={showApplicantDetails} onOpenChange={setShowApplicantDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Applicant Profile</DialogTitle>
            <DialogDescription>Details for {selectedApplicant?.name}</DialogDescription>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {selectedApplicant.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{selectedApplicant.name}</h3>
                  <p className="text-sm">{selectedApplicant.jobTitle}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedApplicant.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Applied {selectedApplicant.appliedDate}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplicantDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
