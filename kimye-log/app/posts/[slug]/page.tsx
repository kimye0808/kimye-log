import PostContent from "@/components/post/post-detail/post-content";
import PostHeader from "@/components/post/post-detail/post-header";
import { formatPostData } from "@/utils/format-file";
import { PostData } from "@/utils/format-file";

interface PropsType {
  params: { slug: string };
}

export default async function PostDetail({ params }: PropsType) {
  const slug = params.slug;
  let postData: PostData;
  try {
    const response = await fetch(process.env.URL + `/api/post?slug=${slug}`);
    if (!response.ok) {
    }
    const result = await response.json();
    postData = await formatPostData(result.post);
  } catch (error) {
    throw new Error("get recent-posts fail");
  }

  return (
    <>
      <main>
        <article>
          <PostHeader
            title={postData?.title}
            tags={postData?.tags}
            date={postData?.date}
          />
          <PostContent
            image={postData?.thumbnail}
            content={postData?.contents}
          />
        </article>
      </main>
    </>
  );
}
