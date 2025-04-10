"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Upload, User, Plus, X } from "lucide-react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  // Mock data for worker profile
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    id: "MIG-12345",
    aadhaar: "XXXX XXXX 1234",
    dob: "1990-05-15",
    phone: "9876543210",
    address: "123, Main Street, Delhi",
    skills: ["Construction", "Carpentry", "Painting"],
    customSkill: "",
    employmentHistory: [
      {
        employer: "ABC Builders",
        role: "Construction Worker",
        duration: "Jan 2022 - Present",
        location: "Delhi",
      },
      {
        employer: "XYZ Construction",
        role: "Helper",
        duration: "Mar 2021 - Dec 2021",
        location: "Gurgaon",
      },
    ],
    education: "10th Standard",
    languages: ["Hindi", "English (Basic)"],
    customLanguage: "",
  })

  const [showLanguageDialog, setShowLanguageDialog] = useState(false)
  const [newLanguage, setNewLanguage] = useState("")
  const [languageToEdit, setLanguageToEdit] = useState<{ index: number; value: string } | null>(null)

  // Handle skill selection
  const handleSkillSelect = (skill: string) => {
    if (profile.skills.includes(skill)) {
      setProfile({
        ...profile,
        skills: profile.skills.filter((s) => s !== skill),
      })
    } else {
      setProfile({
        ...profile,
        skills: [...profile.skills, skill],
      })
    }
  }

  // Add custom skill
  const handleAddCustomSkill = () => {
    if (profile.customSkill && !profile.skills.includes(profile.customSkill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, profile.customSkill],
        customSkill: "",
      })
    }
  }

  // Remove skill
  const handleRemoveSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    })
  }

  // Add language
  const handleAddLanguage = () => {
    if (newLanguage && !profile.languages.includes(newLanguage)) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage],
      })
      setNewLanguage("")
      setShowLanguageDialog(false)
    }
  }

  // Remove language
  const handleRemoveLanguage = (language: string) => {
    setProfile({
      ...profile,
      languages: profile.languages.filter((l) => l !== language),
    })
  }

  // Edit language
  const handleEditLanguage = (index: number) => {
    setLanguageToEdit({
      index,
      value: profile.languages[index],
    })
    setNewLanguage(profile.languages[index])
    setShowLanguageDialog(true)
  }

  // Save edited language
  const handleSaveEditedLanguage = () => {
    if (languageToEdit && newLanguage) {
      const updatedLanguages = [...profile.languages]
      updatedLanguages[languageToEdit.index] = newLanguage
      setProfile({
        ...profile,
        languages: updatedLanguages,
      })
      setNewLanguage("")
      setLanguageToEdit(null)
      setShowLanguageDialog(false)
    }
  }

  // Add employment history field
  const addEmploymentHistory = () => {
    setProfile({
      ...profile,
      employmentHistory: [...profile.employmentHistory, { employer: "", role: "", duration: "", location: "" }],
    })
  }

  // Remove employment history field
  const removeEmploymentHistory = (index: number) => {
    const updatedHistory = [...profile.employmentHistory]
    updatedHistory.splice(index, 1)
    setProfile({
      ...profile,
      employmentHistory: updatedHistory,
    })
  }

  // Update employment history field
  const updateEmploymentHistory = (index: number, field: string, value: string) => {
    const updatedHistory = [...profile.employmentHistory]
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value,
    }
    setProfile({
      ...profile,
      employmentHistory: updatedHistory,
    })
  }

  // Handle profile update
  const handleProfileUpdate = () => {
    // In a real app, you would submit the updated profile to your API
    console.log("Updated profile:", profile)

    // Show success message
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
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
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">My Profile</h2>
        <p className="text-muted-foreground dark:text-gray-400">View and update your profile information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.name} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-1 dark:border-gray-600 dark:text-gray-300">
                <Upload className="h-4 w-4" /> Upload Photo
              </Button>
            </div>

            <div className="space-y-1 text-center">
              <h3 className="text-xl font-bold dark:text-white">{profile.name}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">ID: {profile.id}</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium dark:text-white">Skills</div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium dark:text-white">Contact Information</div>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground dark:text-gray-400">Phone:</span>
                  <span className="dark:text-white">{profile.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-t dark:border-gray-700">
                  <span className="text-muted-foreground dark:text-gray-400">Aadhaar:</span>
                  <span className="dark:text-white">{profile.aadhaar}</span>
                </div>
                <div className="flex justify-between py-1 border-t dark:border-gray-700">
                  <span className="text-muted-foreground dark:text-gray-400">Date of Birth:</span>
                  <span className="dark:text-white">{new Date(profile.dob).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium dark:text-white">Languages</div>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((language) => (
                  <Badge key={language} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-3">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full dark:bg-gray-800">
              <TabsTrigger value="personal" className="dark:data-[state=active]:bg-gray-700">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="skills" className="dark:data-[state=active]:bg-gray-700">
                Skills
              </TabsTrigger>
              <TabsTrigger value="employment" className="dark:data-[state=active]:bg-gray-700">
                Employment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Personal Information</CardTitle>
                  <CardDescription className="dark:text-gray-400">Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="dark:text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="dark:text-gray-300">
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={profile.dob}
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="dark:text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
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
                    <Label htmlFor="education" className="dark:text-gray-300">
                      Education
                    </Label>
                    <Input
                      id="education"
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="dark:text-gray-300">Languages</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setLanguageToEdit(null)
                          setNewLanguage("")
                          setShowLanguageDialog(true)
                        }}
                        className="dark:border-gray-600 dark:text-gray-300"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Language
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language, index) => (
                        <div
                          key={language}
                          className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md dark:bg-gray-700 dark:text-gray-200"
                        >
                          {language}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 hover:bg-secondary/80 dark:hover:bg-gray-600"
                            onClick={() => handleEditLanguage(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-pencil"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 hover:bg-secondary/80 dark:hover:bg-gray-600"
                            onClick={() => handleRemoveLanguage(language)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>Update Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Skills</CardTitle>
                  <CardDescription className="dark:text-gray-400">Select and update your skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Construction",
                      "Carpentry",
                      "Painting",
                      "Plumbing",
                      "Electrical",
                      "Masonry",
                      "Welding",
                      "Driving",
                      "Cooking",
                      "Cleaning",
                      "Agriculture",
                    ].map((skill) => (
                      <Button
                        key={skill}
                        variant={profile.skills.includes(skill) ? "default" : "outline"}
                        onClick={() => handleSkillSelect(skill)}
                        className="dark:border-gray-600"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>

                  <div className="pt-4 border-t dark:border-gray-700">
                    <Label htmlFor="custom-skill" className="dark:text-gray-300">
                      Add Other Skill
                    </Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="custom-skill"
                        placeholder="Enter a skill not listed above"
                        value={profile.customSkill}
                        onChange={(e) => setProfile({ ...profile, customSkill: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <Button onClick={handleAddCustomSkill} disabled={!profile.customSkill} size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t dark:border-gray-700">
                    <Label className="dark:text-gray-300">Your Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md dark:bg-gray-700 dark:text-gray-200"
                        >
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 hover:bg-secondary/80 dark:hover:bg-gray-600"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>Update Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="employment">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Employment History</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Add and update your employment history
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.employmentHistory.map((history, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md dark:border-gray-700"
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`employer-${index}`} className="dark:text-gray-300">
                          Employer
                        </Label>
                        <Input
                          id={`employer-${index}`}
                          value={history.employer}
                          onChange={(e) => updateEmploymentHistory(index, "employer", e.target.value)}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`role-${index}`} className="dark:text-gray-300">
                          Role
                        </Label>
                        <Input
                          id={`role-${index}`}
                          value={history.role}
                          onChange={(e) => updateEmploymentHistory(index, "role", e.target.value)}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`duration-${index}`} className="dark:text-gray-300">
                          Duration
                        </Label>
                        <Input
                          id={`duration-${index}`}
                          value={history.duration}
                          onChange={(e) => updateEmploymentHistory(index, "duration", e.target.value)}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${index}`} className="dark:text-gray-300">
                          Location
                        </Label>
                        <Input
                          id={`location-${index}`}
                          value={history.location}
                          onChange={(e) => updateEmploymentHistory(index, "location", e.target.value)}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeEmploymentHistory(index)}
                        className="dark:bg-red-700 dark:hover:bg-red-800"
                      >
                        <X className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    onClick={addEmploymentHistory}
                    className="dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Employment
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>Update Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Language Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">
              {languageToEdit ? "Edit Language" : "Add New Language"}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {languageToEdit ? "Update your language proficiency" : "Add a new language to your profile"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <Label htmlFor="language-input" className="dark:text-gray-300">
                Language
              </Label>
              <Input
                id="language-input"
                placeholder="e.g., English (Fluent), Hindi, Tamil"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowLanguageDialog(false)
                setNewLanguage("")
                setLanguageToEdit(null)
              }}
              className="dark:border-gray-600 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={languageToEdit ? handleSaveEditedLanguage : handleAddLanguage} disabled={!newLanguage}>
              {languageToEdit ? "Save Changes" : "Add Language"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
