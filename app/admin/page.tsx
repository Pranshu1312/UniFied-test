"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Calendar,
  DollarSign,
  Download,
  LineChart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth-provider";

export default function AdminDashboardPage() {
  const { user } = useAuth(); // ✅ get logged-in user

  const [events, setEvents] = useState<any[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // ✅ Fetch events
      const { data: eventsData } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (eventsData) setEvents(eventsData);

      // ✅ Fetch total users
      const { count: users } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      setUserCount(users || 0);

      // ✅ Fetch ticket count
      const { count: tickets } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true });

      setTicketCount(tickets || 0);

      // ✅ Fetch revenue
      const { data: revenueData } = await supabase
        .from("tickets")
        .select("price");

      const totalRevenue =
        revenueData?.reduce((sum, t) => sum + (t.price || 0), 0) || 0;
      setRevenue(totalRevenue);

      setLoading(false);
    };

    fetchData();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your event management platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button asChild>
            <Link href="/admin/events/new">Create Event</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "…" : events.length}</div>
            <p className="text-xs text-muted-foreground">Events in database</p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "…" : userCount}</div>
            <p className="text-xs text-muted-foreground">Active registered users</p>
          </CardContent>
        </Card>

        {/* Tickets Sold */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "…" : ticketCount}</div>
            <p className="text-xs text-muted-foreground">Total tickets sold</p>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "…" : `₹${revenue.toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground">Total earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity & My Events */}
      <Card>
        <CardHeader>
          <CardTitle>Activity & My Events</CardTitle>
          <CardDescription>Track activity and manage your events</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="events">
            <TabsList className="mb-4">
              <TabsTrigger value="events">Recent Events</TabsTrigger>
              <TabsTrigger value="myevents">My Events</TabsTrigger>
              <TabsTrigger value="tickets">Recent Tickets</TabsTrigger>
              <TabsTrigger value="users">New Users</TabsTrigger>
            </TabsList>

            {/* ✅ Recent Events */}
            <TabsContent value="events">
              <div className="space-y-4">
                {events.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex flex-col">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/events/${event.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ✅ My Events */}
            <TabsContent value="myevents">
              <div className="space-y-4">
                {events.filter(e => e.created_by === user?.id).length === 0 && (
                  <p className="text-muted-foreground text-sm">You haven't created any events yet.</p>
                )}

                {events
                  .filter(e => e.created_by === user?.id)
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex flex-col">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date} — {event.location}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/events/${event.id}`}>View</Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/admin/events/${event.id}/edit`}>Edit</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="tickets">
              <p className="text-sm text-muted-foreground">Ticket data coming soon…</p>
            </TabsContent>

            <TabsContent value="users">
              <p className="text-sm text-muted-foreground">User data coming soon…</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
