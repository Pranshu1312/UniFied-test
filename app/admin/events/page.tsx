"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth-provider";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Pencil, Trash2, Eye } from "lucide-react";

export default function ManageEventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setEvents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  // Delete Event
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  if (loading)
    return (
      <div className="flex justify-center pt-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <Button asChild>
          <Link href="/admin/events/new">+ Create Event</Link>
        </Button>
      </div>

      {events.length === 0 && (
        <Card className="p-6">
          <p className="text-muted-foreground text-center">No events created yet.</p>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
<img
  src={event.banner_url || "/placeholder.svg"}
  alt={event.title}
  className="h-48 w-full object-cover"
  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
/>

            <CardHeader>
              <CardTitle className="line-clamp-1">{event.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{event.date}</p>
            </CardHeader>

            <CardContent>
              <div className="flex gap-2 mt-2">
                {/* View */}
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/events/${event.id}`}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Link>
                </Button>

                {/* Edit */}
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/admin/events/${event.id}/edit`}>
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </Link>
                </Button>

                {/* Delete */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
