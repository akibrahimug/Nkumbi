'use client'

import { useDataRefresh } from '@/hooks/useDataRefresh'
import Link from 'next/link'
import { Sun, Cloud, CloudRain, Thermometer } from 'lucide-react'

type WeatherData = {
  today: {
    icon: 'sun' | 'cloud' | 'rain';
    temperature: number;
  };
  forecast: Array<{
    day: string;
    icon: 'sun' | 'cloud' | 'rain';
    temperature: number;
  }>;
}

const iconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
}

async function fetchWeatherData(): Promise<WeatherData> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    today: {
      icon: 'sun',
      temperature: 28,
    },
    forecast: [
      { day: 'Tomorrow', icon: 'cloud', temperature: 26 },
      { day: 'Day After', icon: 'rain', temperature: 24 },
    ]
  }
}

export default function WeatherWidget() {
  const { data: weatherData, lastRefreshed, isLoading, error } = useDataRefresh<WeatherData>(
    fetchWeatherData,
    {
      today: { icon: 'sun', temperature: 0 },
      forecast: []
    }
  )

  const TodayIcon = iconMap[weatherData.today.icon]

  return (
    <Link 
      href="/weather"
      className="block bg-white p-4 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md active:bg-gray-50"
    >
      <h2 className="text-lg font-semibold mb-2">Today's Weather</h2>
      {error ? (
        <p className="text-red-500">Error loading weather data. Please try again.</p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TodayIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFA62B] mr-2" />
              <span className="text-2xl sm:text-3xl font-bold">{weatherData.today.temperature}°C</span>
            </div>
            <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C5F2D]" />
          </div>
          <div className="space-y-2 mb-4">
            {weatherData.forecast.map((day) => {
              const Icon = iconMap[day.icon]
              return (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">{day.day}</span>
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">{day.temperature}°C</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {isLoading ? 'Updating...' : `Last updated: ${lastRefreshed.toLocaleTimeString()}`}
            </span>
          </div>
        </>
      )}
    </Link>
  )
}

