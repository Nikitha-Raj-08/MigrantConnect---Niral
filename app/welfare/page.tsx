"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, AlertCircle, Upload, File, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function WelfareSchemesPage() {
  const [isApplying, setIsApplying] = useState(false)
  const [currentScheme, setCurrentScheme] = useState<any>(null)
  const [applicationSuccess, setApplicationSuccess] = useState(false)
  const [checkingEligibility, setCheckingEligibility] = useState(false)
  const [eligibilityResult, setEligibilityResult] = useState<{ eligible: boolean; message: string } | null>(null)
  const [applicationNote, setApplicationNote] = useState("")
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    aadhaarNumber: "",
    address: "",
    phoneNumber: "",
    bankAccount: "",
    ifscCode: "",
    annualIncome: "",
  })

  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false)
  const [aadhaarOtp, setAadhaarOtp] = useState("")
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false)
  const [workerId, setWorkerId] = useState("MIG-12345") // This would come from user context in a real app

  // Mock data for welfare schemes
  const eligibleSchemes = [
    {
      id: 1,
      name: "PM-KISAN Scheme",
      description: "Income support of ₹6,000 per year for eligible farmer families",
      eligibility: "Small and marginal farmers with less than 2 hectares of land",
      benefits: "₹6,000 per year in three equal installments",
      documents: ["Aadhaar Card", "Land Records", "Bank Account Details"],
      applicationProcess: "Apply online through the PM-KISAN portal or visit your nearest Common Service Center",
      status: "Eligible",
    },
    {
      id: 2,
      name: "Pradhan Mantri Awas Yojana",
      description: "Housing subsidy for construction of houses",
      eligibility: "Households with annual income less than ₹3 lakhs",
      benefits: "Financial assistance of ₹1.5 lakhs for construction of houses",
      documents: ["Aadhaar Card", "Income Certificate", "Land Documents", "Bank Account Details"],
      applicationProcess: "Apply through your local Gram Panchayat or Municipal Corporation",
      status: "Eligible",
    },
  ]

  // Update the welfare schemes to show some as not eligible

  // Update the isEligible function to make some schemes not eligible
  const isEligible = (schemeId: number) => {
    // Make schemes with even IDs not eligible, odd IDs eligible
    return schemeId % 2 !== 0
  }

  // Update the getEligibilityStatus function to use the updated isEligible function
  const getEligibilityStatus = (schemeId: number) => {
    return isEligible(schemeId) ? (
      <Badge className="bg-green-500">Eligible</Badge>
    ) : (
      <Badge variant="outline" className="text-red-500 border-red-500">
        Not Eligible
      </Badge>
    )
  }

  // Update the otherSchemes array to show different eligibility statuses
  const otherSchemes = [
    {
      id: 101,
      name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
      description: "Life insurance scheme for the poor",
      eligibility: "Individuals aged 18-50 years with a bank account",
      benefits: "Life insurance cover of ₹2 lakhs for a premium of ₹330 per year",
      documents: ["Aadhaar Card", "Bank Account Details"],
      applicationProcess: "Apply through your bank branch",
      status: "Check Eligibility",
    },
    {
      id: 102,
      name: "Pradhan Mantri Suraksha Bima Yojana",
      description: "Accident insurance scheme",
      eligibility: "Individuals aged 18-70 years with a bank account",
      benefits: "Accident insurance cover of ₹2 lakhs for a premium of ₹12 per year",
      documents: ["Aadhaar Card", "Bank Account Details"],
      applicationProcess: "Apply through your bank branch",
      status: "Check Eligibility",
    },
    {
      id: 103,
      name: "Atal Pension Yojana",
      description: "Pension scheme for unorganized sector workers",
      eligibility: "Individuals aged 18-40 years",
      benefits: "Fixed pension of ₹1,000 to ₹5,000 per month after the age of 60",
      documents: ["Aadhaar Card", "Bank Account Details"],
      applicationProcess: "Apply through your bank branch",
      status: "Check Eligibility",
    },
  ]

  const handleApply = (scheme: any) => {
    setCurrentScheme(scheme)
    setIsApplying(true)
    setApplicationSuccess(false)
    setApplicationNote("")
    setUploadedDocuments([])
    setFormData({
      fullName: "",
      aadhaarNumber: "",
      address: "",
      phoneNumber: "",
      bankAccount: "",
      ifscCode: "",
      annualIncome: "",
    })
  }

  const handleUploadDocument = (documentName: string) => {
    // In a real app, you would handle file upload here
    if (!uploadedDocuments.includes(documentName)) {
      setUploadedDocuments([...uploadedDocuments, documentName])
    }
  }

  const handleRemoveDocument = (documentName: string) => {
    setUploadedDocuments(uploadedDocuments.filter((doc) => doc !== documentName))
  }

  const submitApplication = () => {
    // Simulate API call
    setTimeout(() => {
      setApplicationSuccess(true)
    }, 1500)
  }

  // Update the eligibilityResult to sometimes return not eligible
  const checkEligibility = (scheme: any) => {
    setCurrentScheme(scheme)
    setCheckingEligibility(true)
    setEligibilityResult(null)

    // Simulate eligibility check with more realistic outcomes
    setTimeout(() => {
      // Use scheme ID to determine eligibility (odd IDs are eligible, even IDs are not)
      const isEligible = scheme.id % 2 === 1
      setEligibilityResult({
        eligible: isEligible,
        message: isEligible
          ? "Based on your profile, you are eligible for this scheme. You can now apply."
          : "Based on your profile, you may not be eligible for this scheme. Please check the eligibility criteria.",
      })
    }, 1500)
  }

  const verifyAadhaar = () => {
    setIsVerifyingAadhaar(true)
  }

  const submitOtp = () => {
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifyingAadhaar(false)
      setIsAadhaarVerified(true)
      // Auto-fill some fields based on Aadhaar data
      setFormData({
        ...formData,
        fullName: formData.fullName || "Rajesh Kumar",
        address: formData.address || "123 Main Street, Delhi, India",
        phoneNumber: formData.phoneNumber || "9876543210",
      })
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
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Welfare Schemes</h2>
        <p className="text-muted-foreground dark:text-gray-400">Government schemes you may be eligible for</p>
      </div>

      <Tabs defaultValue="eligible" className="space-y-4">
        <TabsList className="dark:bg-gray-800">
          <TabsTrigger value="eligible" className="dark:data-[state=active]:bg-gray-700">
            Eligible Schemes
          </TabsTrigger>
          <TabsTrigger value="other" className="dark:data-[state=active]:bg-gray-700">
            Other Schemes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eligible" className="space-y-4">
          {eligibleSchemes.map((scheme) => (
            <Card key={scheme.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="dark:text-white">{scheme.name}</CardTitle>
                    <CardDescription className="dark:text-gray-400">{scheme.description}</CardDescription>
                  </div>
                  <Badge className="w-fit bg-green-500 dark:bg-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {scheme.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1 dark:text-white">Eligibility</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 dark:text-white">Benefits</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{scheme.benefits}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1 dark:text-white">Required Documents</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {scheme.documents.map((doc, index) => (
                      <li key={index} className="text-sm text-muted-foreground dark:text-gray-400">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1 dark:text-white">Application Process</h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{scheme.applicationProcess}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleApply(scheme)}>
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          {otherSchemes.map((scheme) => (
            <Card key={scheme.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="dark:text-white">{scheme.name}</CardTitle>
                    <CardDescription className="dark:text-gray-400">{scheme.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit dark:border-gray-600 dark:text-gray-300">
                    {scheme.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1 dark:text-white">Eligibility</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 dark:text-white">Benefits</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{scheme.benefits}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1 dark:text-white">Required Documents</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {scheme.documents.map((doc, index) => (
                      <li key={index} className="text-sm text-muted-foreground dark:text-gray-400">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1 dark:text-white">Application Process</h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{scheme.applicationProcess}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full dark:border-gray-600 dark:text-gray-300"
                  onClick={() => checkEligibility(scheme)}
                >
                  Check Eligibility
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Apply Now Dialog */}
      <Dialog open={isApplying} onOpenChange={setIsApplying}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {applicationSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-medium text-center dark:text-white">Application Submitted Successfully!</h3>
              <p className="text-center text-muted-foreground dark:text-gray-400">
                Your application for {currentScheme?.name} has been submitted. You will receive updates on your
                application status.
              </p>
              <Button onClick={() => setIsApplying(false)}>Close</Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="dark:text-white">Apply for {currentScheme?.name}</DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  Complete the application form for this welfare scheme
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-white">Personal Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="workerId" className="dark:text-gray-300">
                      Worker ID
                    </Label>
                    <Input
                      id="workerId"
                      value={workerId}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Your unique migrant worker ID (auto-filled)</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="dark:text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhaarNumber" className="dark:text-gray-300">
                        Aadhaar Number
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="aadhaarNumber"
                          value={formData.aadhaarNumber}
                          onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                          disabled={isAadhaarVerified}
                        />
                        {!isAadhaarVerified ? (
                          <Button
                            type="button"
                            onClick={verifyAadhaar}
                            disabled={!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12}
                          >
                            Verify
                          </Button>
                        ) : (
                          <Badge className="h-10 px-3 flex items-center bg-green-500">Verified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="dark:text-gray-300">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="dark:text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount" className="dark:text-gray-300">
                        Bank Account Number
                      </Label>
                      <Input
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode" className="dark:text-gray-300">
                        IFSC Code
                      </Label>
                      <Input
                        id="ifscCode"
                        value={formData.ifscCode}
                        onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome" className="dark:text-gray-300">
                      Annual Income (₹)
                    </Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={formData.annualIncome}
                      onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-white">Required Documents</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Please upload the following documents to complete your application.
                  </p>

                  <div className="space-y-4">
                    {currentScheme?.documents.map((doc: string, index: number) => (
                      <div key={index} className="border rounded-md p-4 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium dark:text-white">{doc}</h4>
                          {uploadedDocuments.includes(doc) ? (
                            <Badge className="bg-green-500 dark:bg-green-600">Uploaded</Badge>
                          ) : (
                            <Badge variant="outline" className="dark:border-gray-600">
                              Required
                            </Badge>
                          )}
                        </div>

                        {uploadedDocuments.includes(doc) ? (
                          <div className="flex items-center justify-between bg-muted p-2 rounded-md dark:bg-gray-700">
                            <div className="flex items-center">
                              <File className="h-4 w-4 mr-2 text-muted-foreground dark:text-gray-400" />
                              <span className="text-sm dark:text-gray-300">{doc}.pdf</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveDocument(doc)}
                              className="h-8 w-8 p-0 dark:text-gray-300"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center border border-dashed rounded-md p-4 dark:border-gray-600">
                            <Button
                              variant="outline"
                              onClick={() => handleUploadDocument(doc)}
                              className="dark:border-gray-600 dark:text-gray-300"
                            >
                              <Upload className="h-4 w-4 mr-2" /> Upload {doc}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationNote" className="dark:text-gray-300">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="applicationNote"
                    placeholder="Add any additional information that might be relevant to your application..."
                    value={applicationNote}
                    onChange={(e) => setApplicationNote(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="text-sm text-muted-foreground dark:text-gray-400 border-t pt-4 dark:border-gray-700">
                  By clicking "Submit Application", you confirm that all the information provided is accurate and you
                  have attached all the required documents.
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsApplying(false)}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitApplication}
                  disabled={
                    !formData.fullName ||
                    !formData.aadhaarNumber ||
                    !formData.address ||
                    !formData.phoneNumber ||
                    !formData.bankAccount ||
                    !formData.ifscCode ||
                    !formData.annualIncome ||
                    uploadedDocuments.length < (currentScheme?.documents?.length || 0)
                  }
                >
                  Submit Application
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Check Eligibility Dialog */}
      <Dialog open={checkingEligibility} onOpenChange={setCheckingEligibility}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Eligibility Check: {currentScheme?.name}</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Checking if you're eligible for this scheme
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {!eligibilityResult ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-center text-muted-foreground dark:text-gray-400">Checking your eligibility...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                {eligibilityResult.eligible ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-amber-500" />
                )}
                <h3 className="text-xl font-medium text-center dark:text-white">
                  {eligibilityResult.eligible ? "You are Eligible!" : "Eligibility Check Result"}
                </h3>
                <p className="text-center text-muted-foreground dark:text-gray-400">{eligibilityResult.message}</p>
                {eligibilityResult.eligible && (
                  <Button
                    onClick={() => {
                      setCheckingEligibility(false)
                      handleApply(currentScheme)
                    }}
                  >
                    Apply Now
                  </Button>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCheckingEligibility(false)}
              className="dark:border-gray-600 dark:text-gray-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Aadhaar OTP Verification Dialog */}
      <Dialog open={isVerifyingAadhaar} onOpenChange={setIsVerifyingAadhaar}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Aadhaar</DialogTitle>
            <DialogDescription>Enter the OTP sent to your registered mobile number</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input
                  id="otp"
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                OTP has been sent to your Aadhaar-linked mobile number. It will expire in 10 minutes.
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyingAadhaar(false)}>
              Cancel
            </Button>
            <Button onClick={submitOtp} disabled={aadhaarOtp.length !== 6}>
              Verify OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
