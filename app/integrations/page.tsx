import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Shopify Integrations</h2>
            <p className="text-muted-foreground">
              Connect your Shopify store with these services to enhance your business.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search integrations..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
          <Button>Filter</Button>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="PayPal" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>PayPal</CardTitle>
                    <CardDescription>Payment Gateway</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Accept PayPal payments directly on your Shopify store. Includes Express Checkout options.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Stripe" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Stripe</CardTitle>
                    <CardDescription>Payment Gateway</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Process credit card payments securely with Stripe's payment platform.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Facebook" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Facebook & Instagram</CardTitle>
                    <CardDescription>Marketing</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sync your product catalog with Facebook and Instagram for social selling.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Google" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Google Channel</CardTitle>
                    <CardDescription>Marketing</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    List your products on Google Search, Shopping, YouTube, and more.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="TikTok" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>TikTok</CardTitle>
                    <CardDescription>Marketing</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sync your products with TikTok to create shoppable ads and content.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Trending</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Mailchimp" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Mailchimp</CardTitle>
                    <CardDescription>Email Marketing</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sync your customer data with Mailchimp for email marketing campaigns.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Klaviyo" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Klaviyo</CardTitle>
                    <CardDescription>Email Marketing</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Powerful email marketing automation for ecommerce businesses.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Zendesk" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Zendesk</CardTitle>
                    <CardDescription>Customer Support</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Integrate customer support ticketing system with your Shopify store.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Gorgias" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Gorgias</CardTitle>
                    <CardDescription>Customer Support</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Helpdesk solution designed specifically for ecommerce businesses.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Trending</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="payments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="PayPal" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>PayPal</CardTitle>
                    <CardDescription>Payment Gateway</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Accept PayPal payments directly on your Shopify store. Includes Express Checkout options.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Stripe" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Stripe</CardTitle>
                    <CardDescription>Payment Gateway</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Process credit card payments securely with Stripe's payment platform.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=48&width=48" alt="Apple Pay" width={48} height={48} />
                  </div>
                  <div>
                    <CardTitle>Apple Pay</CardTitle>
                    <CardDescription>Payment Gateway</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enable Apple Pay for fast and secure checkout on iOS devices.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline">Popular</Badge>
                  <Button size="sm">Connect</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
