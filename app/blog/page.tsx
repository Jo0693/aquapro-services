import { getAllPosts } from '@/lib/blog';
import BlogClient from './BlogClient';

export default function Blog() {
  const postsFr = getAllPosts('fr');
  const postsEn = getAllPosts('en');

  return <BlogClient postsFr={postsFr} postsEn={postsEn} />;
}
