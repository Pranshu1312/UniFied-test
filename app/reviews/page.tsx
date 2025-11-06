"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Star } from "lucide-react";

type Review = {
  id: string;
  content: string;
  rating: number;
  created_at: string;
  events: { title: string }[] | null;
  profiles: { full_name: string } | null;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          content,
          rating,
          created_at,
          events ( title ),
          profiles ( full_name )
        `)
        .order("created_at", { ascending: false });

      if (!error && data) {
        const formatted = data.map((r: any) => ({
          ...r,
          events: r.events || [],
          profiles: r.profiles || null,
        })) as Review[];
        setReviews(formatted);
      }

      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading reviews...
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">User Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-lg">No reviews yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-md border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex justify-between">
                  <span>{review.events?.[0]?.title ?? "Event"}</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Reviewed by{" "}
                  <span className="font-medium">
                    {review.profiles?.full_name ?? "Anonymous"}
                  </span>{" "}
                  • {new Date(review.created_at).toLocaleString()}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* ⭐ Rating */}
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed">{review.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
