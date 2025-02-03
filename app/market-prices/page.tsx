import Link from "next/link";
import {
  ArrowLeft,
  CropIcon as Corn,
  Coffee,
  Banana,
  Wheat,
  CookingPotIcon as Potato,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";
type Commodity = {
  name: string;
  price: number;
  trend: "up" | "down";
  icon: keyof typeof iconMap;
};

const iconMap = {
  Corn: Corn,
  Coffee: Coffee,
  Banana: Banana,
  Wheat: Wheat,
  Potato: Potato,
};

async function fetchAllMarketPrices(): Promise<Commodity[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { name: "Maize", price: 1200, trend: "up", icon: "Corn" },
    { name: "Coffee", price: 5000, trend: "down", icon: "Coffee" },
    { name: "Bananas", price: 800, trend: "up", icon: "Banana" },
    { name: "Wheat", price: 1500, trend: "up", icon: "Wheat" },
    { name: "Potatoes", price: 1000, trend: "down", icon: "Potato" },
    { name: "Beans", price: 2500, trend: "down", icon: "Corn" },
    { name: "Cassava", price: 800, trend: "up", icon: "Potato" },
    { name: "Sweet Potatoes", price: 1500, trend: "up", icon: "Potato" },
    { name: "Groundnuts", price: 3000, trend: "down", icon: "Corn" },
    { name: "Sorghum", price: 1800, trend: "up", icon: "Wheat" },
  ];
}

export default async function MarketPricesPage() {
  const commodities = await fetchAllMarketPrices();

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
        <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Market Prices</h1>
        </header>
        <main className="p-4 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Today's Prices</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {commodities.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center">
                      <div className="mr-3 text-[#2C5F2D]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    <span className="flex items-center">
                      {item.trend === "up" ? (
                        <TrendingUp className="text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="text-red-500 mr-1" />
                      )}
                      {item.price} UGX/kg
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Price Trends</h2>
            <p>
              Chart placeholder: This is where we would display a chart showing
              price trends over time.
            </p>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
