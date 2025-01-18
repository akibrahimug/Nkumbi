'use client'

import { useDataRefresh } from '@/hooks/useDataRefresh'
import Link from 'next/link'
import { CropIcon as Corn, Coffee, Banana, Wheat, CookingPotIcon as Potato, TrendingUp, TrendingDown } from 'lucide-react'

type Commodity = {
  name: string;
  price: number;
  trend: 'up' | 'down';
  icon: keyof typeof iconMap;
}

const iconMap = {
  Corn: Corn,
  Coffee: Coffee,
  Banana: Banana,
  Wheat: Wheat,
  Potato: Potato,
}

async function fetchMarketPrices(): Promise<Commodity[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    { name: 'Maize', price: 1200, trend: 'up', icon: 'Corn' },
    { name: 'Coffee', price: 5000, trend: 'down', icon: 'Coffee' },
    { name: 'Bananas', price: 800, trend: 'up', icon: 'Banana' },
    { name: 'Wheat', price: 1500, trend: 'down', icon: 'Wheat' },
    { name: 'Potatoes', price: 1000, trend: 'up', icon: 'Potato' },
  ]
}

export default function MarketPricesWidget() {
  const { data: commodities, lastRefreshed, isLoading, error } = useDataRefresh<Commodity[]>(
    fetchMarketPrices,
    []
  )

  return (
    <Link 
      href="/market-prices"
      className="block bg-white p-4 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md active:bg-gray-50"
    >
      <h2 className="text-lg font-semibold mb-4">Top Market Prices</h2>
      {error ? (
        <p className="text-red-500">Error loading market prices. Please try again.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {commodities.map((commodity) => {
              const Icon = iconMap[commodity.icon]
              return (
                <li key={commodity.name} className="flex items-center justify-between p-2 rounded-md">
                  <div className="flex items-center">
                    <div className="mr-2 sm:mr-3 text-[#2C5F2D]">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-sm sm:text-base">{commodity.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base mr-2">{commodity.price} UGX/kg</span>
                    {commodity.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="text-right mt-4">
            <span className="text-xs text-gray-500">
              {isLoading ? 'Updating...' : `Last updated: ${lastRefreshed.toLocaleTimeString()}`}
            </span>
          </div>
        </>
      )}
    </Link>
  )
}

