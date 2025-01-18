import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag, User, Scale } from 'lucide-react'

type Listing = {
  id: number;
  image: string;
  crop: string;
  price: number;
  seller: string;
  quantity: number;
  description: string;
}

async function fetchListing(id: string): Promise<Listing> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    id: parseInt(id),
    image: '/placeholder.svg?height=400&width=400',
    crop: 'Maize',
    price: 1200,
    seller: 'John Doe',
    quantity: 500,
    description: 'High-quality maize harvested from our farm. Perfect for both human consumption and animal feed. Our maize is grown using sustainable farming practices and is free from harmful pesticides.'
  }
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await fetchListing(params.id)

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/marketplace" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Listing Details</h1>
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.crop}
                width={400}
                height={400}
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{listing.crop}</h2>
              <p className="text-[#2C5F2D] text-xl font-bold mb-4">{listing.price} UGX/kg</p>
              <div className="space-y-2 mb-4">
                <p className="flex items-center">
                  <User className="mr-2" /> Seller: {listing.seller}
                </p>
                <p className="flex items-center">
                  <Scale className="mr-2" /> Quantity: {listing.quantity} kg
                </p>
              </div>
              <p className="mb-6">{listing.description}</p>
              <button className="bg-[#2C5F2D] text-white px-6 py-2 rounded-md hover:bg-[#1F4F1F] transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

