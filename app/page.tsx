'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import FAQ from '@/components/FAQ';

export default function Home() {
  const { t } = useTranslation('common');

  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [whyUsRef, whyUsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: '⚡',
      title: t('service_1_title'),
      desc: t('service_1_desc')
    },
    {
      icon: '🔧',
      title: t('service_2_title'),
      desc: t('service_2_desc')
    },
    {
      icon: '🔥',
      title: t('service_3_title'),
      desc: t('service_3_desc')
    }
  ];

  const whyUs = [
    {
      icon: '⚡',
      title: t('why_1_title'),
      desc: t('why_1_desc')
    },
    {
      icon: '💰',
      title: t('why_2_title'),
      desc: t('why_2_desc')
    },
    {
      icon: '✓',
      title: t('why_3_title'),
      desc: t('why_3_desc')
    }
  ];

  const faqItems = [
    { question: t('faq_1_q'), answer: t('faq_1_a') },
    { question: t('faq_2_q'), answer: t('faq_2_a') },
    { question: t('faq_3_q'), answer: t('faq_3_a') }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] bg-gradient-to-br from-steel to-blue-900 flex items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 max-w-4xl"
        >
          <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-6">
            {t('home_title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto">
            {t('home_sub')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg"
          >
            {t('cta_quote')}
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-steel mb-4">
              {t('services_section_title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('services_section_sub')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-lightgray p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-poppins text-xl font-semibold text-steel mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-steel hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('see_all_services')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyUsRef} className="py-20 bg-gradient-to-br from-steel to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">{t('why_us_title')}</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">{t('why_us_sub')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-poppins text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section ref={projectsRef} className="py-20 bg-lightgray">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-steel mb-4">
              {t('projects_title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('projects_sub')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={projectsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80"
                  alt={t('project_1_alt')}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg text-shadow">{t('gallery_view_label')}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-steel mb-2 text-lg">{t('project_1_title')}</h3>
                <p className="text-gray-600 text-sm">{t('project_1_desc')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={projectsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80"
                  alt={t('project_2_alt')}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg text-shadow">{t('gallery_view_label')}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-steel mb-2 text-lg">{t('project_2_title')}</h3>
                <p className="text-gray-600 text-sm">{t('project_2_desc')}</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-block bg-steel hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('see_all_projects')}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-lightgray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-steel mb-4">
              {t('faq_title')}
            </h2>
            <p className="text-gray-600 mb-8">{t('faq_sub')}</p>
          </div>

          <FAQ items={faqItems} />

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-block bg-steel hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('see_all_faqs')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold to-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">
            {t('cta_section_title')}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">{t('cta_section_sub')}</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-steel hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
          >
            {t('cta_contact')}
          </Link>
        </div>
      </section>
    </div>
  );
}
