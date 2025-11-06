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
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (!error) setEvent(data);
      setLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const bookTicket = async () => {
    if (!user) {
      toast({ title: "Login Required", description: "Please login to book a ticket." });
      router.push("/auth/login");
      return;
    }

    try {
      // Unique QR Text
      const qrPayload = `EVT:${eventId}|USR:${user.id}|TS:${Date.now()}`;

      // Generate QR as Base64
      const qrImage = await QRCode.toDataURL(qrPayload);

      const { error } = await supabase.from("tickets").insert({
        user_id: user.id,
        event_id: eventId,
        qr_code: qrImage
      });

      if (error) {
        toast({ title: "Booking Failed", description: error.message });
        return;
      }

      toast({ title: "Ticket Booked!", description: "Check your My Tickets page." });
      router.push("/tickets");

    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Something went wrong while booking." });
    }
  };

  if (loading) return <p className="p-6 text-center">Loading event...</p>;

  if (!event) {
    return (
      <div className="container mx-auto flex h-[70vh] items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Event Not Found</CardTitle>
            <CardDescription>
              The event you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* LEFT: Event Image & Tabs */}
        <div className="lg:col-span-2">
          <img
            src={event.banner_url || "/placeholder.svg"}
            alt={event.title}
            className="mb-6 h-[300px] w-full rounded-lg object-cover md:h-[400px]"
          />

          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <h2 className="text-2xl font-bold">About This Event</h2>
              <p>{event.description}</p>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <h2 className="text-2xl font-bold">Event Details</h2>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>Category:</strong> {event.category}</li>
                <li><strong>Organizer:</strong> Admin User</li>
                <li><strong>Seats Available:</strong> {event.tickets_available ?? "N/A"}</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT: Booking Card */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.category}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{event.time ?? "N/A"}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{event.location}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">₹{event.price}</span>
                <span className="text-sm text-muted-foreground">per person</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={bookTicket}>
                <Ticket className="mr-2 h-5 w-5" />
                Book Ticket
              </Button>

              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-5 w-5" />
                Share Event
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
