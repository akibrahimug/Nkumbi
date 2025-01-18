import Link from 'next/link'
import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react'

type WeatherData = {
  current: {
    icon: 'sun' | 'cloud' | 'rain';
    temperature: number;
    humidity: number;
    windSpeed: number;
  };
  forecast: Array<{
    day: string;
    icon: 'sun' | 'cloud' | 'rain';
    highTemp: number;
    lowTemp: number;
    precipitation: number;
  }>;
}

const iconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
}

async function fetchFullWeatherData(): Promise<WeatherData> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    current: {
      icon: 'sun',
      temperature: 28,
      humidity: 65,
      windSpeed: 10,
    },
    forecast: [
      { day: 'Today', icon: 'sun', highTemp: 30, lowTemp: 22, precipitation: 0 },
      { day: 'Tomorrow', icon: 'cloud', highTemp: 28, lowTemp: 20, precipitation: 20 },
      { day: 'Wednesday', icon: 'rain', highTemp: 25, lowTemp: 19, precipitation: 80 },
      { day: 'Thursday', icon: 'cloud', highTemp: 27, lowTemp: 21, precipitation: 30 },
      { day: 'Friday', icon: 'sun', highTemp: 29, lowTemp: 23, precipitation: 0 },
    ]
  }
}

export default async function WeatherPage() {
  const weatherData = await fetchFullWeatherData()
  const CurrentIcon = iconMap[weatherData.current.icon]

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Weather Forecast</h1>
      </header>
      <main className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CurrentIcon className="w-16 h-16 text-[#FFA62B] mr-4" />
              <div>
                <p className="text-4xl font-bold">{weatherData.current.temperature}°C</p>
                <p className="text-lg">{weatherData.current.icon === 'sun' ? 'Sunny' : weatherData.current.icon === 'cloud' ? 'Cloudy' : 'Rainy'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="flex items-center justify-end">
                <Droplets className="w-5 h-5 mr-1" />
                Humidity: {weatherData.current.humidity}%
              </p>
              <p className="flex items-center justify-end mt-2">
                <Wind className="w-5 h-5 mr-1" />
                Wind: {weatherData.current.windSpeed} km/h
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {weatherData.forecast.map((day) => {
              const Icon = iconMap[day.icon]
              return (
                <div key={day.day} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{day.day}</p>
                  <Icon className="w-10 h-10 mx-auto my-2 text-[#FFA62B]" />
                  <p className="font-bold">{day.highTemp}°C / {day.lowTemp}°C</p>
                  <p className="text-sm">Precipitation: {day.precipitation}%</p>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

