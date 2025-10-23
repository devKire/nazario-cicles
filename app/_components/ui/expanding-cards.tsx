"use client"

import { cn } from "@/app/_lib/utils"
import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-cards"

export interface CardItem {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  backgroundUrl: string
}

interface ExpandingCardsProps {
  items: CardItem[]
  className?: string
  // eslint-disable-next-line no-unused-vars
  onCardChange?: (index: number) => void
}

export function ExpandingCards({
  items,
  className,
  onCardChange,
}: ExpandingCardsProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleClick = (id: string, index: number) => {
    if (isMobile) return // Não permite clique em mobile, usa swipe

    setActiveId(id)
    onCardChange?.(index)
  }

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex
    const activeItem = items[activeIndex]
    if (activeItem) {
      setActiveId(activeItem.id)
      onCardChange?.(activeIndex)
    }
  }

  // Versão Desktop - Cards expansivos originais
  const DesktopView = () => (
    <div
      className={cn(
        "hidden min-h-[400px] w-full min-w-[600px] max-w-[900px] items-stretch gap-2 px-4 md:flex",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "relative cursor-pointer overflow-hidden bg-cover bg-center transition-[flex] duration-500 ease-out will-change-transform",
            activeId === item.id
              ? "flex-[10_1_0%] rounded-[40px]"
              : "flex-[1_1_0%] rounded-[30px]",
          )}
          style={{
            backgroundImage: `url(${item.backgroundUrl})`,
          }}
          onClick={() => handleClick(item.id, index)}
        >
          {/* Overlay otimizado */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 ease-out",
              activeId === item.id ? "h-[120px]" : "h-0 opacity-0",
            )}
          />

          {/* Conteúdo otimizado */}
          <div className="absolute bottom-0 left-0 w-full p-5">
            <div
              className={cn(
                "flex items-center transition-all duration-500 ease-out",
                activeId === item.id
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-out",
                  activeId === item.id ? "translate-y-0" : "-translate-y-5",
                )}
              >
                {item.icon}
              </div>
              <div className="ml-3 text-white">
                <div
                  className={cn(
                    "text-lg font-bold transition-all delay-100 duration-500 ease-out",
                    activeId === item.id
                      ? "translate-x-0 opacity-100"
                      : "translate-x-5 opacity-0",
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={cn(
                    "text-sm text-white/80 transition-all delay-200 duration-500 ease-out",
                    activeId === item.id
                      ? "translate-x-0 opacity-100"
                      : "translate-x-5 opacity-0",
                  )}
                >
                  {item.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // Versão Mobile - Swiper com cards
  const MobileView = () => (
    <div
      className={cn(
        "mx-auto block w-full max-w-[400px] py-4 md:hidden",
        className,
      )}
    >
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="h-[500px] w-full"
        onSlideChange={handleSlideChange}
        initialSlide={items.findIndex((item) => item.id === activeId)}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative h-full w-full overflow-hidden rounded-[40px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/80 to-transparent" />

              {/* Conteúdo */}
              <div className="absolute bottom-0 left-0 w-full p-5">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                    {item.icon}
                  </div>
                  <div className="ml-3 text-white">
                    <div className="text-lg font-bold">{item.title}</div>
                    <div className="text-sm text-white/80">{item.subtitle}</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  )
}
