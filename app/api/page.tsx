import Link from "next/link"
import { ArrowLeft, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiPage() {
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
            <h2 className="text-3xl font-bold tracking-tight">Shopify API Documentation</h2>
            <p className="text-muted-foreground">Connect your applications with Shopify using our powerful APIs.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Admin API</CardTitle>
              <CardDescription>Build Shopify apps for merchants</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The Admin API lets you build apps that integrate with the Shopify admin. It provides access to store
                data like products, orders, customers, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Documentation
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Storefront API</CardTitle>
              <CardDescription>Build custom storefronts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The Storefront API gives you full creative control to build custom shopping experiences for your
                customers.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Documentation
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payments API</CardTitle>
              <CardDescription>Process payments securely</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The Payments API allows you to process payments securely and integrate with various payment gateways.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Documentation
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">API Examples</h3>
          <Tabs defaultValue="rest" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rest">REST API</TabsTrigger>
              <TabsTrigger value="graphql">GraphQL API</TabsTrigger>
            </TabsList>
            <TabsContent value="rest" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Get Products Example</CardTitle>
                  <CardDescription>Retrieve a list of products from your Shopify store</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-md bg-muted p-4">
                    <Button variant="ghost" size="icon" className="absolute right-2 top-2">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                    <pre className="text-sm">
                      <code className="language-javascript">
                        {`// Get products using the REST API
fetch('https://your-store.myshopify.com/admin/api/2023-10/products.json', {
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': 'your_access_token',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="graphql" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Get Products Example</CardTitle>
                  <CardDescription>Retrieve a list of products using GraphQL</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-md bg-muted p-4">
                    <Button variant="ghost" size="icon" className="absolute right-2 top-2">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                    <pre className="text-sm">
                      <code className="language-javascript">
                        {`// Get products using the GraphQL API
fetch('https://your-store.myshopify.com/admin/api/2023-10/graphql.json', {
  method: 'POST',
  headers: {
    'X-Shopify-Access-Token': 'your_access_token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: \`
      {
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              variants(first: 5) {
                edges {
                  node {
                    id
                    price
                  }
                }
              }
            }
          }
        }
      }
    \`
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
