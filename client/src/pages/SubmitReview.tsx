
import { useState } from "react";
import { useParams } from "wouter";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

export default function SubmitReview() {
  const { token } = useParams();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = useMutation({
    mutationFn: async (data: { rating: number; comment: string }) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, token })
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return response.json();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview.mutate({ rating, comment });
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Submit Your Review</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        value <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-2">Your Review</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full"
                placeholder="Share your experience..."
                rows={5}
              />
            </div>
            <Button 
              type="submit"
              disabled={submitReview.isPending}
              className="w-full"
            >
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
