
"use client";

import { useState, useEffect } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export default function NewsletterForm() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return null or a placeholder during SSR and initial client render
    // to prevent mismatch. A placeholder could be styled to match the form's dimensions.
    return (
      <div className="flex space-x-2 h-10">
        <div className="bg-muted flex-grow rounded-md animate-pulse"></div>
        <div className="bg-muted w-10 h-10 rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <form className="flex space-x-2">
      <Input
        type="email"
        placeholder="Enter Email Address"
        className="bg-background flex-grow"
        // suppressHydrationWarning is not strictly needed here now,
        // but doesn't hurt if other client-side modifications occur.
        suppressHydrationWarning={true} 
      />
      <Button
        type="submit"
        variant="default"
        size="icon"
        aria-label="Subscribe"
        suppressHydrationWarning={true}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
