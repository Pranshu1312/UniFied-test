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
        description: `This ticket was scanned at ${new Date(
          ticket.checked_in_at
        ).toLocaleString()}`,
      });
      return;
    }

    const { error } = await supabase
      .from("tickets")
      .update({ checked_in: true, checked_in_at: new Date() })
      .eq("id", id);

    if (!error) {
      toast({
        title: "✅ Check-In Successful",
        description: `Ticket ${id} has been checked-in.`,
      });
    } else {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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
          <QRCodeScanner
            onScan={(result: string) => {
              const match = result.match(/TicketID:(.*?)\|/);
              if (match) {
                handleCheckIn(match[1]);
              } else {
                toast({
                  title: "Invalid QR",
                  description: "QR code format not recognized.",
                  variant: "destructive",
                });
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Manual Entry */}
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
