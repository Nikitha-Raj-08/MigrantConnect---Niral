"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Upload, Building2 } from "lucide-react"
import { CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

export default function EmployerProfilePage() {
  // Mock data for employer profile
  const [profile, setProfile] = useState({
    companyName: "ABC Construction Company",
    id: "EMP-5678",
    contactPerson: "Amit Sharma",
    email: "amit.sharma@abcconstruction.com",
    phone: "9876543210",
    address: "456, Business District, Delhi",
    website: "www.abcconstruction.com",
    description:
      "ABC Construction Company is a leading construction firm specializing in residential and commercial projects across Delhi NCR. We have been in business for over 15 years and have completed more than 100 projects.",
    industry: "Construction",
    employeeCount: "50-100",
    yearEstablished: "2008",
  })

  const [showUpdateDialog, setShowUpdateDialog] = useState(false)

  // Handle profile update
  const handleProfileUpdate = () => {
    // In a real app, you would submit the updated profile to your API
    console.log("Updated profile:", profile)

    // Show dialog instead of just a notification
    setShowUpdateDialog(true)
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
          href="/employer/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Company Profile</h2>
        <p className="text-muted-foreground dark:text-gray-400">View and update your company information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Company Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.companyName} />
                <AvatarFallback>
                  <Building2 className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-1 dark:border-gray-600 dark:text-gray-300">
                <Upload className="h-4 w-4" /> Upload Logo
              </Button>
            </div>

            <div className="space-y-1 text-center">
              <h3 className="text-xl font-bold dark:text-white">{profile.companyName}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">ID: {profile.id}</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium dark:text-white">Contact Information</div>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground dark:text-gray-400">Contact Person:</span>
                  <span className="dark:text-white">{profile.contactPerson}</span>
                </div>
                <div className="flex justify-between py-1 border-t dark:border-gray-700">
                  <span className="text-muted-foreground dark:text-gray-400">Email:</span>
                  <span className="dark:text-white">{profile.email}</span>
                </div>
                <div className="flex justify-between py-1 border-t dark:border-gray-700">
                  <span className="text-muted-foreground dark:text-gray-400">Phone:</span>
                  <span className="dark:text-white">{profile.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-t dark:border-gray-700">
                  <span className="text-muted-foreground dark:text-gray-400">Website:</span>
                  <span className="dark:text-white">{profile.website}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium dark:text-white">Company Details</div>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground dark:text-gray-400">Industry:</span>
                  <span className="dark:text-white">{profile.industry}</span>
                </div>
                <div className="flex justify-between py-1 border-t dark:border-gray-700">
                  <span className="text-muted-foreground dark:text-gray-400">Employees:</span>
                  <span className="dark:text-white">{profile.employeeCount}</span>
                </div>
                <div className="flex justify-between py-1 border-t dark:border-gray-700">
                  <span className="text-muted-foreground dark:text-gray-400">Established:</span>
                  <span className="dark:text-white">{profile.yearEstablished}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Edit Company Profile</CardTitle>
            <CardDescription className="dark:text-gray-400">Update your company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="dark:text-gray-300">
                Company Name
              </Label>
              <Input
                id="company-name"
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-person" className="dark:text-gray-300">
                  Contact Person
                </Label>
                <Input
                  id="contact-person"
                  value={profile.contactPerson}
                  onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-300">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="dark:text-gray-300">
                  Website
                </Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="dark:text-gray-300">
                Address
              </Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="dark:text-gray-300">
                Company Description
              </Label>
              <Textarea
                id="description"
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="dark:text-gray-300">
                  Industry
                </Label>
                <Input
                  id="industry"
                  value={profile.industry}
                  onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-count" className="dark:text-gray-300">
                  Number of Employees
                </Label>
                <Input
                  id="employee-count"
                  value={profile.employeeCount}
                  onChange={(e) => setProfile({ ...profile, employeeCount: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year-established" className="dark:text-gray-300">
                  Year Established
                </Label>
                <Input
                  id="year-established"
                  value={profile.yearEstablished}
                  onChange={(e) => setProfile({ ...profile, yearEstablished: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleProfileUpdate}>Update Company Profile</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Update Profile Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Updated</DialogTitle>
            <DialogDescription>Your company profile has been updated successfully.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <DialogFooter>
            <Button onClick={() => setShowUpdateDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
