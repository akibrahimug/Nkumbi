'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import dynamic from 'next/dynamic'
import { Carrot, Coins, Weight, MapPin, Calendar, User, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false })

const formSchema = z.object({
  crop: z.string().min(1, { message: "Please select a crop" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  quantity: z.number().min(0, { message: "Quantity must be a positive number" }),
  unit: z.string().min(1, { message: "Please select a unit" }),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  date: z.date(),
  buyerName: z.string().optional(),
  buyerContact: z.string().optional(),
  buyerPurchases: z.string().optional(),
})

const crops = [
  "Maize",
  "Beans",
  "Coffee",
  "Bananas",
  "Cassava",
  "Sweet Potatoes",
  "Rice",
  "Sorghum",
  "Millet",
  "Groundnuts",
]

const units = [
  "kg",
  "liters",
  "pieces",
]

export function AgriculturalDataForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: "",
      price: 0,
      quantity: 0,
      unit: "",
      date: new Date(),
      location: { lat: 1.3733, lng: 32.2903 },
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // In a real application, you would send this data to your API
      console.log(values)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      toast({
        title: "Data Submitted",
        description: "Thank you for contributing! Your data is being reviewed.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#2C5F2D]">Add Your Agricultural Data</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="crop"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Carrot className="w-4 h-4 mr-2" />
                  Crop
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a crop" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center">
                    <Coins className="w-4 h-4 mr-2" />
                    Price (UGX)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center">
                    <Weight className="w-4 h-4 mr-2" />
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </FormLabel>
                <FormControl>
                  <MapComponent
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormDescription>Click on the map to set the location</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarComponent className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <FormLabel className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Buyer Details (Optional)
            </FormLabel>
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Buyer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerContact"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Buyer Contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerPurchases"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="What do they typically buy?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full bg-[#2C5F2D] hover:bg-[#1F4F1F]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Send className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Data
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

