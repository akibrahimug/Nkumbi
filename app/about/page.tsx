import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">About Us</h1>
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            The Ugandan Farmer Dashboard is dedicated to empowering farmers
            across Uganda with real-time information, market insights, and
            community support. Our goal is to enhance agricultural productivity
            and improve the livelihoods of farmers through technology and
            data-driven decision making.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p>
            Founded in 2023, our platform was born out of a desire to bridge the
            information gap in Uganda's agricultural sector. By providing easy
            access to weather forecasts, market prices, and a supportive
            community forum, we aim to revolutionize how farmers approach their
            daily operations and long-term planning.
          </p>
        </div>
      </main>
    </div>
  );
}
