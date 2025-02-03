"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  MapPin,
  ClipboardCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/app/components/ui/checkbox";

type TransportOption = {
  id: string;
  name: string;
  pricePerKm: number;
};

type ShipmentStatus = "pending" | "in_transit" | "delivered";

type Shipment = {
  id: string;
  transportOption: string;
  quantity: number;
  destination: string;
  status: ShipmentStatus;
};

const transportOptions: TransportOption[] = [
  { id: "local_truck", name: "Local Truck", pricePerKm: 1000 },
  { id: "coop_transport", name: "Cooperative Transport", pricePerKm: 800 },
  { id: "motorbike", name: "Motorbike (Small Loads)", pricePerKm: 500 },
];

const steps = [
  {
    icon: Truck,
    text: "Choose transport",
    tooltip: "Select your preferred method of transportation",
  },
  {
    icon: Package,
    text: "Input produce details",
    tooltip: "Specify the type and quantity of your produce",
  },
  {
    icon: MapPin,
    text: "Set destination",
    tooltip: "Enter the delivery location for your produce",
  },
  {
    icon: ClipboardCheck,
    text: "Confirm and track",
    tooltip: "Review your shipment details and track its progress",
  },
];

export default function TransportationWidget() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  useEffect(() => {
    const savedShipments = localStorage.getItem("shipments");
    if (savedShipments) {
      setShipments(JSON.parse(savedShipments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shipments", JSON.stringify(shipments));
  }, [shipments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) {
      alert(
        "Please provide consent to share information with the transport service."
      );
      return;
    }
    const newShipment: Shipment = {
      id: Date.now().toString(),
      transportOption: selectedOption,
      quantity,
      destination,
      status: "pending",
    };
    setShipments([...shipments, newShipment]);
    setActiveStep(0);
    setSelectedOption("");
    setQuantity(0);
    setDestination("");
  };

  const updateShipmentStatus = (id: string, status: ShipmentStatus) => {
    setShipments(
      shipments.map((shipment) =>
        shipment.id === id ? { ...shipment, status } : shipment
      )
    );
  };

  return (
    <TooltipProvider>
      <div className="bg-white p-4 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md">
        <p className="text-sm text-gray-600 mb-4">
          Note: We prioritize your privacy. Information shared with transport
          services is limited to what's necessary for shipment purposes and is
          handled securely.
        </p>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Truck className="mr-2 text-[#2C5F2D] w-5 h-5 sm:w-6 sm:h-6" />{" "}
          Transportation & Tracking
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-4 h-4 ml-2 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Arrange and track shipments for your produce</p>
            </TooltipContent>
          </Tooltip>
        </h2>
        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={`flex flex-col items-center cursor-pointer ${
                    index <= activeStep ? "text-[#2C5F2D]" : "text-gray-400"
                  }`}
                >
                  <step.icon className="w-6 h-6 mb-2" />
                  <span className="text-xs text-center">{step.text}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{step.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {steps.map((step, index) => (
            <div key={index}>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
                onClick={() => {
                  setExpandedStep(expandedStep === index ? null : index);
                  setActiveStep(index);
                }}
              >
                <span className="flex items-center">
                  <step.icon className="w-5 h-5 mr-2" />
                  {step.text}
                </span>
                {expandedStep === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </Button>
              <AnimatePresence>
                {expandedStep === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t">
                      {index === 0 && (
                        <div>
                          <Label htmlFor="transport-option">
                            Select Transport Option
                          </Label>
                          <RadioGroup
                            id="transport-option"
                            value={selectedOption}
                            onValueChange={setSelectedOption}
                          >
                            {transportOptions.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                />
                                <Label htmlFor={option.id}>
                                  {option.name} - {option.pricePerKm} UGX/km
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      )}
                      {index === 1 && (
                        <div>
                          <Label htmlFor="quantity">Quantity (kg)</Label>
                          <Input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                            min="0"
                          />
                        </div>
                      )}
                      {index === 2 && (
                        <div>
                          <Label htmlFor="destination">Destination</Label>
                          <Input
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                          />
                        </div>
                      )}
                      {index === 3 && (
                        <div className="space-y-2">
                          <p>
                            <strong>Transport:</strong>{" "}
                            {
                              transportOptions.find(
                                (o) => o.id === selectedOption
                              )?.name
                            }
                          </p>
                          <p>
                            <strong>Quantity:</strong> {quantity} kg
                          </p>
                          <p>
                            <strong>Destination:</strong> {destination}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy-consent"
              checked={privacyConsent}
              onCheckedChange={(checked) =>
                setPrivacyConsent(checked as boolean)
              }
            />
            <label
              htmlFor="privacy-consent"
              className="text-sm text-gray-700 cursor-pointer"
            >
              I consent to share necessary information with the transport
              service for shipment purposes.
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]"
          >
            Submit Transport Request
          </Button>
        </form>
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Recent Shipments</h3>
          {shipments.length === 0 ? (
            <p className="text-sm text-gray-500">No recent shipments</p>
          ) : (
            <ul className="space-y-2">
              {shipments.slice(-3).map((shipment) => (
                <li key={shipment.id} className="text-sm">
                  <span className="font-semibold">
                    {shipment.quantity}kg to {shipment.destination}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal text-[#2C5F2D]"
                      >
                        View Status
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Shipment Status</DialogTitle>
                        <DialogDescription>
                          Update the status of your shipment
                        </DialogDescription>
                      </DialogHeader>
                      <Select
                        value={shipment.status}
                        onValueChange={(value: ShipmentStatus) =>
                          updateShipmentStatus(shipment.id, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_transit">In Transit</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 text-right">
          <Link
            href="/transportation"
            className="inline-flex items-center text-[#2C5F2D] hover:underline hover:text-[#1F4F1F] transition-colors duration-200 ease-in-out text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#2C5F2D] focus:ring-opacity-50 rounded"
          >
            View All Shipments{" "}
            <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
}
