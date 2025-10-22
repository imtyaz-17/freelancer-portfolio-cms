'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

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

export default function FAQSection({ data }) {
  const [openItems, setOpenItems] = useState({})

  if (!data || !Array.isArray(data)) return null

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Group FAQs by category
  const groupedFAQs = data.reduce((acc, faq) => {
    const category = faq.category || 'general'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {})

  const categoryTitles = {
    general: 'General Questions',
    process: 'Process & Timeline',
    pricing: 'Pricing & Investment',
    timeline: 'Project Timeline',
    support: 'Support & Maintenance',
    other: 'Other Questions'
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about working with me
            </p>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-6" />
          </motion.div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {Object.entries(groupedFAQs).map(([category, faqs]) => (
              <motion.div key={category} variants={itemVariants}>
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                    {categoryTitles[category] || 'Questions'}
                  </h3>
                  
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={faq._id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(`${category}-${index}`)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                              openItems[`${category}-${index}`] ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        
                        <motion.div
                          initial={false}
                          animate={{
                            height: openItems[`${category}-${index}`] ? 'auto' : 0,
                            opacity: openItems[`${category}-${index}`] ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4">
                            <div className="prose prose-sm max-w-none text-gray-700">
                              {faq.answer?.map((block, blockIndex) => {
                                if (block._type === 'block') {
                                  return (
                                    <p key={blockIndex} className="mb-3 last:mb-0">
                                      {block.children?.map((child, childIndex) => {
                                        if (child._type === 'span') {
                                          return (
                                            <span key={childIndex}>
                                              {child.marks?.includes('strong') ? (
                                                <strong>{child.text}</strong>
                                              ) : child.marks?.includes('em') ? (
                                                <em>{child.text}</em>
                                              ) : (
                                                child.text
                                              )}
                                            </span>
                                          )
                                        }
                                        return null
                                      })}
                                    </p>
                                  )
                                }
                                return null
                              })}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-blue-600 rounded-xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                Still have questions?
              </h3>
              <p className="text-blue-100 mb-6">
                I'm here to help! Let's discuss your project and answer any questions you have.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get in Touch
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
