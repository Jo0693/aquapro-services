'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Zap, Wrench, Flame } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation('common');

  const [section1Ref, section1InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [section2Ref, section2InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [section3Ref, section3InView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: Zap,
      title: t('service_detail_1_title'),
      desc: t('service_detail_1_desc'),
      bullets: [
        t('service_detail_1_bullet_1'),
        t('service_detail_1_bullet_2'),
        t('service_detail_1_bullet_3'),
        t('service_detail_1_bullet_4')
      ],
      ref: section1Ref,
      inView: section1InView
    },
    {
      icon: Wrench,
      title: t('service_detail_2_title'),
      desc: t('service_detail_2_desc'),
      bullets: [
        t('service_detail_2_bullet_1'),
        t('service_detail_2_bullet_2'),
        t('service_detail_2_bullet_3'),
        t('service_detail_2_bullet_4')
      ],
      ref: section2Ref,
      inView: section2InView
    },
    {
      icon: Flame,
      title: t('service_detail_3_title'),
      desc: t('service_detail_3_desc'),
      bullets: [
        t('service_detail_3_bullet_1'),
        t('service_detail_3_bullet_2'),
        t('service_detail_3_bullet_3'),
        t('service_detail_3_bullet_4')
      ],
      ref: section3Ref,
      inView: section3InView
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-steel to-blue-900 flex items-center justify-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 max-w-4xl"
        >
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
            {t('services_page_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            {t('services_page_sub')}
          </p>
        </motion.div>
      </section>

      {/* Services Sections */}
      <main className="pt-16 pb-20 px-4 md:px-12 max-w-6xl mx-auto">
        {services.map((service, idx) => {
          const Icon = service.icon;
          const isReverse = idx % 2 === 1;

          return (
            <section
              key={idx}
              ref={service.ref}
              className={`mb-20 last:mb-0 ${idx > 0 ? 'pt-12' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={service.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  isReverse ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Icon Column */}
                <div
                  className={`flex justify-center items-center ${
                    isReverse ? 'md:col-start-2' : ''
                  }`}
                >
                  <div className="w-48 h-48 bg-gradient-to-br from-steel to-blue-900 rounded-full flex items-center justify-center shadow-xl">
                    <Icon className="w-24 h-24 text-white" />
                  </div>
                </div>

                {/* Content Column */}
                <div className={isReverse ? 'md:col-start-1' : ''}>
                  <h2 className="font-poppins text-3xl md:text-4xl font-bold text-steel mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {service.desc}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start">
                        <span className="text-gold mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-block bg-steel hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    {t('cta_free_quote')}
                  </Link>
                </div>
              </motion.div>

              {idx < services.length - 1 && (
                <div className="mt-16 border-b border-gray-300"></div>
              )}
            </section>
          );
        })}
      </main>

      {/* Final CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-gold to-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">
            {t('services_cta_title')}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t('services_cta_sub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-steel hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
            >
              {t('cta_contact')}
            </Link>
            <Link
              href="/"
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-steel text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              {t('back_to_home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
