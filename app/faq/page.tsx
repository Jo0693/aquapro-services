'use client';

import { useTranslation } from 'react-i18next';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FAQPage() {
  const { t } = useTranslation('common');

  const faqItems = [
    {
      question: t('faq_page_q1'),
      answer: t('faq_page_a1'),
    },
    {
      question: t('faq_page_q2'),
      answer: t('faq_page_a2'),
    },
    {
      question: t('faq_page_q3'),
      answer: t('faq_page_a3'),
    },
    {
      question: t('faq_page_q4'),
      answer: t('faq_page_a4'),
    },
    {
      question: t('faq_page_q5'),
      answer: t('faq_page_a5'),
    },
    {
      question: t('faq_page_q6'),
      answer: t('faq_page_a6'),
    },
    {
      question: t('faq_page_q7'),
      answer: t('faq_page_a7'),
    },
    {
      question: t('faq_page_q8'),
      answer: t('faq_page_a8'),
    },
  ];

  return (
    <div className="min-h-screen bg-lightgray">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-steel to-blue-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-poppins text-4xl md:text-5xl font-bold mb-4"
          >
            {t('faq_page_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            {t('faq_page_sub')}
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-steel to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
              {t('faq_cta_title')}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {t('faq_cta_sub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gold hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                {t('cta_contact')}
              </Link>
              <a
                href="tel:+33612345678"
                className="bg-white hover:bg-gray-100 text-steel font-semibold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                {t('modal_cta_call')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
