'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -5 }
}

// Star Rating Component
const StarRating = ({ rating, size = 'w-4 h-4' }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  if (!data || !Array.isArray(data)) return null

  // Calculate number of slides (3 testimonials per slide)
  const testimonialsPerSlide = 3
  const totalSlides = Math.ceil(data.length / testimonialsPerSlide)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    }, 5000) // Increased to 5 seconds for multiple testimonials

    return () => clearInterval(interval)
  }, [totalSlides, isAutoPlaying, isDragging])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials" className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                What Clients Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Don't just take my word for it - hear from the clients I've helped succeed
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-6" />
          </motion.div>

          {/* Multi-Testimonial Carousel Container */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="relative overflow-hidden">
              {/* Carousel Track */}
              <div className="relative">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentIndex * 100}%` }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Create slides with multiple testimonials */}
                  {Array.from({ length: Math.ceil(data.length / 3) }, (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.slice(slideIndex * 3, (slideIndex + 1) * 3).map((testimonial, cardIndex) => (
                          <motion.div
                            key={testimonial._id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group h-full"
                          >
                            <div className="bg-gradient-to-br from-white/10 via-white/5 to-purple-900/10 backdrop-blur-sm rounded-3xl p-6 h-full flex flex-col border border-white/20 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                              {/* Featured Badge */}
                              {testimonial.featured && (
                                <div className="flex justify-center mb-4">
                                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 text-xs font-medium rounded-full border border-yellow-500/30">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Featured
                                  </span>
                                </div>
                              )}

                              {/* Quote */}
                              <div className="flex-1">
                                <svg className="w-8 h-8 text-purple-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                </svg>
                                <blockquote className="text-gray-200 leading-relaxed mb-6 text-lg">
                                  "{testimonial.quote}"
                                </blockquote>
                              </div>

                              {/* Client Info */}
                              <div className="flex items-center space-x-4">
                                {/* Client Photo */}
                                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-400/30">
                                  {testimonial.clientPhoto && testimonial.clientPhoto.asset?.url ? (
                                    <Image
                                      src={testimonial.clientPhoto.asset.url}
                                      alt={testimonial.clientPhoto.alt || testimonial.clientName}
                                      width={56}
                                      height={56}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                      <span className="text-white font-bold text-lg">
                                        {testimonial.clientName?.charAt(0) || 'C'}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Client Details */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-white mb-1">
                                    {testimonial.clientName}
                                  </h4>
                                  {testimonial.clientTitle && (
                                    <p className="text-purple-300 text-sm mb-2">
                                      {testimonial.clientTitle}
                                    </p>
                                  )}
                                  {testimonial.projectType && (
                                    <p className="text-xs text-gray-400 mb-2">
                                      {testimonial.projectType}
                                    </p>
                                  )}
                                  {/* Star Rating */}
                                  {testimonial.rating && (
                                    <div className="flex">
                                      <StarRating rating={testimonial.rating} size="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group z-10 opacity-0 group-hover:opacity-100"
                  aria-label="Previous testimonials"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group z-10 opacity-0 group-hover:opacity-100"
                  aria-label="Next testimonials"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Modern Dots Indicator */}
              <div className="flex justify-center space-x-3 mt-10">
                {Array.from({ length: Math.ceil(data.length / 3) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-purple-400 scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentIndex && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute inset-0 bg-purple-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

            </div>
          </motion.div>


          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-purple-900/10 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-white/20 shadow-xl shadow-purple-500/10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Ready to join these satisfied clients?
              </h3>
              <p className="text-gray-200 mb-6">
                Let's discuss how I can help your business achieve similar results.
              </p>
              <a
                href="#contact"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10">Start Your Project</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
