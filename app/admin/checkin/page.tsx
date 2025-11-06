"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth-provider";
import QRCodeScanner from "@/components/qr-scanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function AdminCheckInPage() {
  const { role } = useAuth();
  const [ticketId, setTicketId] = useState<string>("");

  if (role !== "admin") {
    return <p className="p-6 text-red-600 font-semibold">Access Denied</p>;
  }

  const handleCheckIn = async (id: string) => {
    if (!id) return;

    console.log("✅ Scanning ticket id:", id);

    // Fetch ticket
    const { data: ticket, error: getError } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (getError || !ticket) {
      console.error("❌ Ticket not found:", getError);
      toast({
        title: "❌ Invalid Ticket",
        description: "Ticket not found in system.",
        variant: "destructive",
      });
      return;
    }

    // Already checked in?
    if (ticket.checked_in) {
      toast({
        title: "⚠️ Already Checked-In",
        description: `Scanned earlier at ${new Date(ticket.checked_in_at).toLocaleString()}`,
      });
      return;
    }

    // ✅ Update ticket
    const { error } = await supabase
      .from("tickets")
      .update({
        checked_in: true,
        checked_in_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("event_id", ticket.event_id)
      .eq("user_id", ticket.user_id);

    if (error) {
      console.error("❌ Check-in update error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Audio success
    try {
      new Audio("/success.mp3").play();
    } catch (e) {}

    toast({
      title: "✅ Check-In Successful",
      description: `Ticket ${id} marked as checked-in.`,
    });
  };

  // ✅ Handle QR Scan
  const handleQRScan = (text: string) => {
    if (!text) return;

    console.log("📩 Raw QR text:", text);

    // Your QR format:  ticket=XXX|event=YYY|user=ZZZ
    const match = text.match(/ticket=([^|]+)/);
    const ticketId = match?.[1];

    if (!ticketId) {
      toast({
        title: "⚠️ Invalid QR",
        description: "QR code format not recognized.",
        variant: "destructive",
      });
      return;
    }

    handleCheckIn(ticketId);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Check-In Attendees</h1>

      {/* ✅ QR Scanner */}
      <Card>
        <CardHeader>
          <CardTitle>Scan QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <QRCodeScanner onScan={handleQRScan} />
        </CardContent>
      </Card>

      {/* ✅ Manual Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Ticket Check-In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Enter Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
          <Button onClick={() => handleCheckIn(ticketId)}>Check-In</Button>
        </CardContent>
      </Card>
    </div>
  );
}
