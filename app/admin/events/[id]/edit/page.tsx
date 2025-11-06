"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) {
        alert("Error loading event");
        return;
      }

      setEventData({
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        price: data.price,
      });

      setLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e: any) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);

    const { error } = await supabase
      .from("events")
      .update(eventData)
      .eq("id", eventId);

    setSaving(false);

    if (error) {
      alert("Failed to update event");
      return;
    }

    alert("Event updated!");
    router.push("/admin");
  };

  if (loading) return <p className="p-6">Loading event...</p>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

      <div className="space-y-4">
        <Input
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Event Title"
        />

        <Textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Event Description"
        />

        <Input
          name="date"
          type="date"
          value={eventData.date}
          onChange={handleChange}
        />

        <Input
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Event Location"
        />

        <Input
          name="price"
          type="number"
          value={eventData.price}
          onChange={handleChange}
          placeholder="Ticket Price"
        />

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Changes"}
        </Button>

        <Button variant="outline" onClick={() => router.back()} className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
}
