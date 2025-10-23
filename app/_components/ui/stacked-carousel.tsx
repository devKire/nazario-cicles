"use client"

import React, { useState } from "react"
import { cn } from "@/app/_lib/utils"

interface StackedCarouselProps {
  slides: {
    image: string
  }[]
  className?: string
}

export function StackedCarousel({ slides, className }: StackedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const getSlideIndex = (index: number) => {
    const positions = slides.map((_, i) => {
      const diff = (i - activeIndex + slides.length) % slides.length
      return diff
    })
    return positions[index]
  }

  return (
    <div className={cn("relative h-[400px] w-[400px]", className)}>
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute -left-12 top-1/2 z-50 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-12 top-1/2 z-50 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => {
          const position = getSlideIndex(index)
          return (
            <div
              key={index}
              className={cn(
                "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-700",
                "cursor-pointer hover:scale-105",
                {
                  "z-30": position === 0,
                  "z-20": position === 1 || position === slides.length - 1,
                  "z-10": position === 2 || position === slides.length - 2,
                  "opacity-0": position > 2 && position < slides.length - 2,
                  "-translate-x-[98%]": position === slides.length - 1,
                  "translate-x-[0%]": position === 1,
                  "scale-90": position !== 0,
                  "-rotate-12": position === slides.length - 1,
                  "rotate-12": position === 1,
                },
              )}
              onClick={() => position !== 0 && setActiveIndex(index)}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow:
                  position === 0
                    ? "0 0 30px rgba(0, 0, 0, 0.4)"
                    : "0 0 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                className={cn(
                  "bg-linear-to-br absolute inset-0 rounded-2xl transition-opacity duration-700",
                )}
              />
            </div>
          )
        })}
      </div>

      {/* Indicators */}
      <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === activeIndex
                ? "w-6 bg-white"
                : "bg-white/50 hover:bg-white/75",
            )}
          />
        ))}
      </div>
    </div>
  )
}
