import Link from "next/link"
import { ArrowLeft, Bell, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function WebhooksPage() {
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
            <h2 className="text-3xl font-bold tracking-tight">Shopify Webhooks</h2>
            <p className="text-muted-foreground">
              Receive real-time notifications when events occur in your Shopify store.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>What are Webhooks?</CardTitle>
              <CardDescription>
                Webhooks allow your app to be notified when events occur in a Shopify store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Shopify webhooks deliver notifications to your app when specific events occur in a shop, such as when a
                new order is created or a product is updated. This allows your app to respond in real-time to changes in
                the shop's data.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Webhooks are HTTP callbacks that receive notification payloads when events occur
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Webhook Topics</CardTitle>
              <CardDescription>Common events you can subscribe to</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">orders/create</TableCell>
                    <TableCell>Triggered when a new order is created</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">products/update</TableCell>
                    <TableCell>Triggered when a product is updated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">customers/create</TableCell>
                    <TableCell>Triggered when a new customer is created</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">checkouts/update</TableCell>
                    <TableCell>Triggered when a checkout is updated</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">app/uninstalled</TableCell>
                    <TableCell>Triggered when your app is uninstalled</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Implementation</CardTitle>
              <CardDescription>How to register and handle webhooks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-md bg-muted p-4">
                <Button variant="ghost" size="icon" className="absolute right-2 top-2">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy code</span>
                </Button>
                <pre className="text-sm">
                  <code className="language-javascript">
                    {`// Register a webhook for order creation
fetch('https://your-store.myshopify.com/admin/api/2023-10/webhooks.json', {
  method: 'POST',
  headers: {
    'X-Shopify-Access-Token': 'your_access_token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    webhook: {
      topic: 'orders/create',
      address: 'https://your-app.com/webhooks/orders/create',
      format: 'json'
    }
  })
})
.then(response => response.json())
.then(data => console.log('Webhook registered:', data))
.catch(error => console.error('Error:', error));`}
                  </code>
                </pre>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium">Handling Webhook Payloads</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  When Shopify sends a webhook to your endpoint, you'll need to verify the request and process the
                  payload.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Full Documentation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
