'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-steel text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-poppins text-xl font-bold mb-4">AquaPro Services</h3>
            <p className="text-gray-300">{t('footer_tagline')}</p>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">{t('footer_contact')}</h4>
            <div className="space-y-2 text-gray-300">
              <p>
                <a href="tel:+33123456789" className="hover:text-gold transition-colors">
                  {t('footer_phone')}
                </a>
              </p>
              <p>
                <a href="mailto:contact@aquapro-services.fr" className="hover:text-gold transition-colors">
                  {t('footer_email')}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold mb-4">{t('footer_hours')}</h4>
            <p className="text-gray-300">{t('footer_availability')}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-gray-300">
          <p>&copy; 2025 AquaPro Services. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
