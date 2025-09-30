"use client"

import { useEffect, useState, useRef } from "react"

interface SkillBarProps {
  skill: string
  percentage: number
  color?: string
}

export default function SkillBar({ skill, percentage, color = "primary" }: SkillBarProps) {
  const [width, setWidth] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(percentage)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage])

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-${color} to-${color}/80 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
