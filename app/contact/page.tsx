import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Contact Us</h1>
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We're here to help! If you have any questions, suggestions, or need assistance, 
            please don't hesitate to reach out to us.
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> support@ugandanfarmerdashboard.com</p>
            <p><strong>Phone:</strong> +256 123 456 789</p>
            <p><strong>Address:</strong> 123 Farmer's Lane, Kampala, Uganda</p>
          </div>
        </div>
      </main>
    </div>
  )
}

