'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Mail, X } from 'lucide-react';
import Link from 'next/link';

export default function FloatingCTA() {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className="fixed bottom-6 right-6 z-[9998] bg-steel hover:bg-blue-900 text-white font-semibold py-3.5 px-7 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2 animate-pulse lg:py-3.5 lg:px-7"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline">{t('floating_cta')}</span>
        <span className="sm:hidden">📞</span>
      </motion.button>

      {/* Emergency Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-steel rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-poppins text-2xl font-bold text-steel mb-2">
                  {t('modal_urgency_title')}
                </h2>
                <p className="text-gray-600">
                  {t('modal_urgency_sub')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href="tel:+33612345678"
                  className="flex items-center justify-center space-x-3 w-full bg-steel hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-md"
                >
                  <Phone className="w-5 h-5" />
                  <span>{t('modal_cta_call')}</span>
                </a>

                <a
                  href="https://wa.me/33612345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{t('modal_cta_whatsapp')}</span>
                </a>

                <Link
                  href="/contact"
                  onClick={closeModal}
                  className="flex items-center justify-center space-x-3 w-full bg-gold hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-md"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t('modal_cta_message')}</span>
                </Link>
              </div>

              {/* Footer note */}
              <p className="text-center text-sm text-gray-500 mt-6">
                {t('modal_urgency_footer')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
