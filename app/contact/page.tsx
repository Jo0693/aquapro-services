'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation('common');
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = t('error_name_required');
    if (!formData.email.trim()) {
      newErrors.email = t('error_email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('error_email_invalid');
    }
    if (!formData.phone.trim()) newErrors.phone = t('error_phone_required');
    if (!formData.message.trim()) newErrors.message = t('error_message_required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowToast(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[350px] bg-gradient-to-br from-steel to-blue-900 flex items-center justify-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 max-w-4xl"
        >
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
            {t('contact_page_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            {t('contact_page_sub')}
          </p>
        </motion.div>
      </section>

      <main className="pt-16 pb-20 px-4 md:px-12 max-w-5xl mx-auto space-y-16">
        {/* Contact Form */}
        <motion.section
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="font-poppins text-3xl font-bold text-steel mb-6">
              {t('contact_form_title')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form_name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-steel focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('form_name_placeholder')}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form_email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-steel focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={t('form_email_placeholder')}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form_phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-steel focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={t('form_phone_placeholder')}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form_message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-steel focus:border-transparent ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('form_message_placeholder')}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-steel hover:bg-blue-900 text-white font-semibold py-4 rounded-lg transition-colors duration-300 shadow-lg"
              >
                {t('form_submit')}
              </button>
            </form>
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section
          ref={infoRef}
          initial={{ opacity: 0, y: 30 }}
          animate={infoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-lightgray p-8 rounded-lg">
            <h3 className="font-poppins text-2xl font-bold text-steel mb-6">{t('contact_info_title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-steel">{t('contact_address_label')}</p>
                  <p className="text-gray-700">{t('contact_address')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-steel">{t('contact_phone_label')}</p>
                  <a href="tel:+33612345678" className="text-gold hover:underline">
                    {t('contact_phone')}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageSquare className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-steel">{t('contact_whatsapp_label')}</p>
                  <a
                    href="https://wa.me/33612345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-steel">{t('contact_email_label')}</p>
                  <a href="mailto:contact@aquapro-services.fr" className="text-gold hover:underline">
                    {t('contact_email')}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-steel">{t('contact_hours_label')}</p>
                  <p className="text-gray-700">{t('contact_hours')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lightgray p-8 rounded-lg">
            <h3 className="font-poppins text-2xl font-bold text-steel mb-6">{t('contact_map_title')}</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3470599!3d48.8566969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b005%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          ref={mapRef}
          initial={{ opacity: 0, y: 30 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-gold to-yellow-600 rounded-xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">
            {t('contact_cta_title')}
          </h2>
          <p className="text-lg mb-6">{t('contact_cta_sub')}</p>
          <a
            href="tel:+33612345678"
            className="inline-block bg-white text-steel hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
          >
            📞 {t('contact_cta_button')}
          </a>
        </motion.section>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl z-50"
        >
          <p className="font-semibold">{t('form_success')}</p>
        </motion.div>
      )}
    </div>
  );
}
