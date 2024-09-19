import PostContent from "@/components/post/post-detail/post-content";
import PostHeader from "@/components/post/post-detail/post-header";
import { formatPostData } from "@/utils/format-file";
import { PostData } from "@/utils/format-file";

interface PropsType {
  params: { slug: string };
}

// 공통으로 사용할 fetch 함수
async function fetchPostData(slug: string): Promise<PostData | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post?slug=${slug}`);
    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return await formatPostData(result.post);
  } catch (error) {
    console.error("Failed to fetch post data:", error);
    return null;
  }
}

// generateMetadata 함수
export async function generateMetadata({ params }: PropsType) {
  const postData = await fetchPostData(params.slug);

  if (!postData) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
      alternates: {
        canonical: new URL(`/post/${params.slug}`, process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000").toString(),
      },
    };
  }

  // BASE_URL 또는 기본값을 사용하여 canonical URL 생성
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const canonicalUrl = new URL(`/post/${params.slug}`, baseUrl).toString();

  return {
    title: postData.title,
    description: postData.contents.substring(0, 150), // 내용의 첫 150자를 설명으로 사용
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// PostDetail 컴포넌트
export default async function PostDetail({ params }: PropsType) {
  const postData = await fetchPostData(params.slug);

  if (!postData) {
    throw new Error("Failed to load post data");
  }

  return (
    <>
      <main>
        <article>
          <PostHeader
            title={postData.title}
            tags={postData.tags}
            date={postData.date}
          />
          <PostContent
            image={postData.thumbnail}
            content={postData.contents}
          />
        </article>
      </main>
    </>
  );
}
