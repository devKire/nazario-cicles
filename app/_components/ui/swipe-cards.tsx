"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

import Image from "next/image"
import { cn } from "@/app/_lib/utils"

export interface CardData {
  id: number
  url: string
  name?: string
  age?: number
  location?: string
  bio?: string
  interests?: string[]
}

export interface SwipeCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: CardData[]
  // eslint-disable-next-line no-unused-vars
  onSwipe?: (id: number, direction: "left" | "right") => void
  className?: string
}

export interface CardProps extends CardData {
  cards: CardData[]
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>
  // eslint-disable-next-line no-unused-vars
  onSwipe?: (id: number, direction: "left" | "right") => void
  className?: string
}

export function SwipeCards({
  data,
  onSwipe,
  className,
  ...props
}: SwipeCardsProps) {
  const [cards, setCards] = React.useState<CardData[]>(data)

  return (
    <div
      className={cn(
        "relative grid h-full w-full place-items-center",
        className,
      )}
      {...props}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          cards={cards}
          setCards={setCards}
          onSwipe={onSwipe}
          {...card}
        />
      ))}
      {cards.length === 0 && (
        <div className="text-muted-foreground">No more profiles</div>
      )}
    </div>
  )
}

function Card({
  id,
  url,
  name,
  age,
  location,
  bio,
  interests,
  setCards,
  cards,
  onSwipe,
  className,
}: CardProps) {
  const x = useMotionValue(0)
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18])
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0])
  const isFront = id === cards[cards.length - 1].id

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6
    return `${rotateRaw.get() + offset}deg`
  })

  const handleDragEnd = () => {
    const xVal = x.get()
    if (Math.abs(xVal) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id))
      onSwipe?.(id, xVal > 0 ? "right" : "left")
    }
  }

  const [imageError, setImageError] = React.useState(false)

  return (
    <motion.div
      className={cn(
        "relative h-96 w-72 origin-bottom select-none rounded-lg shadow-lg",
        isFront && "cursor-grab active:cursor-grabbing",
        className,
      )}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        touchAction: "none",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: -1000, right: 1000 }}
      dragElastic={0.15}
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 1.02 }}
    >
      {imageError ? (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
          Failed to load image
        </div>
      ) : (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Image
            src={url}
            alt={`${name}'s profile`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="pointer-events-none object-cover"
            onError={() => setImageError(true)}
            priority={isFront}
            quality={75}
          />

          {/* Gradiente + Blur para melhor contraste */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white">
            {/* Camada de blur */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Conteúdo */}
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                {name && (
                  <h3 className="text-xl font-semibold drop-shadow-lg">
                    {name}
                  </h3>
                )}
                {age && <span className="text-lg drop-shadow-lg">{age}</span>}
              </div>

              {location && (
                <p className="text-sm text-gray-200 drop-shadow-lg">
                  {location}
                </p>
              )}

              {bio && (
                <p className="mt-2 line-clamp-2 text-sm drop-shadow-lg">
                  {bio}
                </p>
              )}

              {interests && interests.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full bg-white/20 px-2 py-0.5 text-xs drop-shadow-lg backdrop-blur-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
