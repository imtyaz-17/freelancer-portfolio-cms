'use client'

import { motion } from 'framer-motion'
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
  hover: { y: -5, scale: 1.02 }
}

export default function ProjectsSection({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  if (!data || !Array.isArray(data)) return null

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  // Calculate number of slides based on responsive cards per view
  const totalSlides = Math.ceil(data.length / cardsPerView)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || isDragging || totalSlides <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    }, 7000) // 7 seconds for better reading time

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

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < totalSlides - 1) {
      nextSlide()
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide()
    }
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Client Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See how I've helped businesses like yours achieve their goals with custom software solutions that drive real results
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-8" />
          </motion.div>

          {/* Projects Carousel Container */}
          <motion.div variants={itemVariants} className="relative">
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
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Create slides with multiple projects */}
                  {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                      <div className={`grid gap-8 ${
                        cardsPerView === 1 ? 'grid-cols-1' : 
                        cardsPerView === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`}>
                        {data.slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView).map((project, cardIndex) => (
                          <motion.div
                            key={project._id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group h-full"
                          >
                            <div className="bg-gradient-to-br from-white/10 via-white/5 to-purple-900/10 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-white/20 group-hover:bg-white/15 group-hover:border-purple-400/30 group-hover:shadow-purple-500/10">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.coverImage && project.coverImage.asset?.url ? (
                      <Image
                        src={project.coverImage.asset.url}
                        alt={project.coverImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <span className="text-purple-300 text-sm">Project Image</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Client Type Badge */}
                    {project.clientType && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium rounded-full capitalize backdrop-blur-sm">
                          {project.clientType.replace('-', ' ')}
                        </span>
                      </div>
                    )}

                    {/* Overlay Links */}
                    <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg backdrop-blur-sm border border-white/30"
                        >
                          Code
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2"
                        >
                          Live Demo
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    {/* Client Name */}
                    {project.clientName && (
                      <div className="text-sm text-purple-300">
                        <span className="font-medium text-purple-400">Client:</span> {project.clientName}
                      </div>
                    )}

                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Problem Solved */}
                    {project.problemSolved && (
                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-1">Challenge:</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {project.problemSolved}
                        </p>
                      </div>
                    )}

                    {/* Solution */}
                    {project.solution && (
                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-1">Solution:</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    )}

                    {/* Results */}
                    {project.resultMetrics && project.resultMetrics.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-2">Results:</h4>
                        <div className="space-y-1">
                          {project.resultMetrics.slice(0, 2).map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center text-sm text-gray-300">
                              <svg
                                className="w-3 h-3 text-green-400 mr-2 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* View Case Study Link */}
                    <a
                      href={`/projects/${project.slug?.current}`}
                      className="inline-flex items-center text-purple-300 hover:text-purple-200 font-medium text-sm group/link"
                    >
                      Read Full Case Study
                      <svg
                        className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                      </div>
                    </div>
                  ))}
                </motion.div>


                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group z-10"
                      aria-label="Previous projects"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={nextSlide}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group z-10"
                      aria-label="Next projects"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Modern Dots Indicator */}
              {totalSlides > 1 && (
                <div className="flex justify-center space-x-3 mt-10">
                  {Array.from({ length: totalSlides }, (_, index) => (
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
              )}

              {/* Progress Bar */}
              {totalSlides > 1 && isAutoPlaying && (
                <div className="mt-6 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    key={currentIndex}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
