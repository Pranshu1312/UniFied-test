"use client"

import { motion } from "framer-motion"

interface EventCountdownProps {
  days: number
  hours: number
  minutes: number
}

export function EventCountdown({ days, hours, minutes }: EventCountdownProps) {
  const timeUnits = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
  ]

  return (
    <div className="flex gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 text-2xl font-bold backdrop-blur-sm">
            {unit.value}
          </div>
          <span className="mt-2 text-sm">{unit.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
