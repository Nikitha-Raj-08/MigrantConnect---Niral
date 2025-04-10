"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Search, MapPin, Users, Calendar, Clock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function EmployerJobsPage() {
  // Mock data for jobs
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Construction Worker",
      location: "Delhi",
      type: "Full-time",
      salary: "₹15,000 - ₹18,000/month",
      applicants: 12,
      status: "Active",
      postedDate: "5 days ago",
    },
    {
      id: 2,
      title: "Site Supervisor",
      location: "Gurgaon",
      type: "Full-time",
      salary: "₹25,000 - ₹30,000/month",
      applicants: 8,
      status: "Active",
      postedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Electrician",
      location: "Noida",
      type: "Contract",
      salary: "₹20,000 - ₹22,000/month",
      applicants: 5,
      status: "Closed",
      postedDate: "3 weeks ago",
    },
    {
      id: 4,
      title: "Painter",
      location: "Delhi",
      type: "Part-time",
      salary: "₹12,000 - ₹15,000/month",
      applicants: 7,
      status: "Active",
      postedDate: "2 days ago",
    },
  ])

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showJobOptions, setShowJobOptions] = useState(false)
  const [operationSuccess, setOperationSuccess] = useState(false)
  const [operationMessage, setOperationMessage] = useState("")

  const handleJobOperation = (operation: string) => {
    // Start with closing the options dialog
    setShowJobOptions(false)

    // Simulate the operation
    let message = ""

    switch (operation) {
      case "modify":
        message = "Job details have been updated successfully"
        // Here we would navigate to edit page or show edit dialog in a real app
        break
      case "close":
        message =
          selectedJob?.status === "Active" ? "Job has been closed successfully" : "Job has been activated successfully"
        // In a real app, we would update the job status in the database
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === selectedJob?.id ? { ...job, status: job.status === "Active" ? "Closed" : "Active" } : job,
          ),
        )
        break
      case "delete":
        message = "Job has been deleted successfully"
        // In a real app, we would delete the job from the database
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== selectedJob?.id))
        break
      default:
        return
    }

    // Show success message
    setOperationMessage(message)
    setOperationSuccess(true)
  }

  // Check localStorage for new jobs on component mount
  useEffect(() => {
    try {
      const storedJobsString = localStorage.getItem("employerJobs")
      if (storedJobsString) {
        const storedJobs = JSON.parse(storedJobsString)
        if (Array.isArray(storedJobs) && storedJobs.length > 0) {
          // Merge stored jobs with existing jobs, avoiding duplicates
          const existingIds = jobs.map((job) => job.id)
          const newJobs = storedJobs.filter((job) => !existingIds.includes(job.id))

          if (newJobs.length > 0) {
            setJobs([...newJobs, ...jobs])
          }
        }
      }
    } catch (error) {
      console.error("Error loading jobs from localStorage:", error)
    }
  }, [])

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="flex-1 space-y-4 p-8 pt-6 dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div>
        <Link
          href="/employer/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight dark:text-white">Manage Jobs</h2>
            <p className="text-muted-foreground dark:text-gray-400">Create and manage job postings</p>
          </div>
          <Link href="/employer/jobs/create">
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Post New Job
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search jobs by title or location..."
            className="w-full pl-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
        {filteredJobs.map((job) => (
          <motion.div key={job.id} variants={fadeIn} whileHover={{ y: -5 }}>
            <Card className="h-full dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="dark:text-white">{job.title}</CardTitle>
                  <Badge
                    variant={job.status === "Active" ? "default" : "secondary"}
                    className="dark:bg-gray-700 dark:text-gray-200"
                  >
                    {job.status}
                  </Badge>
                </div>
                <CardDescription className="dark:text-gray-400">{job.salary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                  <MapPin className="mr-1 h-4 w-4" /> {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                  <Clock className="mr-1 h-4 w-4" /> {job.type}
                </div>
                <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                  <Users className="mr-1 h-4 w-4" /> {job.applicants} applicants
                </div>
                <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" /> Posted {job.postedDate}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Link href={`/employer/jobs/${job.id}/applicants`}>
                  <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                    View Applicants
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedJob(job)
                    setShowJobOptions(true)
                  }}
                >
                  Manage
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium dark:text-white">No jobs found</h3>
          <p className="text-muted-foreground dark:text-gray-400 mt-1">
            Try adjusting your search or create a new job posting
          </p>
          <Link href="/employer/jobs/create" className="mt-4 inline-block">
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Post New Job
            </Button>
          </Link>
        </div>
      )}

      {/* Job Management Dialog */}
      <Dialog open={showJobOptions} onOpenChange={setShowJobOptions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Job: {selectedJob?.title}</DialogTitle>
            <DialogDescription>Select an action to perform on this job posting</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => handleJobOperation("modify")} className="w-full">
              Modify Job Details
            </Button>
            <Button
              onClick={() => handleJobOperation("close")}
              variant={selectedJob?.status === "Active" ? "destructive" : "default"}
              className="w-full"
            >
              {selectedJob?.status === "Active" ? "Close Job" : "Activate Job"}
            </Button>
            <Button onClick={() => handleJobOperation("delete")} variant="outline" className="w-full">
              Delete Job
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobOptions(false)}>
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
    </motion.div>
  )
}
