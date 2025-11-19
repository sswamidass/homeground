import React, { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
};

export default function WPExample() {
  const apiBase = (import.meta.env.VITE_WP_API_URL as string) || 'http://localhost:8000';
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/wp-json/wp/v2/posts`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [apiBase]);

  if (loading) return <div>Loading posts from WordPress...</div>;
  if (error) return <div>Error loading posts: {error}</div>;
  if (!posts || posts.length === 0) return <div>No posts found.</div>;

  return (
    <div>
      <h2>WordPress Posts (example)</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <a href={p.link} target="_blank" rel="noreferrer">
              <span dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
