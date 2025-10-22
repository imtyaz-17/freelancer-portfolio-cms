'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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

export default function TestimonialsSection({ data }) {
  if (!data || !Array.isArray(data)) return null

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take my word for it - hear from the clients I've helped succeed
            </p>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-6" />
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <div className="bg-gray-50 rounded-xl p-8 h-full flex flex-col">
                  {/* Quote */}
                  <div className="flex-1">
                    <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                    <blockquote className="text-gray-700 leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    {/* Client Photo */}
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      {testimonial.clientPhoto ? (
                        <Image
                          src={testimonial.clientPhoto.asset?.url}
                          alt={testimonial.clientPhoto.alt || testimonial.clientName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-lg">
                            {testimonial.clientName?.charAt(0) || 'C'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Client Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.clientName}
                      </h4>
                      {testimonial.clientTitle && (
                        <p className="text-sm text-gray-600">
                          {testimonial.clientTitle}
                        </p>
                      )}
                      {testimonial.projectType && (
                        <p className="text-xs text-blue-600 font-medium">
                          {testimonial.projectType}
                        </p>
                      )}
                    </div>

                    {/* Featured Badge */}
                    {testimonial.featured && (
                      <div className="flex-shrink-0">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-blue-50 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to join these satisfied clients?
              </h3>
              <p className="text-gray-600 mb-6">
                Let's discuss how I can help your business achieve similar results.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
