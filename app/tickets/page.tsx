"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { Calendar, Download, QrCode } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { supabase } from "@/lib/supabaseClient";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TicketsPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchTickets = async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select(`
          *,
          events(
            title,
            location,
            date,
            price
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setTickets(data);
    };

    fetchTickets();
  }, [user]);

  const generateQR = async (ticket: any) => {
    const qrText = `ticket=${ticket.id}|event=${ticket.event_id}|user=${ticket.user_id}`;
    const url = await QRCode.toDataURL(qrText);
    setQrCode(url);
    setSelectedTicket(ticket);
    setIsQrDialogOpen(true);
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCode!;
    link.download = `ticket_${selectedTicket.id}.png`;
    link.click();
  };

  const upcomingTickets = tickets.filter(
    (t) => new Date(t.events.date) > new Date()
  );
  const pastTickets = tickets.filter(
    (t) => new Date(t.events.date) <= new Date()
  );

  if (!user)
    return (
      <div className="p-10 text-center">
        <p className="text-lg font-semibold">Please sign in to view tickets.</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">My Tickets</h1>
        <p className="text-muted-foreground">
          View and manage your event tickets
        </p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingTickets.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({pastTickets.length})</TabsTrigger>
        </TabsList>

        {/* ✅ UPCOMING TICKETS */}
        <TabsContent value="upcoming">
          {upcomingTickets.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Upcoming Tickets</CardTitle>
                <CardDescription>
                  Book events to see tickets here.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <CardTitle>{ticket.events.title}</CardTitle>
                    <CardDescription>
                      ₹{ticket.price ?? ticket.events.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {ticket.events.date}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ticket.events.location}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => generateQR(ticket)}
                    >
                      <QrCode className="mr-2 h-4 w-4" /> QR
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => generateQR(ticket)}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ✅ PAST TICKETS */}
        <TabsContent value="past">
          {pastTickets.length === 0 ? (
            <p className="text-muted-foreground">No past tickets.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastTickets.map((ticket) => (
                <Card key={ticket.id} className="opacity-70">
                  <CardHeader>
                    <CardTitle>{ticket.events.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">{ticket.events.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {ticket.events.location}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/events/${ticket.event_id}`}>
                        View Event
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ✅ QR DIALOG */}
      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Your Ticket QR</DialogTitle>
          </DialogHeader>
          {qrCode && (
            <>
              <img src={qrCode} className="mx-auto h-64 w-64" />
              <p className="mt-2 text-sm">{selectedTicket?.events.title}</p>
              <Button className="w-full mt-4" onClick={downloadQR}>
                Download QR
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
