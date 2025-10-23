"use client"

import { useState } from "react"
import Image from "next/image"
import { easeInOut, motion } from "framer-motion"

interface TeamMember {
  name: string
  role: string
  image: string
}

interface ExpandImageProps {
  members?: TeamMember[]
  shadowColor?: string
  hoverShadowColor?: string
  shadowIntensity?: "light" | "medium" | "heavy"
}

const teamMembers: TeamMember[] = [
  {
    name: "Jane Doe",
    role: "UI & UX Designer",
    image:
      "https://images.pexels.com/photos/1845208/pexels-photo-1845208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    name: "Alex Smith",
    role: "CEO Expert",
    image:
      "https://images.pexels.com/photos/36469/woman-person-flowers-wreaths.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    name: "Emily New",
    role: "Web Designer",
    image:
      "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
}

const getShadowStyle = (
  color: string,
  intensity: "light" | "medium" | "heavy",
) => {
  const intensityValues = {
    light: "1px 3px 10px",
    medium: "1px 5px 15px",
    heavy: "1px 7px 20px",
  }
  return `${intensityValues[intensity]} ${color}`
}

export function ExpandImage({
  members = teamMembers,
  shadowColor = "#1e0e3e",
  hoverShadowColor = "#7645d8",
  shadowIntensity = "medium",
}: ExpandImageProps) {
  const normalShadow = getShadowStyle(shadowColor, shadowIntensity)
  const hoverShadow = getShadowStyle(hoverShadowColor, shadowIntensity)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div
      className="flex h-[500px] w-full flex-wrap justify-center gap-2.5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {members.map((member, index) => (
        <motion.div
          key={index}
          variants={item}
          className="group relative cursor-pointer overflow-hidden rounded-lg"
          animate={{
            boxShadow: hoveredIndex === index ? hoverShadow : normalShadow,
            translateY: hoveredIndex === index ? -30 : 0,
            flex: hoveredIndex === index ? "0 0 250px" : "0 0 120px",
          }}
          transition={{
            type: "keyframes",
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.5, 1],
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <div className="relative h-full w-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              quality={75}
              priority={false}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <motion.div
              className="bg-linear-to-t absolute bottom-0 flex h-full w-full flex-col items-center justify-end from-[rgba(2,2,46,0.68)] to-transparent p-4 text-2xl text-white"
              initial={false}
              animate={{
                opacity: hoveredIndex === index ? 1 : 1,
                y: hoveredIndex === index ? 0 : "100%",
                transition: {
                  type: "keyframes",
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.5, 1],
                },
              }}
            >
              <motion.h2
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.1,
                }}
              >
                {member.name}
              </motion.h2>
              <motion.span
                className="mt-1.5 block text-lg"
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.2,
                }}
              >
                {member.role}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
