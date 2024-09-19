import { MetadataRoute } from 'next';

// 공통 URL을 가져오는 함수
async function getBaseUrl(): Promise<string> {
  return process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
}

// Post 타입 정의
interface Post {
  slug: string;
}

// 포스트 슬러그를 가져오는 함수
async function getPostSlugs(page: number = 1, limit: number = 100): Promise<string[]> {
  try {
    const response = await fetch(`${await getBaseUrl()}/api/posts?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post slugs');
    }
    const { posts }: { posts: Post[] } = await response.json();
    return posts.map(post => post.slug);
  } catch (error) {
    console.error("Failed to fetch post slugs:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getBaseUrl();
  const slugs = await getPostSlugs();

  const postUrls = slugs.map((slug) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: new Date().toISOString(),
    priority: 1.0, 
    changefreq: 'daily', 
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 0.8, 
      changefreq: 'monthly',
    },
    {
      url: `${baseUrl}/write`,
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'yearly',
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date().toISOString(),
      priority: 1.0, 
      changefreq: 'daily',
    },
    ...postUrls,  // 동적으로 생성된 포스트 URL들 추가
  ];
}
