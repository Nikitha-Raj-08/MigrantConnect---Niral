"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Calendar, Building2, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showApplicationDetails, setShowApplicationDetails] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  // Mock data for applications
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
    {
      id: 103,
      title: "Painter",
      company: "Modern Homes",
      status: "Under Review",
      appliedDate: "1 week ago",
      jobDescription: "Painting of interior and exterior surfaces, preparation of surfaces, and cleanup.",
      location: "Noida",
      salary: "₹15,000 - ₹17,000/month",
      workingHours: "8 hours/day, 6 days/week",
      contactPerson: "Priya Singh",
      contactEmail: "priya.singh@modernhomes.com",
      applicationNotes: "Emphasized experience with different types of paints and surface preparation.",
    },
  ]

  const pastApplications = [
    {
      id: 201,
      title: "Construction Worker",
      company: "ABC Builders",
      status: "Rejected",
      appliedDate: "2 months ago",
      jobDescription:
        "General construction work including carrying materials, mixing cement, and assisting skilled workers.",
      location: "Delhi",
      salary: "₹15,000 - ₹18,000/month",
      workingHours: "9 hours/day, 6 days/week",
      contactPerson: "Rajiv Kumar",
      contactEmail: "rajiv.kumar@abcbuilders.com",
      applicationNotes: "Highlighted physical strength and previous construction experience.",
    },
    {
      id: 202,
      title: "Plumber Assistant",
      company: "Water Works",
      status: "Completed",
      appliedDate: "3 months ago",
      endDate: "1 month ago",
      jobDescription: "Assist lead plumber in installation and repair of plumbing systems.",
      location: "Ghaziabad",
      salary: "₹14,000 - ₹16,000/month",
      workingHours: "8 hours/day, 6 days/week",
      contactPerson: "Sanjay Verma",
      contactEmail: "sanjay.verma@waterworks.com",
      applicationNotes: "Mentioned basic knowledge of plumbing tools and systems.",
    },
  ]

  // Filter applications based on search and status
  const filteredActiveApplications = activeApplications.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const filteredPastApplications = pastApplications.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const viewApplicationDetails = (application: any) => {
    setSelectedApplication(application)
    setShowApplicationDetails(true)
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
        <h2 className="text-3xl font-bold tracking-tight">My Applications</h2>
        <p className="text-muted-foreground">Track and manage your job applications</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by job title or company..."
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
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="under review">Under Review</SelectItem>
            <SelectItem value="selected">Selected</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Applications</TabsTrigger>
          <TabsTrigger value="past">Past Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Applications</CardTitle>
              <CardDescription>Applications that are currently in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActiveApplications.length > 0 ? (
                    filteredActiveApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.title}</TableCell>
                        <TableCell>{application.company}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              application.status === "Selected"
                                ? "default"
                                : application.status === "Applied"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => viewApplicationDetails(application)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No active applications found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Applications</CardTitle>
              <CardDescription>Applications that have been completed or rejected</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPastApplications.length > 0 ? (
                    filteredPastApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.title}</TableCell>
                        <TableCell>{application.company}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <Badge variant={application.status === "Completed" ? "default" : "destructive"}>
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => viewApplicationDetails(application)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No past applications found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
                <Badge
                  variant={
                    selectedApplication.status === "Selected" || selectedApplication.status === "Completed"
                      ? "default"
                      : selectedApplication.status === "Rejected"
                        ? "destructive"
                        : selectedApplication.status === "Applied"
                          ? "outline"
                          : "secondary"
                  }
                >
                  {selectedApplication.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {selectedApplication.location}
                  </p>
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
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {selectedApplication.appliedDate}
                  </p>
                </div>
                {selectedApplication.endDate && (
                  <div>
                    <h4 className="text-sm font-medium">End Date</h4>
                    <p className="text-sm">{selectedApplication.endDate}</p>
                  </div>
                )}
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
                    <p className="text-sm flex items-center gap-1">
                      <Building2 className="h-3 w-3" /> {selectedApplication.contactPerson}
                    </p>
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
