import * as React from "react"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/app/_lib/utils"
import Image from "next/image"

interface BlurGalleryProps extends MotionProps {
  images: { src: string; alt?: string }[]
  className?: string
}

export function BlurGallery({ className, images, ...props }: BlurGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <motion.ul
      className={cn(
        "mx-auto grid w-full max-w-3xl grid-cols-3 gap-1 p-4",
        className,
      )}
      {...props}
    >
      {images.map((image, index) => (
        <motion.li
          key={index}
          className="relative h-48 cursor-pointer overflow-hidden rounded-lg"
          animate={{
            filter:
              hoveredIndex !== null && hoveredIndex !== index
                ? "blur(5px)"
                : "blur(0px)",
            opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.8 : 1,
            scale: hoveredIndex === index ? 1.08 : 1,
            boxShadow:
              hoveredIndex === index
                ? "0 5px 15px rgba(0,0,0,0.4)"
                : "0 2px 5px rgba(0,0,0,0.2)",
            zIndex: hoveredIndex === index ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96],
            scale: { duration: 0.3 },
            opacity: { duration: 0.25 },
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={image.src}
            alt={image.alt || `Gallery image ${index + 1}`}
            fill
            quality={75}
            priority={false}
            className="h-full w-full object-cover"
          />
        </motion.li>
      ))}
    </motion.ul>
  )
}

export type { BlurGalleryProps }
