import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag, Search } from 'lucide-react'

type Listing = {
  id: number;
  image: string;
  crop: string;
  price: number;
  seller: string;
  quantity: number;
}

async function fetchAllListings(): Promise<Listing[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    { id: 1, image: '/placeholder.svg?height=200&width=200', crop: 'Maize', price: 1200, seller: 'John Doe', quantity: 500 },
    { id: 2, image: '/placeholder.svg?height=200&width=200', crop: 'Coffee Beans', price: 5000, seller: 'Jane Smith', quantity: 100 },
    { id: 3, image: '/placeholder.svg?height=200&width=200', crop: 'Tomatoes', price: 800, seller: 'Alice Johnson', quantity: 300 },
    { id: 4, image: '/placeholder.svg?height=200&width=200', crop: 'Potatoes', price: 1500, seller: 'Bob Wilson', quantity: 400 },
    { id: 5, image: '/placeholder.svg?height=200&width=200', crop: 'Beans', price: 2000, seller: 'Emma Brown', quantity: 250 },
    { id: 6, image: '/placeholder.svg?height=200&width=200', crop: 'Cassava', price: 1000, seller: 'David Lee', quantity: 600 },
  ]
}

export default async function MarketplacePage() {
  const listings = await fetchAllListings()

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Marketplace</h1>
      </header>
      <main className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <ShoppingBag className="mr-2" /> Available Listings
            </h2>
            <div className="ml-auto relative">
              <input
                type="text"
                placeholder="Search listings..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C5F2D]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.crop}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{listing.crop}</h3>
                  <p className="text-[#2C5F2D] font-bold mb-2">{listing.price} UGX/kg</p>
                  <p className="text-sm text-gray-600 mb-2">Seller: {listing.seller}</p>
                  <p className="text-sm text-gray-600 mb-4">Quantity: {listing.quantity} kg</p>
                  <Link
                    href={`/marketplace/${listing.id}`}
                    className="bg-[#2C5F2D] text-white px-4 py-2 rounded-md hover:bg-[#1F4F1F] transition-colors inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

