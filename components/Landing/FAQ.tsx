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
      question: 'Is Crystal Index free to use?',
      answer: 'Yes. You can browse the crystal library, read meanings, and use basic search for free. Premium unlocks AI image identification and advanced tools.',
    },
    {
      question: 'How accurate is the AI identification?',
      answer: 'No AI is perfect, but we train our model specifically on crystals and minerals. You\'ll see a list of likely matches, along with lookalikes and key differences, so you can make an informed decision.',
    },
    {
      question: 'Do you store my photos?',
      answer: 'We don\'t store or use your photos for training without your explicit consent. You stay in control of your images and your data.',
    },
    {
      question: 'Do I need to know anything about crystals to use this?',
      answer: 'Not at all. Crystal Index is designed for beginners and experts alike. Whether you\'re identifying your first crystal or your hundredth, the platform guides you through the process.',
    },
    {
      question: 'What\'s the difference between Free and Premium?',
      answer: 'Free gives you access to browse the crystal library, read meanings, and use basic search. Premium adds AI image identification, unlimited identifications, collections, comparison tools, and early access to new features.',
    },
    {
      question: 'Can I use this for my shop or business?',
      answer: 'Yes. Crystal Index is ideal for shop owners, jewellers, and healers who want faster, more accurate identification and better product descriptions.',
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
                <div key={index} className="box mb-4">
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
                      <p>{faq.answer}</p>
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


