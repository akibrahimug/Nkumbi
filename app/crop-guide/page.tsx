import Link from "next/link";
import { ArrowLeft, Leaf, Droplets, Sun, Thermometer } from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";

export default function CropGuidePage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
        <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Crop Guide</h1>
        </header>
        <main className="p-4 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Popular Crops in Uganda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CropCard
                name="Maize"
                icon={<Leaf className="text-green-500" />}
                waterNeeds="Medium"
                sunNeeds="Full Sun"
                temperature="20-30°C"
              />
              <CropCard
                name="Beans"
                icon={<Leaf className="text-green-500" />}
                waterNeeds="Medium"
                sunNeeds="Partial Shade"
                temperature="18-24°C"
              />
              <CropCard
                name="Cassava"
                icon={<Leaf className="text-green-500" />}
                waterNeeds="Low"
                sunNeeds="Full Sun"
                temperature="25-35°C"
              />
              <CropCard
                name="Sweet Potatoes"
                icon={<Leaf className="text-green-500" />}
                waterNeeds="Medium"
                sunNeeds="Full Sun"
                temperature="20-30°C"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Seasonal Planting Guide
            </h2>
            <p>
              The best times to plant crops in Uganda depend on the region and
              the specific crop. Here's a general guide:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>
                <strong>March-May (First Rainy Season):</strong> Maize, Beans,
                Groundnuts
              </li>
              <li>
                <strong>June-August (Dry Season):</strong> Cassava, Sweet
                Potatoes
              </li>
              <li>
                <strong>September-November (Second Rainy Season):</strong>{" "}
                Maize, Beans, Millet
              </li>
              <li>
                <strong>December-February (Dry Season):</strong> Vegetables,
                Fruits
              </li>
            </ul>
          </div>
        </main>
      </div>
    </Suspense>
  );
}

function CropCard({
  name,
  icon,
  waterNeeds,
  sunNeeds,
  temperature,
}: {
  name: string;
  icon: React.ReactNode;
  waterNeeds: string;
  sunNeeds: string;
  temperature: string;
}) {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-semibold flex items-center">
        {icon}
        <span className="ml-2">{name}</span>
      </h3>
      <ul className="mt-2 space-y-1">
        <li className="flex items-center">
          <Droplets className="mr-2 text-blue-500" size={16} />
          <span className="text-sm">Water Needs: {waterNeeds}</span>
        </li>
        <li className="flex items-center">
          <Sun className="mr-2 text-yellow-500" size={16} />
          <span className="text-sm">Sun Needs: {sunNeeds}</span>
        </li>
        <li className="flex items-center">
          <Thermometer className="mr-2 text-red-500" size={16} />
          <span className="text-sm">Ideal Temperature: {temperature}</span>
        </li>
      </ul>
    </div>
  );
}
