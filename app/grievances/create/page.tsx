"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function CreateGrievancePage() {
  const router = useRouter()

  const [grievanceForm, setGrievanceForm] = useState({
    title: "",
    type: "",
    employer: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setGrievanceForm({
      ...grievanceForm,
      [field]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Grievance:", grievanceForm)
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect after successful submission
      setTimeout(() => {
        router.push("/grievances")
      }, 2000)
    }, 1500)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
          href="/grievances"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to grievances
        </Link>
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">File a Grievance</h2>
        <p className="text-muted-foreground dark:text-gray-400">Report an issue with your employer</p>
      </div>

      {isSuccess ? (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-medium dark:text-white">Grievance Submitted Successfully!</h3>
            <p className="text-center text-muted-foreground dark:text-gray-400 max-w-md">
              Your grievance has been submitted. You will be redirected to the grievances page where you can track the
              status of your complaint.
            </p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Grievance Details</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Provide details about the issue you're experiencing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="dark:text-gray-300">
                  Grievance Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Delayed Payment, Unsafe Working Conditions"
                  value={grievanceForm.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="dark:text-gray-300">
                  Grievance Type
                </Label>
                <Select value={grievanceForm.type} onValueChange={(value) => handleInputChange("type", value)} required>
                  <SelectTrigger id="type" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Select grievance type" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
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
                <Label htmlFor="employer" className="dark:text-gray-300">
                  Employer Name
                </Label>
                <Input
                  id="employer"
                  placeholder="Enter the employer's name"
                  value={grievanceForm.employer}
                  onChange={(e) => handleInputChange("employer", e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="dark:text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the issue, including dates, times, and any relevant information"
                  rows={5}
                  value={grievanceForm.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/grievances")}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Grievance"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </motion.div>
  )
}
