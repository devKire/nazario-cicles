"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Quote } from "lucide-react"
import Image from "next/image"
import { InfiniteScroll } from "./ui/infinite-scroll"

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // eslint-disable-next-line no-unused-vars
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      id: "1",
      name: "Carlos Silva",
      company: "CS Arquitetura",
      content:
        "O Insertion 3D Studio transformou nossos projetos com visualizações incríveis. As imagens são tão realistas que nossos clientes conseguem visualizar perfeitamente o resultado final.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=compress&cs=tinysrgb&fit=crop&w=150&q=75",
      rating: 5,
      role: "Arquiteto",
    },
    {
      id: "2",
      name: "Marina Santos",
      company: "Construtora Horizonte",
      content:
        "Excelente trabalho no lançamento do nosso último empreendimento. As tours virtuais aumentaram em 40% as vendas na fase de lançamento.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=compress&cs=tinysrgb&fit=crop&w=150&q=75",
      rating: 5,
      role: "Diretora Comercial",
    },
    {
      id: "3",
      name: "Ricardo Lima",
      company: "RL Projetos",
      content:
        "Profissionalismo e qualidade excepcionais. Prazos cumpridos e um atendimento que realmente entende as necessidades do arquiteto.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&fit=crop&w=150&q=75",
      rating: 5,
      role: "Arquiteto Chefe",
    },
    {
      id: "4",
      name: "Ana Costa",
      company: "AC Design",
      content:
        "A qualidade dos renders é impressionante. Conseguimos fechar contratos apenas mostrando as visualizações em 3D.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=compress&cs=tinysrgb&fit=crop&w=150&q=75",
      rating: 5,
      role: "Designer de Interiores",
    },
    {
      id: "5",
      name: "Fernando Alves",
      company: "Construtora Moderna",
      content:
        "As tours virtuais foram decisivas para o sucesso do nosso último lançamento. Clientes conseguiram visitar o empreendimento remotamente.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=compress&cs=tinysrgb&fit=crop&w=150&q=75",
      rating: 5,
      role: "Gerente de Projetos",
    },
  ]

  // Componente para o card de testimonial
  function TestimonialCard({
    testimonial,
  }: {
    testimonial: (typeof testimonials)[0]
  }) {
    return (
      <div className="shadow-xs border-team-400 group relative mx-3 flex w-[350px] flex-col gap-4 rounded-xl border border-teal-500/30 bg-gradient-to-br from-gray-900/80 to-black/80 p-6 transition-all hover:border-teal-200 hover:bg-white hover:shadow-md">
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-teal-100 ring-offset-2 ring-offset-white transition-all group-hover:ring-teal-200 dark:ring-teal-900/20 dark:ring-offset-gray-900 dark:group-hover:ring-teal-900/30">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              quality={75}
              priority={false}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-gray-200">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>

        {/* Avaliação com estrelas */}
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-lg text-cyan-400">
              ★
            </span>
          ))}
        </div>

        <div className="relative">
          <Quote className="absolute -left-2 -top-2 h-6 w-6 text-teal-200 dark:text-teal-900/30" />
          <p className="pl-4">{testimonial.content}</p>
        </div>
      </div>
    )
  }

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-black py-24 text-white"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-bbh relative z-10 mb-3 bg-gradient-to-r from-teal-400 via-cyan-600 to-teal-800 bg-clip-text text-2xl font-bold tracking-wide text-transparent sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            NOSSOS CLIENTES
          </motion.h2>

          <motion.div
            className="mx-auto mt-4 h-px w-72 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 200 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Depoimentos de arquitetos e construtoras que confiam no nosso
            trabalho
          </motion.p>
        </motion.div>

        {/* Seção com Infinite Scroll */}
        <div className="mb-16">
          <InfiniteScroll duration={30000} direction="normal">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </InfiniteScroll>
        </div>

        {/* Indicadores e elementos decorativos */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="mb-4 text-lg text-gray-400">
              Junte-se aos nossos clientes satisfeitos
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-3 font-semibold text-white transition-all hover:from-teal-500 hover:to-cyan-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Começar Projeto</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
