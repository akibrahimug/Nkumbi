import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="mb-4">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>We collect information you provide directly to us, such as when you create an account or use our services.</li>
            <li>We use your information to provide, maintain, and improve our services, and to communicate with you.</li>
            <li>We do not sell or share your personal information with third parties for marketing purposes.</li>
            <li>We use industry-standard security measures to protect your data.</li>
            <li>You have the right to access, correct, or delete your personal information at any time.</li>
          </ol>
        </div>
      </main>
    </div>
  )
}

