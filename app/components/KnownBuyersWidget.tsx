"use client";

import { useState } from "react";
import { useDataRefresh } from "@/hooks/useDataRefresh";
import Link from "next/link";
import { ShoppingBag, Search, Phone, Mail, HelpCircle } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

type Buyer = {
  id: number;
  name: string;
  products: string[];
  contactPhone: string;
  contactEmail: string;
  description: string;
  isPublic: boolean;
};

async function fetchKnownBuyers(): Promise<Buyer[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const allBuyers = [
    {
      id: 1,
      name: "Kampala Grocers",
      products: ["Maize", "Beans"],
      contactPhone: "+256 123 456 789",
      contactEmail: "info@kampalagrocers.com",
      description: "Large grocery chain looking for consistent produce supply.",
      isPublic: true,
    },
    {
      id: 2,
      name: "Uganda Coffee Exporters",
      products: ["Coffee"],
      contactPhone: "+256 987 654 321",
      contactEmail: "buy@ugcoffee.com",
      description: "Leading coffee exporter seeking high-quality coffee beans.",
      isPublic: true,
    },
    {
      id: 3,
      name: "Fresh Fruits Ltd",
      products: ["Bananas", "Pineapples"],
      contactPhone: "+256 246 813 579",
      contactEmail: "purchase@freshfruits.ug",
      description:
        "Fruit processing company interested in bulk fruit purchases.",
      isPublic: false,
    },
    {
      id: 4,
      name: "Grain Wholesalers",
      products: ["Maize", "Wheat", "Rice"],
      contactPhone: "+256 369 258 147",
      contactEmail: "orders@grainwholesale.com",
      description: "Bulk grain buyer for local and export markets.",
      isPublic: true,
    },
  ];

  return allBuyers.filter((buyer) => buyer.isPublic);
}

export default function KnownBuyersWidget() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: buyers,
    lastRefreshed,
    isLoading,
    error,
  } = useDataRefresh<Buyer[]>(fetchKnownBuyers, []);

  const filteredBuyers = buyers.filter((buyer) =>
    buyer.products.some((product) =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <TooltipProvider>
      <div className="bg-white p-4 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md">
        <p className="text-sm text-gray-600 mb-4">
          Note: Only buyers who have consented to share their information are
          listed here. Contact details are provided with explicit permission.
        </p>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <ShoppingBag className="mr-2 text-[#2C5F2D] w-5 h-5 sm:w-6 sm:h-6" />{" "}
          Known Buyers
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-4 h-4 ml-2 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Verified buyers interested in purchasing your produce</p>
            </TooltipContent>
          </Tooltip>
        </h2>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 w-full"
            />
          </div>
        </div>
        {error ? (
          <p className="text-red-500">
            Error loading known buyers. Please try again.
          </p>
        ) : (
          <>
            <ul className="space-y-4 mb-4">
              {filteredBuyers.map((buyer) => (
                <li key={buyer.id} className="border-b pb-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-semibold text-left text-[#2C5F2D]"
                      >
                        {buyer.name}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>{buyer.name}</DialogTitle>
                        <DialogDescription>
                          Contact information and details
                        </DialogDescription>
                      </DialogHeader>
                      <p className="text-sm text-gray-600 mb-2">
                        This buyer has consented to share their contact
                        information. Please respect their privacy and use this
                        information responsibly.
                      </p>
                      <div className="space-y-2">
                        <p>
                          <strong>Products:</strong> {buyer.products.join(", ")}
                        </p>
                        <p>
                          <strong>Phone:</strong> {buyer.contactPhone}
                        </p>
                        <p>
                          <strong>Email:</strong> {buyer.contactEmail}
                        </p>
                        <p>
                          <strong>Description:</strong> {buyer.description}
                        </p>
                      </div>
                      <Button
                        className="mt-4 bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]"
                        onClick={() =>
                          (window.location.href = `mailto:${buyer.contactEmail}`)
                        }
                      >
                        Contact Buyer
                      </Button>
                    </DialogContent>
                  </Dialog>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {buyer.products.map((product) => (
                      <span
                        key={product}
                        className="bg-[#2C5F2D] text-white text-xs px-2 py-1 rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right">
              <span className="text-xs text-gray-500">
                {isLoading
                  ? "Updating..."
                  : `Last updated: ${lastRefreshed.toLocaleTimeString()}`}
              </span>
            </div>
            <div className="mt-4 text-right">
              <Button
                variant="link"
                className="text-sm text-[#2C5F2D]"
                onClick={() =>
                  alert(
                    "In a real application, this would open a page for buyers to manage their listing preferences."
                  )
                }
              >
                Are you a buyer? Manage your listing
              </Button>
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
