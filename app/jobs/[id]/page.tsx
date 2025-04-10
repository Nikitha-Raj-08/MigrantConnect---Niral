"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Building2, MapPin, Calendar, IndianRupee, Clock, CheckCircle } from "lucide-react"

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id

  const [applicationNote, setApplicationNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Mock job data - in a real app, you would fetch this based on the jobId
  const job = {
    id: jobId,
    title: "Construction Worker",
    company: "ABC Builders",
    location: "Delhi",
    salary: "₹15,000 - ₹18,000/month",
    type: "Full-time",
    duration: "Long-term",
    workingHours: "8 hours/day, 6 days/week",
    skills: ["Construction", "Physical Labor", "Building"],
    description:
      "We are looking for experienced construction workers to join our team for a large residential project. The ideal candidate should have experience in construction work and be able to work in a team environment.",
    responsibilities: [
      "Prepare construction sites, materials, and tools",
      "Load and unload materials, tools, and equipment",
      "Remove debris, garbage, and dangerous materials from sites",
      "Assist contractors, e.g., carpenters, electricians, and painters",
      "Build and take apart temporary structures like scaffolding",
      "Follow all health and safety regulations",
    ],
    requirements: [
      "Previous experience in construction work (1+ years preferred)",
      "Physical stamina and strength",
      "Knowledge of construction techniques and materials",
      "Ability to operate required equipment and tools",
      "Valid identification documents",
    ],
    benefits: [
      "Weekly payments",
      "Accommodation provided",
      "Meals provided during work hours",
      "Safety equipment provided",
      "Transportation to and from work site",
    ],
    postedDate: "2 days ago",
    applicationDeadline: "30 days from now",
  }

  const handleApply = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect after successful application
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{job.title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <Badge>{job.type}</Badge>
          <Badge variant="outline">{job.duration}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{job.description}</p>

              <div className="space-y-2">
                <h4 className="font-medium">Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Benefits:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <h4 className="font-medium mr-2">Skills:</h4>
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Company:</span>
                  <span className="ml-2">{job.company}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{job.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <IndianRupee className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Salary:</span>
                  <span className="ml-2">{job.salary}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Working Hours:</span>
                  <span className="ml-2">{job.workingHours}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Posted:</span>
                  <span className="ml-2">{job.postedDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Apply for this Job</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for {job.title}</DialogTitle>
                    <DialogDescription>Your profile information will be shared with {job.company}</DialogDescription>
                  </DialogHeader>

                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-4 space-y-2">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                      <h3 className="text-xl font-medium">Application Submitted!</h3>
                      <p className="text-center text-muted-foreground">
                        Your application has been successfully submitted. You will be redirected to your dashboard.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Add a note to your application (optional)</h4>
                          <Textarea
                            placeholder="Tell the employer why you're a good fit for this job..."
                            value={applicationNote}
                            onChange={(e) => setApplicationNote(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleApply} disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 border-b pb-2">
                <div className="font-medium">Construction Helper</div>
                <div className="text-sm">XYZ Construction</div>
                <div className="text-sm text-muted-foreground">Delhi • ₹14,000 - ₹16,000/month</div>
                <Link href="/jobs/2">
                  <Button variant="link" className="px-0">
                    View Job
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                <div className="font-medium">Building Worker</div>
                <div className="text-sm">Metro Projects</div>
                <div className="text-sm text-muted-foreground">Gurgaon • ₹16,000 - ₹19,000/month</div>
                <Link href="/jobs/3">
                  <Button variant="link" className="px-0">
                    View Job
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
