'use client'

import { useDataRefresh } from '@/hooks/useDataRefresh'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'

type Listing = {
  id: number;
  image: string;
  crop: string;
  price: number;
}

async function fetchFeaturedListings(): Promise<Listing[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    { id: 1, image: '/placeholder.svg?height=100&width=100', crop: 'Maize', price: 1200 },
    { id: 2, image: '/placeholder.svg?height=100&width=100', crop: 'Coffee Beans', price: 5000 },
    { id: 3, image: '/placeholder.svg?height=100&width=100', crop: 'Tomatoes', price: 800 },
  ]
}

export default function MarketplaceWidget() {
  const { data: listings, lastRefreshed, isLoading, error } = useDataRefresh<Listing[]>(
    fetchFeaturedListings,
    []
  )

  return (
    <Link 
      href="/marketplace"
      className="block bg-white p-4 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md active:bg-gray-50"
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <ShoppingBag className="mr-2 text-[#2C5F2D] w-5 h-5 sm:w-6 sm:h-6" /> Featured Listings
      </h2>
      {error ? (
        <p className="text-red-500">Error loading marketplace listings. Please try again.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {listings.map((listing) => (
              <li key={listing.id}>
                <div className="flex items-center space-x-4 p-2 rounded-md">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.crop}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm sm:text-base">{listing.crop}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{listing.price} UGX/kg</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {isLoading ? 'Updating...' : `Last updated: ${lastRefreshed.toLocaleTimeString()}`}
            </span>
          </div>
        </>
      )}
    </Link>
  )
}

