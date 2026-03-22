'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem { question: string; answer: string }

const faqs: FAQItem[] = [
  {
    question: 'How does AI crystal identification work?',
    answer: 'Upload a clear photo of your crystal and our AI model analyses colour, texture, structure, and surface patterns to suggest likely matches. You will see a ranked list of candidates along with lookalikes and key differences, so you can make an informed identification.',
  },
  {
    question: 'How many crystals are in the database?',
    answer: 'Crystal Index currently features over 215 crystals and minerals, each with detailed descriptions, chakra and zodiac associations, metaphysical properties, and care instructions. The collection grows regularly.',
  },
  {
    question: 'Is Crystal Index free?',
    answer: 'The crystal encyclopaedia at crystalindex.co.uk is free to browse forever. The iOS app gives you full premium access to start — unlimited AI identification, personal collection management, and CloudKit sync across your devices.',
  },
  {
    question: 'How do I add crystals to my collection?',
    answer: 'Download the Crystal Index app for iOS, then tap any crystal to add it to your personal collection. The Quick Add feature lets you photograph a crystal and add it in one step. Your collection syncs across devices.',
  },
  {
    question: 'What information is included for each crystal?',
    answer: 'Every page includes a detailed description, appearance notes, colour and structure info, chakra associations, zodiac connections, metaphysical properties, common uses, and a care and cleansing guide.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section" aria-label="Frequently asked questions">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            <h2 className="title is-2 has-text-centered mb-6">
              Frequently asked questions
            </h2>
            <div>
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={index} style={{
                    background: 'var(--ci-card-bg)',
                    border: '1px solid var(--ci-card-border)',
                    borderRadius: '12px',
                    marginBottom: '0.75rem',
                    overflow: 'hidden',
                  }}>
                    <button
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.25rem 1.5rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '1rem',
                        color: 'inherit',
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--ci-text)', lineHeight: 1.4 }}>
                        {faq.question}
                      </span>
                      {isOpen
                        ? <ChevronUp size={18} color="var(--ci-accent)" aria-hidden="true" style={{ flexShrink: 0 }} />
                        : <ChevronDown size={18} color="var(--ci-text-muted)" aria-hidden="true" style={{ flexShrink: 0 }} />
                      }
                    </button>
                    {isOpen && (
                      <div id={`faq-answer-${index}`} style={{ padding: '0 1.5rem 1.25rem' }}>
                        <p style={{ color: 'var(--ci-text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
