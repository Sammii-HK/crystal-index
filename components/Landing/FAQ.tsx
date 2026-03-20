'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: 'How does AI crystal identification work?',
      answer: 'Upload a clear photo of your crystal and our AI model analyses colour, texture, structure, and surface patterns to suggest likely matches. You will see a ranked list of candidates along with lookalikes and key differences, so you can make an informed identification.',
    },
    {
      question: 'How many crystals are in the database?',
      answer: 'Crystal Index currently features over 200 crystals and minerals, each with detailed descriptions, chakra and zodiac associations, metaphysical properties, and care instructions. The collection is growing regularly as new entries are researched and added.',
    },
    {
      question: 'Is Crystal Index free?',
      answer: 'Yes. You can browse the full crystal encyclopaedia, read meanings, explore chakra and zodiac connections, and search the entire library for free on the web. The iOS app offers additional features such as personal collection management and AI identification.',
    },
    {
      question: 'How do I add crystals to my collection?',
      answer: 'Download the Crystal Index app for iOS, then tap any crystal to add it to your personal collection. You can also use the Quick Add feature to photograph a crystal and add it in one step. Your collection syncs across devices so it is always up to date.',
    },
    {
      question: 'What information is included for each crystal?',
      answer: 'Every crystal page includes a detailed description, appearance notes, colour and structure information, chakra associations, zodiac connections, metaphysical properties, common uses, and a care and cleansing guide so you know exactly how to look after it.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            <h2 className="title is-2 has-text-centered mb-6">
              Frequently asked questions
            </h2>
            <div className="content">
              {faqs.map((faq, index) => (
                <div key={index} className="box mb-4" style={{
                  border: '1px solid rgba(147, 51, 234, 0.1)',
                  borderRadius: '12px',
                }}>
                  <div
                    className="is-flex is-justify-content-space-between is-align-items-center is-clickable"
                    onClick={() => toggleFAQ(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 className="title is-5 mb-0">{faq.question}</h3>
                    <span className="icon">
                      <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'}`}></i>
                    </span>
                  </div>
                  {openIndex === index && (
                    <div className="mt-4">
                      <p style={{ lineHeight: 1.7, opacity: 0.85 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
