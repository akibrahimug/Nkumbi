import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Phone, Mail } from 'lucide-react'

type Buyer = {
  id: number;
  name: string;
  products: string[];
  contactPhone: string;
  contactEmail: string;
  description: string;
}

async function fetchBuyer(id: string): Promise<Buyer> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    id: parseInt(id),
    name: "Kampala Grocers",
    products: ["Maize", "Beans", "Tomatoes", "Onions"],
    contactPhone: "+256 123 456 789",
    contactEmail: "info@kampalagrocers.com",
    description: "Kampala Grocers is a leading wholesale buyer of various agricultural products. We supply to major supermarkets and restaurants in Kampala and surrounding areas. We are always looking for reliable farmers to partner with for consistent supply of high-quality produce."
  }
}

export default async function BuyerPage({ params }: { params: { id: string } }) {
  const buyer = await fetchBuyer(params.id)

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/buyers" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Buyer Details</h1>
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">{buyer.name}</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Products of Interest:</h3>
            <div className="flex flex-wrap gap-2">
              {buyer.products.map((product) => (
                <span key={product} className="bg-[#2C5F2D] text-white text-sm px-3 py-1 rounded-full">
                  {product}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact Information:</h3>
            <p className="flex items-center mb-2">
              <Phone className="w-5 h-5 mr-2 text-[#2C5F2D]" />
              {buyer.contactPhone}
            </p>
            <p className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-[#2C5F2D]" />
              {buyer.contactEmail}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">About:</h3>
            <p>{buyer.description}</p>
          </div>
          <Link 
            href={`/contact-buyer/${buyer.id}`}
            className="inline-block bg-[#2C5F2D] text-white px-4 py-2 rounded-md hover:bg-[#1F4F1F] transition-colors duration-200"
          >
            Contact Buyer
          </Link>
        </div>
      </main>
    </div>
  )
}

