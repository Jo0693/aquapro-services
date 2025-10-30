'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQ({ title, items }: FAQProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {title && (
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-steel text-center mb-8">
          {title}
        </h2>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {items.map((item, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <div className="border-b border-gray-200 last:border-b-0 transition-all hover:bg-gray-50">
                <Disclosure.Button className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-steel/20">
                  <span className="font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-steel transition-transform duration-300 flex-shrink-0 ${
                      open ? 'transform rotate-180' : ''
                    }`}
                  />
                </Disclosure.Button>

                <Transition
                  enter="transition duration-150 ease-out"
                  enterFrom="transform opacity-0 -translate-y-2"
                  enterTo="transform opacity-100 translate-y-0"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform opacity-100 translate-y-0"
                  leaveTo="transform opacity-0 -translate-y-2"
                >
                  <Disclosure.Panel className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </motion.div>
  );
}
