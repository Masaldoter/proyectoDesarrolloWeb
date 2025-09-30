"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
  className?: string
}

export default function Typewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex]

        if (isDeleting) {
          setCurrentText((prev) => prev.slice(0, -1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        } else {
          setCurrentText(current.slice(0, currentText.length + 1))

          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
