"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, Calendar } from "lucide-react"
import { useState } from "react"

export default function EmployerWagesPage() {
  const [selectedWorker, setSelectedWorker] = useState<any>(null)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  // Mock data for wages
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 1,
      workerName: "Rajesh Kumar",
      jobTitle: "Construction Worker",
      period: "May 2023",
      amount: "₹15,000",
      dueDate: "30/05/2023",
      workerId: "MIG-12345",
    },
    {
      id: 2,
      workerName: "Sunil Verma",
      jobTitle: "Construction Worker",
      period: "May 2023",
      amount: "₹15,000",
      dueDate: "30/05/2023",
      workerId: "MIG-12346",
    },
    {
      id: 3,
      workerName: "Manoj Singh",
      jobTitle: "Site Supervisor",
      period: "May 2023",
      amount: "₹22,000",
      dueDate: "30/05/2023",
      workerId: "MIG-12347",
    },
  ])

  const paymentHistory = [
    {
      id: 101,
      workerName: "Rajesh Kumar",
      jobTitle: "Construction Worker",
      period: "April 2023",
      amount: "₹15,000",
      paymentDate: "30/04/2023",
      paymentMethod: "Bank Transfer",
      transactionId: "TRX123456",
    },
    {
      id: 102,
      workerName: "Sunil Verma",
      jobTitle: "Construction Worker",
      period: "April 2023",
      amount: "₹15,000",
      paymentDate: "30/04/2023",
      paymentMethod: "Bank Transfer",
      transactionId: "TRX123457",
    },
    {
      id: 103,
      workerName: "Manoj Singh",
      jobTitle: "Site Supervisor",
      period: "April 2023",
      amount: "₹22,000",
      paymentDate: "30/04/2023",
      paymentMethod: "Bank Transfer",
      transactionId: "TRX123458",
    },
  ]

  const handlePaymentClick = (worker: any) => {
    setSelectedWorker(worker)
    setIsPaymentProcessing(false)
    setIsPaymentComplete(false)
    setShowPaymentDialog(true)
  }

  const handlePayment = () => {
    setIsPaymentProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentProcessing(false)
      setIsPaymentComplete(true)

      // Update the pending payments list
      setPendingPayments(pendingPayments.filter((payment) => payment.id !== selectedWorker.id))

      // Reset after showing success message
      setTimeout(() => {
        setShowPaymentDialog(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <Link
          href="/employer/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Wage Management</h2>
        <p className="text-muted-foreground">Manage payments to your workers</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {pendingPayments
                .reduce((total, payment) => total + Number.parseInt(payment.amount.replace(/[^\d]/g, "")), 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">For {pendingPayments.length} workers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month's Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹52,000</div>
            <p className="text-xs text-muted-foreground">Due on 30/05/2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Paid (2023)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹156,000</div>
            <p className="text-xs text-muted-foreground">For 3 workers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Workers with pending payments for the current period</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker Name</TableHead>
                    <TableHead>Worker ID</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.workerName}</TableCell>
                      <TableCell>{payment.workerId}</TableCell>
                      <TableCell>{payment.jobTitle}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {payment.dueDate}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => handlePaymentClick(payment)}>
                          Mark as Paid
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingPayments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                        No pending payments
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of all past payments to workers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker Name</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.workerName}</TableCell>
                      <TableCell>{payment.jobTitle}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>{payment.transactionId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          {isPaymentComplete ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-medium">Payment Successful!</h3>
              <p className="text-center text-muted-foreground">
                Payment of {selectedWorker?.amount} has been successfully processed for {selectedWorker?.workerName}.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Payment</DialogTitle>
                <DialogDescription>You are about to mark the following payment as paid.</DialogDescription>
              </DialogHeader>

              {selectedWorker && (
                <div className="py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Worker Name</p>
                      <p className="text-sm">{selectedWorker.workerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Worker ID</p>
                      <p className="text-sm">{selectedWorker.workerId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Job Title</p>
                      <p className="text-sm">{selectedWorker.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Period</p>
                      <p className="text-sm">{selectedWorker.period}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Amount</p>
                      <p className="text-sm font-bold">{selectedWorker.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-sm">{selectedWorker.dueDate}</p>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)} disabled={isPaymentProcessing}>
                  Cancel
                </Button>
                <Button onClick={handlePayment} disabled={isPaymentProcessing}>
                  {isPaymentProcessing ? "Processing..." : "Confirm Payment"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
