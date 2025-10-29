'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[500px] bg-gradient-to-br from-steel to-blue-900 flex items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 max-w-4xl"
        >
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
            {t('contact_title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            {t('contact_sub')}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
