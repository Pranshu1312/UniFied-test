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

    const { data: ticket, error: getError } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (getError || !ticket) {
      toast({
        title: "Invalid Ticket",
        description: "Ticket not found.",
        variant: "destructive",
      });
      return;
    }

    if (ticket.checked_in) {
      toast({
        title: "Already Checked-In",
        description: `Already scanned at ${new Date(
          ticket.checked_in_at
        ).toLocaleString()}`,
      });
      return;
    }

    const { error } = await supabase
      .from("tickets")
      .update({
        checked_in: true,
        checked_in_at: new Date(),
      })
      .eq("id", id);

    if (!error) {
      toast({
        title: "✅ Check-In Successful",
        description: `Ticket Verified & Marked Checked-In.`,
      });
      const audio = new Audio("/success.mp3");
      audio.play().catch(() => {});
    } else {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // ✅ Parse QR format: ticket=xxx|event=yyy|user=zzz
  const handleQRScan = (result: string) => {
    if (!result) return;

    console.log("QR raw:", result);

    const parts = result.split("|");
    const ticketPart = parts.find((p) => p.startsWith("ticket="));
    const ticketId = ticketPart?.split("=")[1];

    if (!ticketId) {
      toast({
        title: "Invalid QR",
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

      {/* QR Scanner */}
      <Card>
        <CardHeader>
          <CardTitle>Scan QR Code</CardTitle>
        </CardHeader>

        <CardContent>
          <QRCodeScanner onScan={handleQRScan} />
        </CardContent>
      </Card>

      {/* Manual Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Check-In</CardTitle>
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
