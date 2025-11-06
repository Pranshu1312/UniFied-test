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
  const [ticketId, setTicketId] = useState("");

  if (role !== "admin") {
    return <p className="p-6 text-red-600 font-semibold">Access Denied</p>;
  }

  const checkInTicket = async (id: string) => {
    if (!id) return;

    console.log("🎯 Checking ticket:", id);

    // ✅ Fetch ticket
    const { data: ticket, error: fetchError } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError || !ticket) {
      toast({
        title: "❌ Invalid Ticket",
        description: "Ticket not found in database.",
        variant: "destructive",
      });
      console.error(fetchError);
      return;
    }

    // ✅ Already checked-in
    if (ticket.checked_in) {
      toast({
        title: "⚠️ Already Checked-In",
        description: `Checked in at ${new Date(ticket.checked_in_at).toLocaleString()}`,
      });
      return;
    }

    // ✅ Update ticket check-in
    const { error: updateError } = await supabase
      .from("tickets")
      .update({
        checked_in: true,
        checked_in_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      toast({
        title: "❌ Error updating ticket",
        description: updateError.message,
        variant: "destructive",
      });
      console.error(updateError);
      return;
    }

    // ✅ Success beep
    try { new Audio("/success.mp3").play(); } catch {}

    toast({
      title: "✅ Check-In Successful",
      description: `Ticket ${id} has been checked in.`,
    });
  };

  const handleQRScan = (raw: string) => {
    if (!raw) return;
    console.log("📥 QR Raw:", raw);

    // ✅ Match ticket=UUID format
    const match = raw.match(/ticket=([^|]+)/);
    const id = match?.[1];

    if (!id) {
      toast({
        title: "❌ Invalid QR",
        description: "QR format not recognized.",
        variant: "destructive",
      });
      return;
    }

    checkInTicket(id);
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
          <Button onClick={() => checkInTicket(ticketId)}>Check-In</Button>
        </CardContent>
      </Card>
    </div>
  );
}
