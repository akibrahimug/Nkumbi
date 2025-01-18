import { TrendingUp, TrendingDown } from 'lucide-react'

export default function PriceWidget() {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold mb-2">Market Prices</h2>
      <ul className="space-y-2">
        <PriceItem crop="Maize" price={1200} trend="up" />
        <PriceItem crop="Beans" price={2500} trend="down" />
        <PriceItem crop="Cassava" price={800} trend="up" />
      </ul>
    </div>
  )
}

function PriceItem({ crop, price, trend }: { crop: string; price: number; trend: 'up' | 'down' }) {
  return (
    <li className="flex justify-between items-center">
      <span>{crop}</span>
      <span className="flex items-center">
        {trend === 'up' ? (
          <TrendingUp className="text-green-500 mr-1" />
        ) : (
          <TrendingDown className="text-red-500 mr-1" />
        )}
        {price} UGX/kg
      </span>
    </li>
  )
}

