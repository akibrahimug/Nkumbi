"use client";

import Link from "next/link";
import {
  CropIcon as Corn,
  Sun,
  Users,
  ShoppingCart,
  ShoppingBag,
  Truck,
  FileText,
} from "lucide-react";
import { RefreshProvider } from "@/contexts/RefreshContext";
import UserProfileDropdown from "@/app/components/UserProfileDropdown";
import NotificationDropdown from "@/app/components/NotificationDropdown";
import AskFarmingAIWidget from "@/app/components/AskFarmingAIWidget";
import WeatherWidget from "@/app/components/WeatherWidget";
import MarketPricesWidget from "@/app/components/MarketPricesWidget";
import CommunityWidget from "@/app/components/CommunityWidget";
import MarketplaceWidget from "@/app/components/MarketplaceWidget";
import KnownBuyersWidget from "@/app/components/KnownBuyersWidget";
import TransportationWidget from "@/app/components/TransportationWidget";

function QuickAccessButton({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow transition-all duration-200 ease-in-out hover:bg-[#FFA62B] hover:shadow-md active:bg-[#FF8C00] focus:outline-none focus:ring-2 focus:ring-[#2C5F2D] focus:ring-opacity-50"
    >
      <div className="text-[#2C5F2D] mb-2 transition-transform duration-200 ease-in-out group-hover:scale-110">
        {icon}
      </div>
      <span className="text-sm font-medium text-center transition-colors duration-200 ease-in-out group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}

function DashboardContent() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Nkumbi</h1>
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </header>

      <nav className="bg-[#F4F1DE] p-4">
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-4 max-w-7xl mx-auto">
          <QuickAccessButton
            icon={<Corn />}
            label="Crop Guide"
            href="/crop-guide"
          />
          <QuickAccessButton
            icon={<Sun />}
            label="Weather Forecast"
            href="/weather"
          />
          <QuickAccessButton
            icon={<Users />}
            label="Community Forum"
            href="/community"
          />
          <QuickAccessButton
            icon={<ShoppingCart />}
            label="Marketplace"
            href="/marketplace"
          />
          <QuickAccessButton
            icon={<ShoppingBag />}
            label="Known Buyers"
            href="/buyers"
          />
          <QuickAccessButton
            icon={<Truck />}
            label="Transportation"
            href="/transportation"
          />
          <QuickAccessButton
            icon={<FileText />}
            label="Add Data"
            href="/add-data"
          />
        </div>
      </nav>

      <div className="p-4 space-y-4 max-w-7xl mx-auto">
        <AskFarmingAIWidget />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WeatherWidget />
          <MarketPricesWidget />
          <CommunityWidget />
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketplaceWidget />
            <KnownBuyersWidget />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <TransportationWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <RefreshProvider refreshInterval={300000}>
      {" "}
      {/* Refresh every 5 minutes */}
      <DashboardContent />
    </RefreshProvider>
  );
}
