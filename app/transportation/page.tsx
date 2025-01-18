'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Truck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ShipmentStatus = 'pending' | 'in_transit' | 'delivered'

type Shipment = {
  id: string;
  transportOption: string;
  quantity: number;
  destination: string;
  status: ShipmentStatus;
}

export default function TransportationPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])

  useEffect(() => {
    const savedShipments = localStorage.getItem('shipments')
    if (savedShipments) {
      setShipments(JSON.parse(savedShipments))
    }
  }, [])

  const updateShipmentStatus = (id: string, status: ShipmentStatus) => {
    const updatedShipments = shipments.map(shipment => 
      shipment.id === id ? { ...shipment, status } : shipment
    )
    setShipments(updatedShipments)
    localStorage.setItem('shipments', JSON.stringify(updatedShipments))
  }

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Transportation & Tracking</h1>
      </header>
      <main className="p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Shipments</h2>
          {shipments.length === 0 ? (
            <p className="text-gray-500">No shipments found</p>
          ) : (
            <ul className="space-y-4">
              {shipments.map(shipment => (
                <li key={shipment.id} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{shipment.quantity}kg to {shipment.destination}</span>
                    <Select
                      value={shipment.status}
                      onValueChange={(value: ShipmentStatus) => updateShipmentStatus(shipment.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-gray-600">Transport: {shipment.transportOption}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

