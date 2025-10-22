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

  const categoryTitles = {
    general: 'General Questions',
    services: 'Services & Solutions',
    process: 'Process & Timeline',
    pricing: 'Pricing & Investment',
    support: 'Support & Maintenance',
    other: 'Other Questions'
  }

  return (
    <section id="faq" className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
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
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about working with me and getting your project started
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-8" />
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {data.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-purple-200 transition-colors">
                          {faq.question}
                        </h3>
                        {faq.category && (
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                            {categoryTitles[faq.category] || faq.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                        openItems[index] ? 'rotate-180 text-purple-400' : 'group-hover:text-white'
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
                      height: openItems[index] ? 'auto' : 0,
                      opacity: openItems[index] ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                        {faq.answer?.map((block, blockIndex) => {
                          if (block._type === 'block') {
                            return (
                              <p key={blockIndex} className="mb-4 last:mb-0">
                                {block.children?.map((child, childIndex) => {
                                  if (child._type === 'span') {
                                    return (
                                      <span key={childIndex}>
                                        {child.marks?.includes('strong') ? (
                                          <strong className="text-white font-semibold">{child.text}</strong>
                                        ) : child.marks?.includes('em') ? (
                                          <em className="text-purple-200">{child.text}</em>
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                I&apos;m here to help! Let&apos;s discuss your project and answer any questions you have.
              </p>
              <a
                href="#contact"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get in Touch
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
