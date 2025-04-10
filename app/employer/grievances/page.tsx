"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MessageSquare, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function EmployerGrievancesPage() {
  const [grievances, setGrievances] = useState([
    {
      id: 1,
      title: "Delayed Payment Issue",
      worker: "Rajesh Kumar",
      description: "Worker claims payment was delayed by 2 weeks",
      status: "New",
      filedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Working Hours Dispute",
      worker: "Sunil Verma",
      description: "Worker claims they worked overtime but weren't compensated",
      status: "In Progress",
      filedDate: "1 week ago",
    },
  ])
  // Mock data for grievances
  const [activeGrievances, setActiveGrievances] = useState([
    {
      id: 1,
      title: "Working Hours Dispute",
      worker: "Dinesh Patel",
      workerId: "MIG-5678",
      type: "Working Hours",
      status: "New",
      filedDate: "2 days ago",
      description: "Worker claims they worked 12 hours but were only paid for 8 hours on May 15, 2023.",
    },
    {
      id: 2,
      title: "Delayed Payment",
      worker: "Sunil Verma",
      workerId: "MIG-1234",
      type: "Wage Dispute",
      status: "In Progress",
      filedDate: "1 week ago",
      lastUpdated: "2 days ago",
      description: "Worker has not received payment for April 2023 work.",
      responses: [
        {
          from: "Employer",
          message: "We are processing the payment and it will be disbursed by the end of this week.",
          date: "2 days ago",
        },
      ],
    },
  ])

  const [resolvedGrievances, setResolvedGrievances] = useState([
    {
      id: 101,
      title: "Safety Equipment Issue",
      worker: "Rajesh Kumar",
      workerId: "MIG-9876",
      type: "Safety Concern",
      status: "Resolved",
      filedDate: "3 weeks ago",
      resolvedDate: "1 week ago",
      description: "Worker reported lack of safety helmets at the construction site.",
      resolution: "Provided safety helmets to all workers at the site.",
    },
    {
      id: 102,
      title: "Accommodation Complaint",
      worker: "Manoj Singh",
      workerId: "MIG-5432",
      type: "Living Conditions",
      status: "Resolved",
      filedDate: "1 month ago",
      resolvedDate: "2 weeks ago",
      description: "Worker reported poor living conditions in the provided accommodation.",
      resolution: "Relocated workers to better accommodation with improved facilities.",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)
  const [selectedGrievance, setSelectedGrievance] = useState<any>(null)
  const [resolutionText, setResolutionText] = useState("")
  const [resolutionSuccess, setResolutionSuccess] = useState(false)

  const handleMarkAsResolved = (grievance: any) => {
    setSelectedGrievance(grievance)
    setResolveDialogOpen(true)
    setResolutionText("")
  }

  const submitResolution = () => {
    if (!resolutionText.trim()) return

    // In a real app, we would update the database
    // Here we're just updating the state
    const now = new Date().toLocaleDateString()

    // Remove from active grievances
    const updatedActiveGrievances = activeGrievances.filter((g) => g.id !== selectedGrievance.id)

    // Add to resolved grievances with resolution details
    const resolvedGrievance = {
      ...selectedGrievance,
      status: "Resolved",
      resolvedDate: now,
      resolution: resolutionText,
    }

    const updatedResolvedGrievances = [resolvedGrievance, ...resolvedGrievances]

    // Update state
    setActiveGrievances(updatedActiveGrievances)
    setResolvedGrievances(updatedResolvedGrievances)

    // Show success message
    setResolutionSuccess(true)

    // Close the dialog after showing success
    setTimeout(() => {
      setResolveDialogOpen(false)
      setResolutionSuccess(false)
    }, 2000)
  }

  // Filter grievances based on search
  const filteredActiveGrievances = activeGrievances.filter(
    (grievance) =>
      grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredResolvedGrievances = resolvedGrievances.filter(
    (grievance) =>
      grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  const markAsResolved = (id: number) => {
    setGrievances(
      grievances.map((grievance) => (grievance.id === id ? { ...grievance, status: "Resolved" } : grievance)),
    )
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
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Grievances</h2>
        <p className="text-muted-foreground dark:text-gray-400">Manage and respond to worker grievances</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
        <Input
          type="search"
          placeholder="Search grievances..."
          className="w-full pl-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="dark:bg-gray-800">
          <TabsTrigger value="active" className="dark:data-[state=active]:bg-gray-700">
            Active Grievances
          </TabsTrigger>
          <TabsTrigger value="resolved" className="dark:data-[state=active]:bg-gray-700">
            Resolved Grievances
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <motion.div className="space-y-4" variants={staggerContainer}>
            {filteredActiveGrievances.length > 0 ? (
              filteredActiveGrievances.map((grievance) => (
                <motion.div key={grievance.id} variants={fadeIn}>
                  <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
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
                            grievance.status === "New"
                              ? "default"
                              : grievance.status === "In Progress"
                                ? "secondary"
                                : "outline"
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

                      {grievance.responses && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium dark:text-white">Responses</h4>
                          {grievance.responses.map((response, index) => (
                            <div key={index} className="rounded-lg border p-3 space-y-1 dark:border-gray-700">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium dark:text-white">{response.from}</span>
                                <span className="text-xs text-muted-foreground dark:text-gray-400">
                                  {response.date}
                                </span>
                              </div>
                              <p className="text-sm dark:text-gray-300">{response.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground dark:text-gray-400">
                        {grievance.lastUpdated ? `Last updated: ${grievance.lastUpdated}` : "No responses yet"}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="gap-1" onClick={() => handleMarkAsResolved(grievance)}>
                          <CheckCircle className="h-4 w-4" /> Mark as Resolved
                        </Button>
                        <Link href={`/employer/grievances/${grievance.id}`}>
                          <Button className="gap-1">
                            <MessageSquare className="h-4 w-4" /> Respond
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground dark:text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium dark:text-white">No active grievances found</h3>
                <p className="text-muted-foreground dark:text-gray-400 mt-1">
                  There are no active grievances matching your search criteria.
                </p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <motion.div className="space-y-4" variants={staggerContainer}>
            {filteredResolvedGrievances.length > 0 ? (
              filteredResolvedGrievances.map((grievance) => (
                <motion.div key={grievance.id} variants={fadeIn}>
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
                        <Badge variant="default" className="w-fit bg-green-600 dark:bg-green-700">
                          {grievance.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 dark:text-white">Description</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{grievance.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1 dark:text-white">Resolution</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{grievance.resolution}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="text-sm text-muted-foreground dark:text-gray-400">
                        Resolved on: {grievance.resolvedDate}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground dark:text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium dark:text-white">No resolved grievances found</h3>
                <p className="text-muted-foreground dark:text-gray-400 mt-1">
                  There are no resolved grievances matching your search criteria.
                </p>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
      {/* Mark as Resolved Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent className="sm:max-w-[500px] dark:bg-gray-800 dark:border-gray-700">
          {resolutionSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-medium dark:text-white">Grievance Resolved!</h3>
              <p className="text-center text-muted-foreground dark:text-gray-400">
                This grievance has been marked as resolved.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="dark:text-white">Mark Grievance as Resolved</DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  Please provide details about how this grievance was resolved.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="dark:text-gray-300">Resolution Details</Label>
                  <Textarea
                    placeholder="Explain how the grievance was resolved..."
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    className="min-h-[120px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setResolveDialogOpen(false)}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button onClick={submitResolution} disabled={!resolutionText.trim()}>
                  Submit Resolution
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
