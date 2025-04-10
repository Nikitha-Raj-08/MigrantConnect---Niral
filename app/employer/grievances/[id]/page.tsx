"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MessageSquare, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function GrievanceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const grievanceId = params.id

  const [response, setResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Mock grievance data
  const grievance = {
    id: grievanceId,
    title: "Working Hours Dispute",
    worker: "Dinesh Patel",
    workerId: "MIG-5678",
    type: "Working Hours",
    status: "New",
    filedDate: "2 days ago",
    description: "Worker claims they worked 12 hours but were only paid for 8 hours on May 15, 2023.",
    responses: [],
  }

  const handleSubmitResponse = () => {
    if (!response.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after showing success message
      setTimeout(() => {
        router.push("/employer/grievances")
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
          href="/employer/grievances"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to grievances
        </Link>
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Grievance Details</h2>
        <p className="text-muted-foreground dark:text-gray-400">Respond to worker grievance</p>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                {grievance.title}
                <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                  {grievance.type}
                </Badge>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Filed by {grievance.worker} (ID: {grievance.workerId}) on {grievance.filedDate}
              </CardDescription>
            </div>
            <Badge
              className="w-fit"
              variant={
                grievance.status === "New" ? "default" : grievance.status === "In Progress" ? "secondary" : "outline"
              }
            >
              {grievance.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1 dark:text-white">Description</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-400">{grievance.description}</p>
          </div>

          {grievance.responses.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium dark:text-white">Responses</h4>
              {grievance.responses.map((response: any, index: number) => (
                <div key={index} className="rounded-lg border p-3 space-y-1 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium dark:text-white">{response.from}</span>
                    <span className="text-xs text-muted-foreground dark:text-gray-400">{response.date}</span>
                  </div>
                  <p className="text-sm dark:text-gray-300">{response.message}</p>
                </div>
              ))}
            </div>
          )}

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-4 space-y-2">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-medium dark:text-white">Response Submitted!</h3>
              <p className="text-center text-muted-foreground dark:text-gray-400">
                Your response has been successfully submitted. You will be redirected to the grievances page.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <h4 className="text-sm font-medium dark:text-white">Your Response</h4>
              <Textarea
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground dark:text-gray-400">
            {grievance.responses.length > 0
              ? `Last updated: ${grievance.responses[grievance.responses.length - 1].date}`
              : "No responses yet"}
          </div>
          {!isSuccess && (
            <Button onClick={handleSubmitResponse} disabled={isSubmitting || !response.trim()} className="gap-1">
              <MessageSquare className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Response"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
