"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Download, Mail, Phone, Calendar, MapPin, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu } from "lucide-react"

export default function JobApplicantsPage() {
  const params = useParams()
  const jobId = params.id

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showApplicantDetails, setShowApplicantDetails] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)
  const [showManageOptions, setShowManageOptions] = useState(false)
  const [operationSuccess, setOperationSuccess] = useState(false)
  const [operationMessage, setOperationMessage] = useState("")

  const handleApplicantOperation = (applicantId: number, operation: string) => {
    // Close the management options dialog
    setShowManageOptions(false)

    // Simulate performing the operation
    let message = ""

    switch (operation) {
      case "shortlist":
        message = "Applicant has been shortlisted successfully"
        break
      case "interview":
        message = "Applicant has been marked as interviewed"
        break
      case "reject":
        message = "Applicant has been rejected"
        break
      default:
        return
    }

    // Show success message
    setOperationMessage(message)
    setOperationSuccess(true)
  }

  // Update the job data to use the jobId parameter
  const job = (() => {
    // This would be an API call in a real app
    // For now, we'll use mock data based on the ID
    const jobsData = {
      "1": {
        id: "1",
        title: "Construction Worker",
        location: "Delhi",
        type: "Full-time",
        salary: "₹15,000 - ₹18,000/month",
        applicants: 12,
        status: "Active",
        postedDate: "5 days ago",
      },
      "2": {
        id: "2",
        title: "Site Supervisor",
        location: "Gurgaon",
        type: "Full-time",
        salary: "₹25,000 - ₹30,000/month",
        applicants: 8,
        status: "Active",
        postedDate: "1 week ago",
      },
      "3": {
        id: "3",
        title: "Electrician",
        location: "Noida",
        type: "Contract",
        salary: "₹20,000 - ₹22,000/month",
        applicants: 5,
        status: "Closed",
        postedDate: "3 weeks ago",
      },
      "4": {
        id: "4",
        title: "Painter",
        location: "Delhi",
        type: "Part-time",
        salary: "₹12,000 - ₹15,000/month",
        applicants: 7,
        status: "Active",
        postedDate: "2 days ago",
      },
    }

    return (
      jobsData[jobId as string] || {
        id: jobId,
        title: "Unknown Job",
        location: "Unknown",
        type: "Unknown",
        salary: "Unknown",
        applicants: 0,
        status: "Unknown",
        postedDate: "Unknown",
      }
    )
  })()

  // Update the applicants data to be job-specific
  const applicants = (() => {
    // This would be an API call in a real app
    // For now, we'll use mock data based on the job ID
    const applicantsData = {
      "1": [
        {
          id: 101,
          name: "Rajesh Kumar",
          age: 28,
          location: "Delhi",
          experience: "3 years",
          skills: ["Construction", "Carpentry", "Painting"],
          status: "New",
          appliedDate: "2 days ago",
          phone: "+91 9876543210",
          email: "rajesh.kumar@example.com",
          education: "10th Standard",
          languages: ["Hindi", "English (Basic)"],
          previousEmployers: ["ABC Builders", "XYZ Construction"],
          applicationNote: "I have experience in construction work and can handle various tasks on the site.",
          documents: ["Aadhaar Card", "Resume", "Work Certificate"],
        },
        {
          id: 102,
          name: "Sunil Verma",
          age: 32,
          location: "Gurgaon",
          experience: "5 years",
          skills: ["Construction", "Masonry", "Plumbing"],
          status: "Shortlisted",
          appliedDate: "3 days ago",
          phone: "+91 9876543211",
          email: "sunil.verma@example.com",
          education: "12th Standard",
          languages: ["Hindi", "English", "Punjabi"],
          previousEmployers: ["Metro Projects", "City Builders"],
          applicationNote: "I am skilled in masonry and have worked on multiple construction projects.",
          documents: ["Aadhaar Card", "Resume", "Work Certificate"],
        },
      ],
      "2": [
        {
          id: 201,
          name: "Amit Singh",
          age: 35,
          location: "Gurgaon",
          experience: "8 years",
          skills: ["Site Management", "Team Leadership", "Safety Protocols"],
          status: "Interviewed",
          appliedDate: "4 days ago",
          phone: "+91 9876543220",
          email: "amit.singh@example.com",
          education: "Diploma in Civil Engineering",
          languages: ["Hindi", "English", "Punjabi"],
          previousEmployers: ["Major Constructions", "Urban Developers"],
          applicationNote: "I have extensive experience managing construction sites and teams of up to 50 workers.",
          documents: ["Aadhaar Card", "Resume", "Experience Certificate", "Diploma Certificate"],
        },
        {
          id: 202,
          name: "Pradeep Kumar",
          age: 40,
          location: "Delhi",
          experience: "12 years",
          skills: ["Construction Management", "Budgeting", "Quality Control"],
          status: "Shortlisted",
          appliedDate: "5 days ago",
          phone: "+91 9876543221",
          email: "pradeep.kumar@example.com",
          education: "B.Tech in Civil Engineering",
          languages: ["Hindi", "English"],
          previousEmployers: ["National Builders", "Prime Construction Co."],
          applicationNote:
            "I bring over a decade of experience in supervising construction projects of various scales.",
          documents: ["Aadhaar Card", "Resume", "Engineering Degree", "Work Certificates"],
        },
      ],
      "3": [
        {
          id: 301,
          name: "Ramesh Sharma",
          age: 30,
          location: "Noida",
          experience: "6 years",
          skills: ["Electrical Wiring", "Circuit Installation", "Troubleshooting"],
          status: "New",
          appliedDate: "3 days ago",
          phone: "+91 9876543230",
          email: "ramesh.sharma@example.com",
          education: "ITI Electrical",
          languages: ["Hindi", "English (Basic)"],
          previousEmployers: ["Power Solutions", "Electrical Works Ltd."],
          applicationNote: "I am a certified electrician with experience in both residential and commercial projects.",
          documents: ["Aadhaar Card", "Resume", "ITI Certificate", "Work Experience Letter"],
        },
      ],
      "4": [
        {
          id: 401,
          name: "Suresh Patel",
          age: 25,
          location: "Delhi",
          experience: "4 years",
          skills: ["Painting", "Wall Preparation", "Texture Finishing"],
          status: "New",
          appliedDate: "1 day ago",
          phone: "+91 9876543240",
          email: "suresh.patel@example.com",
          education: "8th Standard",
          languages: ["Hindi", "Gujarati"],
          previousEmployers: ["Color Masters", "Perfect Finish Painters"],
          applicationNote: "I specialize in interior and exterior painting with attention to detail.",
          documents: ["Aadhaar Card", "Resume", "Work Certificate"],
        },
        {
          id: 402,
          name: "Kamal Kishore",
          age: 28,
          location: "Delhi",
          experience: "5 years",
          skills: ["Painting", "Wallpaper Installation", "Color Mixing"],
          status: "Shortlisted",
          appliedDate: "2 days ago",
          phone: "+91 9876543241",
          email: "kamal.kishore@example.com",
          education: "10th Standard",
          languages: ["Hindi", "English (Basic)"],
          previousEmployers: ["Decor Solutions", "Prime Painters"],
          applicationNote: "I have experience in both residential and commercial painting projects.",
          documents: ["Aadhaar Card", "Resume", "Work Certificate"],
        },
      ],
    }

    return applicantsData[jobId as string] || []
  })()

  // Filter applicants based on search and status
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || applicant.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const viewApplicantDetails = (applicant: any) => {
    setSelectedApplicant(applicant)
    setShowApplicantDetails(true)
  }

  const updateApplicantStatus = (applicantId: number, newStatus: string) => {
    // In a real app, you would update the status in your database
    console.log(`Updating applicant ${applicantId} status to ${newStatus}`)

    // Close the dialog
    setShowApplicantDetails(false)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <Link
          href="/employer/jobs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Applicants for {job.title}</h2>
        <p className="text-muted-foreground">
          {filteredApplicants.length} applicants • Posted {job.postedDate}
        </p>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Applicants</CardTitle>
          <CardDescription>Review and manage job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.experience}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{applicant.appliedDate}</TableCell>
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
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewApplicantDetails(applicant)}>
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedApplicant(applicant)
                            setShowManageOptions(true)
                          }}
                        >
                          <Menu className="h-4 w-4 mr-1" /> Manage
                        </Button>
                      </div>
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

      {/* Applicant Details Dialog */}
      <Dialog open={showApplicantDetails} onOpenChange={setShowApplicantDetails}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Applicant Details</DialogTitle>
            <DialogDescription>Review application for {job.title}</DialogDescription>
          </DialogHeader>
          {selectedApplicant && (
            <div className="py-4">
              <div className="space-y-4 pt-4 max-h-[600px] overflow-y-auto">
                {/* Profile Section */}
                <section className="space-y-4">
                  <h4 className="text-lg font-medium">Profile</h4>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={selectedApplicant.name} />
                      <AvatarFallback>
                        {selectedApplicant.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{selectedApplicant.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedApplicant.age} years old</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{selectedApplicant.location}</span>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Badge
                        variant={
                          selectedApplicant.status === "Shortlisted" || selectedApplicant.status === "Interviewed"
                            ? "default"
                            : selectedApplicant.status === "Rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {selectedApplicant.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div>
                      <h4 className="text-sm font-medium">Contact Information</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedApplicant.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedApplicant.email}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Education</h4>
                      <p className="text-sm mt-2">{selectedApplicant.education}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedApplicant.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium">Languages</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedApplicant.languages.map((language: string) => (
                        <Badge key={language} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium">Previous Employers</h4>
                    <ul className="mt-2 space-y-1">
                      {selectedApplicant.previousEmployers.map((employer: string, index: number) => (
                        <li key={index} className="text-sm">
                          • {employer}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Application Section */}
                <section className="space-y-4 border-t pt-4">
                  <h4 className="text-lg font-medium">Application</h4>
                  <div>
                    <h4 className="text-sm font-medium">Application Note</h4>
                    <p className="text-sm mt-2">{selectedApplicant.applicationNote}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium">Application Details</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Applied For</p>
                        <p className="text-sm">{job.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Applied Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{selectedApplicant.appliedDate}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="text-sm">{selectedApplicant.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Status</p>
                        <Badge
                          variant={
                            selectedApplicant.status === "Shortlisted" || selectedApplicant.status === "Interviewed"
                              ? "default"
                              : selectedApplicant.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className="mt-1"
                        >
                          {selectedApplicant.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium">Update Application Status</h4>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant={selectedApplicant.status === "Shortlisted" ? "default" : "outline"}
                        onClick={() => updateApplicantStatus(selectedApplicant.id, "Shortlisted")}
                      >
                        Shortlist
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedApplicant.status === "Interviewed" ? "default" : "outline"}
                        onClick={() => updateApplicantStatus(selectedApplicant.id, "Interviewed")}
                      >
                        Mark as Interviewed
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedApplicant.status === "Rejected" ? "destructive" : "outline"}
                        onClick={() => updateApplicantStatus(selectedApplicant.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </section>

                {/* Documents Section */}
                <section className="space-y-4 border-t pt-4">
                  <h4 className="text-lg font-medium">Documents</h4>
                  <div>
                    <h4 className="text-sm font-medium">Uploaded Documents</h4>
                    <div className="space-y-2 mt-2">
                      {selectedApplicant.documents.map((document: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">{document}</span>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
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

      {/* Manage Applicant Dialog */}
      <Dialog open={showManageOptions} onOpenChange={setShowManageOptions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Applicant: {selectedApplicant?.name}</DialogTitle>
            <DialogDescription>Select an action for this applicant</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => handleApplicantOperation(selectedApplicant?.id, "shortlist")}
              className="w-full"
              variant={selectedApplicant?.status === "Shortlisted" ? "default" : "outline"}
            >
              Shortlist
            </Button>
            <Button
              onClick={() => handleApplicantOperation(selectedApplicant?.id, "interview")}
              className="w-full"
              variant={selectedApplicant?.status === "Interviewed" ? "default" : "outline"}
            >
              Mark as Interviewed
            </Button>
            <Button
              onClick={() => handleApplicantOperation(selectedApplicant?.id, "reject")}
              className="w-full"
              variant={selectedApplicant?.status === "Rejected" ? "destructive" : "outline"}
            >
              Reject
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManageOptions(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Operation Success Dialog */}
      <Dialog open={operationSuccess} onOpenChange={setOperationSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Operation Successful</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-center text-lg">{operationMessage}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOperationSuccess(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
