"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { toast } from "@/app/components/ui/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your API
    console.log("Subscribing email:", email);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsOpen(false);
    setEmail("");
    toast({
      title: "Subscribed!",
      description: "You've successfully signed up for our newsletter.",
    });
  };

  return (
    <footer className="bg-[#2C5F2D] text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="w-full sm:w-auto mb-4 sm:mb-0 text-center sm:text-left">
            <span className="font-bold">Ugandan Farmer Dashboard</span>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0 text-center sm:text-left">
            <Link href="/about" className="hover:underline mr-4">
              About
            </Link>
            <Link href="/contact" className="hover:underline mr-4">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline mr-4">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
          <div className="w-full sm:w-auto text-center sm:text-left">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-[#2C5F2D] hover:bg-[#F4F1DE]"
                >
                  <Mail className="mr-2 h-4 w-4" /> Subscribe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
                  <DialogDescription>
                    Get the latest updates on market prices, weather forecasts,
                    and farming tips.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-4 text-center text-xs">
          <p>&copy; 2023 Ugandan Farmer Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
