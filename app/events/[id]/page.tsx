"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth-provider";
import QRCode from "qrcode";

import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Ticket,
  Star,
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasTicket, setHasTicket] = useState(false);

  // ✅ Fetch Event + Reviews + Ticket
  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      setEvent(data);
      setLoading(false);
    };

    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*, profiles(full_name)")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false });

      setReviews(data || []);
    };

    const checkTicket = async () => {
      if (!user) return;
      const { data: ticket } = await supabase
        .from("tickets")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle();

      setHasTicket(!!ticket);
    };

    fetchEvent();
    fetchReviews();
    checkTicket();
  }, [eventId, user]);

  // ✅ Submit Review
  const submitReview = async () => {
    if (!rating || !reviewText.trim()) {
      return toast({
        title: "Fields Missing",
        description: "Please give a rating and write your review",
        variant: "destructive",
      });
    }

    setSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      user_id: user?.id,
      event_id: eventId,
      rating,
      content: reviewText,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "✅ Review submitted!" });
    setRating(0);
    setReviewText("");

    // Refresh reviews
    const { data } = await supabase
      .from("reviews")
      .select("*, profiles(full_name)")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    setReviews(data || []);
  };

  // ✅ Book Ticket
  const bookTicket = async () => {
    if (!user) {
      toast({ title: "Login Required", description: "Please login to book" });
      router.push("/auth/login");
      return;
    }

    const qrPayload = `ticket=${eventId}|user=${user.id}|ts=${Date.now()}`;
    const qrImage = await QRCode.toDataURL(qrPayload);

    const { error } = await supabase.from("tickets").insert({
      user_id: user.id,
      event_id: eventId,
      qr_code: qrImage,
    });

    if (error) {
      toast({ title: "Error", description: error.message });
      return;
    }

    toast({ title: "🎟️ Ticket Booked!" });
    router.push("/tickets");
  };

  if (loading) return <p className="p-10 text-center">Loading event...</p>;

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Card className="p-6 text-center">
          <CardTitle>Event not found</CardTitle>
          <Button className="mt-4" asChild>
            <Link href="/events">Browse events</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <img
            src={event.banner_url || "/placeholder.svg"}
            alt={event.title}
            className="rounded-lg w-full h-[350px] object-cover mb-6"
          />

          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <h2 className="text-xl font-bold mb-2">About This Event</h2>
              <p>{event.description}</p>
            </TabsContent>

            <TabsContent value="details">
              <h2 className="text-xl font-bold mb-2">Event Details</h2>
              <p><b>Category:</b> {event.category}</p>
              <p><b>Location:</b> {event.location}</p>
              <p><b>Date:</b> {event.date}</p>
            </TabsContent>

            {/* ✅ REVIEWS TAB */}
            <TabsContent value="reviews">
              <h2 className="text-xl font-semibold mb-3">Reviews</h2>

              {/* Review form */}
              {!user ? (
                <p className="text-sm text-gray-500 mb-3">Login to write a review</p>
              ) : !hasTicket ? (
                <p className="text-sm text-gray-500 mb-3">🎟️ Book a ticket to review</p>
              ) : (
                <div className="p-4 border rounded mb-4 space-y-3">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <Star
                        key={star}
                        className={`h-5 w-5 cursor-pointer ${
                          star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>

                  <Textarea
                    placeholder="Write your review…"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />

                  <Button disabled={submitting} onClick={submitReview}>
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              )}

              {/* Show reviews */}
              <div className="space-y-3">
                {reviews.length === 0 && <p>No reviews yet.</p>}

                {reviews.map((r) => (
                  <Card key={r.id}>
                    <CardContent className="py-4">
                      <div className="flex gap-1 mb-1">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="font-semibold">{r.profiles?.full_name || "User"}</p>
                      <p className="text-sm text-gray-600">{r.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT CARD */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.category}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {event.location}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                ₹{event.price}
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full bg-purple-600" onClick={bookTicket}>
                <Ticket className="mr-2 h-5 w-5" /> Book Ticket
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
