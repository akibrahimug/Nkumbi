import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Terms of Service</h1>
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
          <p className="mb-4">
            Welcome to the Ugandan Farmer Dashboard. By using our service, you agree to the following terms:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>The information provided on this platform is for general informational purposes only.</li>
            <li>We strive to keep the information up to date and correct, but we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability or availability of the information.</li>
            <li>Any reliance you place on such information is therefore strictly at your own risk.</li>
            <li>We reserve the right to modify or discontinue the service at any time without notice.</li>
            <li>Users are responsible for maintaining the confidentiality of their account information.</li>
          </ol>
        </div>
      </main>
    </div>
  )
}

