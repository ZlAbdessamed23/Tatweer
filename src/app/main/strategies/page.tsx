"use client"

import { BsLightningCharge } from "react-icons/bs"
import { BiTargetLock } from "react-icons/bi"
import { HiOutlineCurrencyDollar } from "react-icons/hi"
import StrategyCard from './componenets/strategy-card'







const strategies = [
  {
    title: "Operation Strategie",
    date: "28 January 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    icon: BsLightningCharge,
    iconColor: "#FFB800",
    backgroundColor: "#FFFBF2",
  },
  {
    title: "Marketing Strategie",
    date: "25 January 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    icon: BiTargetLock,
    iconColor: "#7B61FF",
    backgroundColor: "#F5F3FF",
  },
  {
    title: "Financial Strategie",
    date: "21 January 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    icon: HiOutlineCurrencyDollar,
    iconColor: "#00B2FF",
    backgroundColor: "#F0FAFF",
  },
  // Duplicate cards to show grid layout
  {
    title: "Operation Strategie",
    date: "28 January 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    icon: BsLightningCharge,
    iconColor: "#FFB800",
    backgroundColor: "#FFFBF2",
  },
  {
    title: "Marketing Strategie",
    date: "25 January 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    icon: BiTargetLock,
    iconColor: "#7B61FF",
    backgroundColor: "#F5F3FF",
  },
  {
    title: "Financial Strategie",
    date: "21 January 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    icon: HiOutlineCurrencyDollar,
    iconColor: "#00B2FF",
    backgroundColor: "#F0FAFF",
  },
]





export default function StrategiesPage() {
  return (
    <main className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Strategie</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <StrategyCard
              key={index}
              title={strategy.title}
              date={strategy.date}
              description={strategy.description}
              icon={strategy.icon}
              iconColor={strategy.iconColor}
              backgroundColor={strategy.backgroundColor}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

