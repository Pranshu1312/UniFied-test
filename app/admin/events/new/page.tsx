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
  });

  const [banner, setBanner] = useState<File | null>(null);

  if (role !== "admin") {
    return <p className="p-6 text-red-600 font-semibold">Access Denied</p>;
  }

  const handleChange = (e: any) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const uploadBanner = async () => {
    if (!banner) return null;

    const fileName = `event-${Date.now()}-${banner.name}`;

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from("event-banners")
      .upload(fileName, banner, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast({ title: "Image Upload Failed", description: error.message });
      return null;
    }

    // Get public URL
    const { data: publicURL } = supabase.storage
      .from("event-banners")
      .getPublicUrl(fileName);

    return publicURL.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const banner_url = await uploadBanner();

    const { error } = await supabase.from("events").insert({
      ...eventData,
      price: Number(eventData.price),
      banner_url: banner_url ?? "",
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

        <div>
          <Label>Event Banner</Label>
          <Input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files?.[0] || null)} />
        </div>

        <Button disabled={loading} type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
