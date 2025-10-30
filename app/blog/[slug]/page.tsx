'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/lib/blog';
import { useEffect, useState } from 'react';
import i18n from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useTranslation('common');
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      const locale = i18n.language || 'fr';
      try {
        const postData = getPostBySlug(slug, locale);
        setPost(postData);
      } catch (error) {
        console.error('Error loading post:', error);
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-lightgray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-steel mb-4">
            {t('blog_loading')}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightgray">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-white hover:text-gold transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('back_to_blog')}
              </Link>
              <h1 className="font-poppins text-3xl md:text-5xl font-bold text-white mb-4 text-shadow">
                {post.title}
              </h1>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.date).toLocaleDateString(i18n.language || 'fr')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="font-poppins text-3xl md:text-4xl font-bold text-steel mb-6" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="font-poppins text-2xl md:text-3xl font-bold text-steel mt-8 mb-4" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="font-poppins text-xl md:text-2xl font-semibold text-steel mt-6 mb-3" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-steel" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-gold hover:text-yellow-600 underline" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-gold pl-4 italic text-gray-600 my-4" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-gray-300" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-gray-300 bg-steel text-white px-4 py-2 font-semibold" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-gray-300 px-4 py-2" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.article>
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
              {t('blog_post_cta_title')}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {t('blog_post_cta_sub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gold hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                {t('cta_free_quote')}
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
