"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ViewEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setEvent(data);
      setLoading(false);
    }

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="p-6">Loading event...</p>;
  if (!event) return <p className="p-6">Event not found.</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

      <p className="text-gray-400 mb-2">{event.date}</p>
      <p className="text-gray-300 mb-4">{event.location}</p>

      <p className="mb-6">{event.description}</p>

      <p className="text-lg font-semibold mb-6">Price: ₹{event.price}</p>

      <div className="flex gap-3">
        <Link href={`/admin/events/${eventId}/edit`}>
          <Button>Edit Event</Button>
        </Link>

        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
}
