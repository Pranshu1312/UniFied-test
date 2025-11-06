import Link from "next/link"
import { Calendar, MapPin, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function VenuesPage() {
  const venues = [
    {
      id: 1,
      name: "Jawaharlal Nehru Stadium",
      description: "A multi-purpose sports stadium with world-class facilities",
      location: "New Delhi, India",
      capacity: "60,000",
      rating: 4.7,
      reviews: 128,
      amenities: ["Parking", "Food Court", "Accessibility", "VIP Boxes"],
      image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      upcoming: 5,
    },
    {
      id: 2,
      name: "NSIC Exhibition Complex",
      description: "Premier exhibition and convention center in South Delhi",
      location: "New Delhi, India",
      capacity: "5,000",
      rating: 4.5,
      reviews: 89,
      amenities: ["AC Halls", "Parking", "Security", "Food Court"],
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      upcoming: 3,
    },
    {
      id: 3,
      name: "India Expo Centre",
      description: "Greater Noida's largest exhibition and convention facility",
      location: "Greater Noida, India",
      capacity: "10,000",
      rating: 4.8,
      reviews: 156,
      amenities: ["Multiple Halls", "Parking", "Hotels", "Food Court"],
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      upcoming: 7,
    },
    {
      id: 4,
      name: "Bangalore International Exhibition Centre",
      description: "South India's largest exhibition and conference facility",
      location: "Bangalore, India",
      capacity: "15,000",
      rating: 4.6,
      reviews: 112,
      amenities: ["Conference Rooms", "Parking", "Hotels", "Restaurants"],
      image: "https://images.unsplash.com/photo-1581404917879-53e19259fdda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      upcoming: 4,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Venues</h1>
        <p className="text-muted-foreground">Discover the best venues for your events across India</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search venues by location..." className="pl-9" />
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Capacity</SelectItem>
                <SelectItem value="small">Up to 1,000</SelectItem>
                <SelectItem value="medium">1,000 - 5,000</SelectItem>
                <SelectItem value="large">5,000 - 20,000</SelectItem>
                <SelectItem value="xlarge">20,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Event Types</SelectItem>
                <SelectItem value="concert">Concerts</SelectItem>
                <SelectItem value="conference">Conferences</SelectItem>
                <SelectItem value="exhibition">Exhibitions</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="wedding">Weddings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <Card key={venue.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
              <img src={venue.image || "/placeholder.svg"} alt={venue.name} className="h-48 w-full object-cover" />
              <div className="absolute right-2 top-2">
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  <Calendar className="mr-1 h-3 w-3" />
                  {venue.upcoming} Upcoming
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{venue.name}</CardTitle>
              <CardDescription>{venue.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{venue.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({venue.reviews} reviews)</span>
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {venue.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  Capacity: {venue.capacity}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {venue.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/venues/${venue.id}`}>View Venue</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Featured Venue */}
      <div className="my-12 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1578736641330-3155e606cd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
              alt="DY Patil Stadium"
              className="h-64 w-full object-cover md:h-full"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-8 text-white">
            <Badge className="mb-4 w-fit bg-white/20 hover:bg-white/30">Featured Venue</Badge>
            <h2 className="mb-2 text-3xl font-bold">DY Patil Stadium</h2>
            <p className="mb-6">
              One of India's premier cricket and football stadiums, hosting international matches and concerts with a
              capacity of 55,000 spectators.
            </p>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-white/10 p-3 text-center">
                <p className="text-lg font-bold">55,000</p>
                <p className="text-xs">Capacity</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center">
                <p className="text-lg font-bold">Navi Mumbai</p>
                <p className="text-xs">Location</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center">
                <p className="text-lg font-bold">4.9</p>
                <p className="text-xs">Rating</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center">
                <p className="text-lg font-bold">15</p>
                <p className="text-xs">Upcoming Events</p>
              </div>
            </div>
            <Button className="w-fit bg-white text-purple-600 hover:bg-white/90">View Details</Button>
          </div>
        </div>
      </div>

      {/* Venue Booking CTA */}
      <div className="rounded-xl bg-muted p-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Looking to host your event?</h2>
            <p className="text-muted-foreground">
              Find and book the perfect venue for your next event, whether it's a conference, wedding, or concert.
            </p>
          </div>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            List Your Venue
          </Button>
        </div>
      </div>
    </div>
  )
}
