"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { FaLaptop, FaMobileAlt, FaClock } from "react-icons/fa"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const salesData = [
  { month: "Jan", amount: 5000 },
  { month: "Feb", amount: 22000 },
  { month: "Mar", amount: 15000 },
  { month: "Apr", amount: 35000 },
  { month: "May", amount: 20000 },
  { month: "Jun", amount: 28000 },
]

const productsData = [
  {
    name: "iPhone 15 Pro",
    price: 523,
    change: -12,
    icon: FaMobileAlt,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    name: "MacBook Air M2",
    price: 20000,
    change: 30,
    icon: FaLaptop,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    name: "Apple Watch Series 9",
    price: 13500,
    change: 7,
    icon: FaClock,
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    name: "MacBook Pro 5",
    price: 32871,
    change: -2,
    icon: FaLaptop,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
]

const locationMarkers = [
  { lng: -5.45, lat: 35.57, name: "Tangier" },
  { lng: -7.58, lat: 33.57, name: "Casablanca" },
  { lng: -6.83, lat: 34.01, name: "Rabat" },
  { lng: -8.0, lat: 31.63, name: "Marrakech" },
]

export default function SalesDashboard() {
  const mapContainer = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!mapContainer.current) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: [-6.5, 33.5],
      zoom: 5.5,
    })
    map.on("load", () => {
        // Set initial far zoom level
        map.setZoom(1);
      
        // Animate zoom to Algeria
        setTimeout(() => {
          map.flyTo({
            center: [4.16,34.75], // Algeria's coordinates (longitude, latitude)
            zoom: 5.5, // Adjust the zoom level as needed
            speed: 1.5, // Adjust speed of the animation
            curve: 1.5, // Adjust the easing of the animation
          });
        }, 1000); // Delay to ensure animation starts after map loads
      
        locationMarkers.forEach((marker) => {
          const el = document.createElement("div");
          
            el.style.backgroundSize = "100%";
          el.style.background = "linear-gradient(135deg, #ff7e5f, #feb47b)";

        });
      
        setIsLoading(false);
      });
      
      return () => map.remove();
      
  }, [])

  return (
    <div className=" w-full  flex  flex-col gap-8  ">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-gray-900"
      >
        Sales
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Sales Prediction</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#FFB020"
                  strokeWidth={2}
                  dot={{ fill: "#FFB020", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Products Sales</h2>
          <div className="space-y-4 overflow-y-scroll">
            {productsData.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex items-center gap-4"
              >
                <div className={`p-2 rounded-lg ${product.bgColor}`}>
                  <product.icon className={`w-6 h-6 ${product.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-500">${product.price.toLocaleString()}</p>
                </div>
                <span className={`${product.change > 0 ? "text-green-500" : "text-red-500"} font-medium`}>
                  {product.change > 0 ? "+" : ""}
                  {product.change}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-4">Sales Locations</h2>
        <div className="relative">
          <div ref={mapContainer} className="h-[400px] rounded-lg" />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <FaClock className="w-8 h-8 animate-spin text-gray-500" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

