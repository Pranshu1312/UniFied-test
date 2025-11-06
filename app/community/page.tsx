"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, MessageCircle, Share2, ThumbsUp, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CommunityPage() {
  const users = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Event Organizer",
      location: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      eventsHosted: 12,
      followers: 1240,
      bio: "Passionate about creating unforgettable music festivals and cultural events",
      interests: ["Music", "Culture", "Arts"]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Tech Conference Organizer",
      location: "Bangalore",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      eventsHosted: 8,
      followers: 890,
      bio: "Building India's tech community through innovative conferences and meetups",
      interests: ["Technology", "Startups", "Innovation"]
    },
    {
      id: 3,
      name: "Anita Desai",
      role: "Food Festival Curator",
      location: "Delhi",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      eventsHosted: 15,
      followers: 2100,
      bio: "Bringing together the best of Indian cuisine through food festivals",
      interests: ["Food", "Culture", "Lifestyle"]
    },
    {
      id: 4,
      name: "Mohammed Ali",
      role: "Sports Event Manager",
      location: "Chennai",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      eventsHosted: 20,
      followers: 1580,
      bio: "Making sports accessible and exciting for everyone",
      interests: ["Sports", "Fitness", "Youth Development"]
    }
  ]

  const posts = [
    {
      id: 1,
      author: users[0],
      content: "Just wrapped up another successful music festival! Thank you to all 5000+ attendees who made it special. Next stop: Mumbai Winter Fest 2025! 🎵✨",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: users[1],
      content: "Excited to announce our next tech conference featuring speakers from Google, Microsoft, and Amazon! Early bird tickets now available. #TechConf2025",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      likes: 189,
      comments: 28,
      shares: 56,
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      author: users[2],
      content: "The street food festival was a huge success! Over 50 vendors showcasing the best of Indian street food. See you all next month! 🍜🥘",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      likes: 445,
      comments: 67,
      shares: 23,
      timestamp: "1 day ago"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Event Community</h1>
        <p className="text-muted-foreground">Connect with event organizers and attendees across India</p>
      </div>

      {/* Community Feed */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Feed */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="overflow-hidden rounded-lg border bg-card shadow">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="mt-3">{post.content}</p>
                </div>
                {post.image && (
                  <img src={post.image} alt="Post" className="aspect-video w-full object-cover" />
                )}
                <div className="flex items-center justify-between border-t p-4">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                      {post.shares}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Event Organizers */}
          <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-4 font-semibold">Popular Event Organizers</h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                  <button className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Community Events */}
          <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-4 font-semibold">Upcoming Community Events</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <h3 className="font-medium">Event Organizers Meetup</h3>
                <p className="text-sm text-muted-foreground">May 15, 2025 • Mumbai</p>
                <button className="mt-2 text-sm text-primary hover:underline">Learn More</button>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <h3 className="font-medium">Community Workshop</h3>
                <p className="text-sm text-muted-foreground">May 20, 2025 • Online</p>
                <button className="mt-2 text-sm text-primary hover:underline">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
