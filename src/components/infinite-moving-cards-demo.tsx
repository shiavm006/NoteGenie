"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Note Ginie has completely transformed how I study. The AI-powered note organization and the ability to search through my entire library instantly has made my research 10x more efficient. It's like having a personal research assistant!",
    name: "Sarah Chen",
    title: "Computer Science Student",
  },
  {
    quote:
      "As a researcher, I was drowning in papers and notes. Note Ginie's smart categorization and the way it connects related concepts has made my workflow so much smoother. The community notes feature is brilliant for collaborative learning.",
    name: "Dr. Michael Rodriguez",
    title: "Research Scientist",
  },
  {
    quote: "The book search and preview feature is incredible. I can quickly find relevant books and get instant previews before deciding what to read. It's saved me countless hours in my literature review process.",
    name: "Emily Thompson",
    title: "Graduate Student",
  },
  {
    quote:
      "I love how Note Ginie understands context and helps me create comprehensive notes from complex materials. The AI suggestions are spot-on and have helped me discover connections I would have missed.",
    name: "Alex Johnson",
    title: "Medical Student",
  },
  {
    quote:
      "The interface is so intuitive and the dark theme is perfect for late-night study sessions. The way it organizes my notes by subject and tags makes finding information effortless. This is exactly what I needed for my studies.",
    name: "Priya Patel",
    title: "Law Student",
  },
]; 