"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function ApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [jobFilter, setJobFilter] = useState("all")
  const router = useRouter()

  // Mock applicants data
  const applicants = [
    {
      id: 101,
      name: "Rajesh Kumar",
      jobTitle: "Construction Worker",
      skills: ["Construction", "Carpentry"],
      status: "New",
      appliedDate: "2 days ago",
    },
    {
      id: 102,
      name: "Sunil Verma",
      jobTitle: "Construction Worker",
      skills: ["Construction", "Painting"],
      status: "Shortlisted",
      appliedDate: "3 days ago",
    },
    {
      id: 103,
      name: "Manoj Singh",
      jobTitle: "Site Supervisor",
      skills: ["Construction", "Management"],
      status: "Interviewed",
      appliedDate: "1 day ago",
    },
    {
      id: 104,
      name: "Dinesh Patel",
      jobTitle: "Electrician",
      skills: ["Electrical", "Wiring"],
      status: "Rejected",
      appliedDate: "5 days ago",
    },
  ]

  // Get unique job titles for filter
  const jobTitles = ["all", ...new Set(applicants.map((applicant) => applicant.jobTitle))]

  // Filter applicants based on search, status, and job
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || applicant.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesJob = jobFilter === "all" || applicant.jobTitle === jobFilter

    return matchesSearch && matchesStatus && matchesJob
  })

  const viewApplicantDetails = (applicant) => {
    router.push(`/employer/applicants/${applicant.id}`)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <Link
          href="/employer/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">All Applicants</h2>
        <p className="text-muted-foreground">View and manage all job applicants</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or skills..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interviewed">Interviewed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            {jobTitles.map((job) => (
              <SelectItem key={job} value={job}>
                {job === "all" ? "All Jobs" : job}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applicants</CardTitle>
          <CardDescription>{filteredApplicants.length} applicants found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Job Applied For</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.jobTitle}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          applicant.status === "Shortlisted" || applicant.status === "Interviewed"
                            ? "default"
                            : applicant.status === "Rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{applicant.appliedDate}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => viewApplicantDetails(applicant)}>
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No applicants found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
