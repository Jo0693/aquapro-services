import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: PageProps) {
  const { slug } = params;

  // Fetch both FR and EN versions
  const postFr = getPostBySlug(slug, 'fr');
  const postEn = getPostBySlug(slug, 'en');

  return <BlogPostClient postFr={postFr} postEn={postEn} />;
}

// Generate static params for all blog posts
export function generateStaticParams() {
  const slugsFr = getPostSlugs('fr');
  return slugsFr.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}
