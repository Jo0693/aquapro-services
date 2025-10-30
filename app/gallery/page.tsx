'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  captionKey: string;
  beforeImg: string;
  afterImg: string;
}

export default function Gallery() {
  const { t } = useTranslation('common');
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBeforeView, setIsBeforeView] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      captionKey: 'project_gallery_1',
      beforeImg: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&q=80', // Old bathroom
      afterImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80' // Modern bathroom
    },
    {
      id: 2,
      captionKey: 'project_gallery_2',
      beforeImg: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80', // Old shower
      afterImg: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80' // Walk-in shower
    },
    {
      id: 3,
      captionKey: 'project_gallery_3',
      beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', // Old sink/leak
      afterImg: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200&q=80' // Fixed modern sink
    },
    {
      id: 4,
      captionKey: 'project_gallery_4',
      beforeImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80', // Old water heater
      afterImg: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200&q=80' // New water heater
    },
    {
      id: 5,
      captionKey: 'project_gallery_5',
      beforeImg: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80', // Old faucet
      afterImg: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1200&q=80' // Modern faucet
    },
    {
      id: 6,
      captionKey: 'project_gallery_6',
      beforeImg: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&q=80', // Clogged toilet
      afterImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80' // Fixed bathroom
    }
  ];

  const openLightbox = (project: Project) => {
    setSelectedProject(project);
    setIsBeforeView(false); // Always start with "After" view
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setIsBeforeView(false);
    document.body.style.overflow = 'unset';
  };

  const navigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    } else {
      newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedProject(projects[newIndex]);
    setIsBeforeView(false);
  };

  const toggleBeforeAfter = () => {
    setIsBeforeView(!isBeforeView);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-lightgray">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-steel to-blue-900 text-white py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center"
        >
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-4">
            {t('gallery_page_title')}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            {t('gallery_page_sub')}
          </p>
        </motion.div>
      </section>

      <main className="py-20 px-6 max-w-7xl mx-auto">
        {/* Gallery Grid */}
        <section ref={gridRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-[4/3] bg-gray-200"
                onClick={() => openLightbox(project)}
              >
                <img
                  src={project.afterImg}
                  alt={t(project.captionKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-white">
                  <h3 className="font-poppins text-lg font-semibold mb-2 text-center text-shadow">
                    {t(project.captionKey)}
                  </h3>
                  <p className="text-sm text-shadow font-medium">{t('gallery_view_label')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-gold to-yellow-600 rounded-xl p-8 md:p-12 text-center text-white shadow-xl"
        >
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">
            {t('gallery_cta_title')}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">{t('gallery_cta_sub')}</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-steel hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            {t('cta_free_quote')}
          </Link>
        </motion.section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-[10000] bg-black/50 hover:bg-black/70 rounded-full p-2"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateProject('prev')}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-[10000]"
                aria-label="Previous"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => navigateProject('next')}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-[10000]"
                aria-label="Next"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={isBeforeView ? 'before' : 'after'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={isBeforeView ? selectedProject.beforeImg : selectedProject.afterImg}
                      alt={t(selectedProject.captionKey)}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Badge showing Before/After */}
                  <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    {isBeforeView ? t('gallery_before') : t('gallery_after')}
                  </div>

                  {/* Before/After Toggle Button - Centered at Bottom */}
                  <button
                    onClick={toggleBeforeAfter}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1C4E80] hover:bg-[#163e68] text-white px-6 py-3 rounded-full shadow-xl font-medium transition-all z-[100] flex items-center space-x-2"
                  >
                    <span>{isBeforeView ? t('gallery_toggle_after') : t('gallery_toggle_before')}</span>
                  </button>
                </div>

                {/* Caption */}
                <div className="p-6 bg-white">
                  <h3 className="font-poppins text-xl md:text-2xl font-bold text-steel">
                    {t(selectedProject.captionKey)}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
