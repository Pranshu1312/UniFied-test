import Link from "next/link"
import { Calendar, ChevronRight, Clock, FlameIcon as Fire, MapPin, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrendingPage() {
  // Trending events with real images
  const trendingEvents = [
    {
      id: 1,
      title: "Lollapalooza India",
      description: "The iconic music festival comes to India for the first time",
      date: "January 28-29, 2026",
      time: "12:00 PM - 10:00 PM",
      location: "Mumbai, India",
      category: "Music",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      trending: 98,
      price: "₹7,999",
    },
    {
      id: 2,
      title: "India Comic Con",
      description: "The ultimate pop culture celebration for fans of comics, movies, TV shows, and more",
      date: "December 10-12, 2025",
      time: "10:00 AM - 8:00 PM",
      location: "Delhi, India",
      category: "Entertainment",
      image:
        "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      trending: 92,
      price: "₹1,499",
    },
    {
      id: 3,
      title: "India Art Fair",
      description: "The leading platform to discover modern and contemporary art from South Asia",
      date: "February 4-7, 2026",
      time: "11:00 AM - 7:00 PM",
      location: "New Delhi, India",
      category: "Art",
      image:
        "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      trending: 87,
      price: "₹2,500",
    },
    {
      id: 4,
      title: "India Gaming Expo",
      description: "The biggest gaming event in India featuring the latest games, esports tournaments, and more",
      date: "November 18-20, 2025",
      time: "10:00 AM - 9:00 PM",
      location: "Bengaluru, India",
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      trending: 85,
      price: "₹1,999",
    },
    {
      id: 5,
      title: "TEDxMumbai",
      description: "A day of inspiring talks, performances, and conversations",
      date: "October 15, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Mumbai, India",
      category: "Conference",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      trending: 82,
      price: "₹3,500",
    },
    {
      id: 6,
      title: "India Fashion Week",
      description: "The premier fashion event showcasing the best of Indian and international designers",
      date: "March 15-20, 2026",
      time: "11:00 AM - 9:00 PM",
      location: "Delhi, India",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1605289355680-75fb41239154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      trending: 80,
      price: "₹5,000",
    },
  ]

  // Trending categories
  const trendingCategories = [
    { name: "Music Festivals", count: 42, trend: "+15%" },
    { name: "Tech Conferences", count: 38, trend: "+22%" },
    { name: "Food Events", count: 31, trend: "+8%" },
    { name: "Cultural Festivals", count: 27, trend: "+12%" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 flex items-center gap-2 text-3xl font-bold">
          <TrendingUp className="h-8 w-8 text-purple-600" />
          Trending Events
        </h1>
        <p className="text-muted-foreground">Discover the most popular and buzzworthy events across India</p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Trending</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="tech">Tech</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-48 w-full object-cover" />
                  <div className="absolute left-0 top-0 rounded-br-lg bg-purple-600 px-3 py-1 text-white">
                    <div className="flex items-center gap-1">
                      <Fire className="h-4 w-4" />
                      <span className="text-sm font-medium">{event.trending}%</span>
                    </div>
                  </div>
                  <div className="absolute right-2 top-2">
                    <Badge className="bg-black/70 hover:bg-black/80">{event.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="font-bold text-purple-600 dark:text-purple-400">{event.price}</span>
                  <Button asChild>
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="music" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingEvents
              .filter((event) => event.category === "Music")
              .map((event) => (
                <Card key={event.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-0 top-0 rounded-br-lg bg-purple-600 px-3 py-1 text-white">
                      <div className="flex items-center gap-1">
                        <Fire className="h-4 w-4" />
                        <span className="text-sm font-medium">{event.trending}%</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="font-bold text-purple-600 dark:text-purple-400">{event.price}</span>
                    <Button asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="tech" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingEvents
              .filter((event) => ["Tech", "Conference", "Gaming"].includes(event.category))
              .map((event) => (
                <Card key={event.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-0 top-0 rounded-br-lg bg-purple-600 px-3 py-1 text-white">
                      <div className="flex items-center gap-1">
                        <Fire className="h-4 w-4" />
                        <span className="text-sm font-medium">{event.trending}%</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="font-bold text-purple-600 dark:text-purple-400">{event.price}</span>
                    <Button asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="culture" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingEvents
              .filter((event) => ["Art", "Fashion", "Entertainment"].includes(event.category))
              .map((event) => (
                <Card key={event.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-0 top-0 rounded-br-lg bg-purple-600 px-3 py-1 text-white">
                      <div className="flex items-center gap-1">
                        <Fire className="h-4 w-4" />
                        <span className="text-sm font-medium">{event.trending}%</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="font-bold text-purple-600 dark:text-purple-400">{event.price}</span>
                    <Button asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Trending Categories</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trendingCategories.map((category, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.name}
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    {category.trend}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{category.count}</p>
                <p className="text-sm text-muted-foreground">events this month</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="w-full">
                  <Link href={`/events?category=${category.name}`} className="flex items-center justify-center">
                    View Events
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-muted p-6">
        <h2 className="mb-4 text-2xl font-bold">Trending Insights</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">Music festivals are seeing a 32% increase in attendance</h3>
            <p className="text-muted-foreground">
              Post-pandemic, music festivals across India are experiencing record attendance, with electronic and indie
              genres leading the trend.
            </p>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">Tech conferences are expanding to tier 2 cities</h3>
            <p className="text-muted-foreground">
              With the tech industry growing beyond metropolitan areas, conferences are now being hosted in cities like
              Pune, Jaipur, and Chandigarh.
            </p>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-medium">Cultural festivals are incorporating more interactive elements</h3>
            <p className="text-muted-foreground">
              Traditional cultural festivals are adding workshops, immersive experiences, and digital components to
              attract younger audiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
