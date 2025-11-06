"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";

export default function ReviewForm({ eventId, userId }: { eventId: string, userId: string }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!rating || !content.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please give rating & write a review",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("reviews").insert({
      event_id: eventId,
      user_id: userId,
      rating,
      content
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({ title: "✅ Review Submitted" });
    setRating(0);
    setContent("");
  };

  return (
    <div className="p-4 border rounded-lg space-y-3 mt-4">
      <h3 className="font-semibold text-lg">Write a Review</h3>

      {/* ⭐ Rating */}
      <div className="flex gap-1">
        {[1,2,3,4,5].map((star) => (
          <Star
            key={star}
            size={24}
            onClick={() => setRating(star)}
            className={star <= rating ? "text-yellow-400 fill-yellow-400 cursor-pointer" : "cursor-pointer"}
          />
        ))}
      </div>

      <Textarea
        placeholder="Share your experience..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button disabled={loading} onClick={submitReview}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}
