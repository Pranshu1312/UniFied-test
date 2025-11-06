"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function CreateEventPage() {
  const { user, role } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    price: "",
    banner_url: "", // ✅ Direct URL input
  });

  if (role !== "admin") {
    return <p className="p-6 text-red-600 font-semibold">Access Denied</p>;
  }

  const handleChange = (e: any) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("events").insert({
      ...eventData,
      price: Number(eventData.price),
      created_by: user?.id,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Event creation failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "✅ Event created successfully!",
      description: "Your event is now live",
    });

    router.push("/admin");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label>Title</Label>
          <Input name="title" onChange={handleChange} required />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea name="description" onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Input type="date" name="date" onChange={handleChange} required />
          </div>

          <div>
            <Label>Time</Label>
            <Input type="time" name="time" onChange={handleChange} required />
          </div>
        </div>

        <div>
          <Label>Location</Label>
          <Input name="location" onChange={handleChange} required />
        </div>

        <div>
          <Label>Category</Label>
          <Input name="category" onChange={handleChange} />
        </div>

        <div>
          <Label>Ticket Price (₹)</Label>
          <Input type="number" name="price" onChange={handleChange} />
        </div>

        {/* ✅ URL Input */}
        <div>
          <Label>Event Banner Image URL</Label>
          <Input
            name="banner_url"
            placeholder="https://example.com/image.jpg"
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ Preview */}
        {eventData.banner_url && (
          <div className="mt-2">
            <p className="text-sm">Preview:</p>
            <img
              src={eventData.banner_url}
              className="mt-2 h-48 w-full object-cover rounded"
              alt="Preview"
              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
            />
          </div>
        )}

        <Button disabled={loading} type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
