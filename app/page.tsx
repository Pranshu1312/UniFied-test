"use client"

import Link from "next/link"
import { Calendar, Search, Ticket, Users, MapPin, Star, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCountdown } from "@/components/event-countdown"

export default function Home() {
  // Featured events with real images
  const featuredEvents = [
    {
      id: 1,
      name: "Sunburn Music Festival 2025",
      description: "Asia's largest electronic dance music festival",
      date: "December 28-30, 2025",
      location: "DY Patil Stadium, Mumbai",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: "₹4,999 onwards"
    },
    {
      id: 2,
      name: "India Auto Expo 2025",
      description: "Asia's largest automotive show",
      date: "January 15-21, 2025",
      location: "India Expo Mart, Greater Noida",
      image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
      price: "₹750 onwards"
    },
    {
      id: 3,
      name: "International Film Festival",
      description: "Celebrating world cinema and storytelling",
      date: "November 20-28, 2025",
      location: "Goa",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: "₹2,000 onwards"
    }
  ]

  // Categories with icons
  const categories = [
    { name: "Music", icon: "🎵", color: "bg-pink-100 dark:bg-pink-900" },
    { name: "Technology", icon: "💻", color: "bg-blue-100 dark:bg-blue-900" },
    { name: "Food", icon: "🍔", color: "bg-yellow-100 dark:bg-yellow-900" },
    { name: "Sports", icon: "⚽", color: "bg-green-100 dark:bg-green-900" },
    { name: "Arts", icon: "🎨", color: "bg-purple-100 dark:bg-purple-900" },
    { name: "Business", icon: "💼", color: "bg-gray-100 dark:bg-gray-800" },
  ]

  // Upcoming major event
  const majorEvent = {
    id: 4,
    title: "Diwali Celebrations 2025",
    description: "The biggest Diwali celebration with lights, music, and cultural performances",
    date: "November 12, 2025",
    location: "Multiple cities across India",
    image:
      "https://images.unsplash.com/photo-1604423481263-992cb2a0d3a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    countdown: {
      days: 198,
      hours: 14,
      minutes: 35,
    },
  }

  // Cities with events
  const cities = [
    {
      name: "Mumbai",
      count: 156,
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    },
    {
      name: "Delhi",
      count: 142,
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Bangalore",
      count: 128,
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    },
    {
      name: "Chennai",
      count: 98,
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative flex min-h-[600px] items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Discover Amazing Events Near You</h1>
          <p className="mb-8 text-xl md:text-2xl">
            From concerts to conferences, find and book tickets to the best events in India
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white hover:bg-white/20">
              Host an Event
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative">
                  <img src={event.image} alt={event.name} className="h-48 w-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
                    <p className="text-lg font-semibold text-white">{event.price}</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{event.name}</CardTitle>
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
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/events/${event.id}`}>Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose EventSphere</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Curated Events</h3>
              <p className="text-muted-foreground">
                Discover hand-picked events that match your interests and preferences
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Booking</h3>
              <p className="text-muted-foreground">
                Book with confidence using our safe and secure payment system
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated support team is always here to help you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Host Your Event?</h2>
          <p className="mb-8 text-lg">
            Join thousands of event organizers who trust EventSphere to manage their events
          </p>
          <Button size="lg" variant="outline" className="text-white hover:bg-white/20">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  )
}
