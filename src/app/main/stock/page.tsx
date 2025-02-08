/* eslint-disable */





"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import DynamicTable from "./component/DynamicTable";



interface ChartData {
  year: string;
  value1: number;
  value2: number;
}

const stockData = [
  { id: "01.", name: "Trivago", left: "520", need: "1000", number: "05123456789" ,status:"Absent" },
  { id: "02.", name: "Canon", left: "480", need: "236", number: "05123456789" ,status:"working" },
  { id: "03.", name: "Uber Food", left: "350", need: "475", number: "05123456789" ,status:"Absent" },
];




const employeeData = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    email: "christine@example.com",
    phone: "555-0123",
    status: "Absent",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    email: "rosie@example.com",
    phone: "555-0124",
    status: "Working",
  },
];

const chartData: ChartData[] = [
  { year: "2016", value1: 10000, value2: 15000 },
  { year: "2017", value1: 25000, value2: 20000 },
  { year: "2018", value1: 15000, value2: 30000 },
];



const stockDataConfig = Object.keys(stockData[0]);
console.log(stockDataConfig);

const employeeDataConfig = Object.keys(employeeData[0]);
console.log(employeeDataConfig);



export default function StockDashboard() {
  // Example of custom formatters
  const stockFormatters = {
    number: (value: string) => <span className="font-mono">{value}</span>
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Stock Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DynamicTable
          data={stockData} 
          title="Stock Statistics"
        
          customFormatters={stockFormatters}
        />

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Predictions</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="value1" stroke="#9333ea" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="value2" stroke="#2dd4bf" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <DynamicTable
        data={employeeData} 
        title="Employee Information"
        statusColors={{
          positive: ['working', 'active'],
          negative: ['absent', 'inactive']
        }}
      />
    </div>
  );
}
