import PostContent from "@/components/posts/post-detail/post-content";
import PostHeader from "@/components/posts/post-detail/post-header";
import { getPostData } from "@/utils/post-utils";

interface PropsType {
  params: { slug: string };
}

export default async function PostDetail({ params }: PropsType) {
  const slug = params.slug;
  const postData = await getPostData(slug); //{ slug: postSlug, data: data, content: content };

  return (
    <>
      <main>
        <article>
          <PostHeader
            title={postData?.data?.title}
            tags={postData?.data?.tags}
            date={postData?.data?.date}
          />
          <PostContent
            slug={slug}
            image={postData?.data?.image}
            content={postData?.content}
          />
        </article>
      </main>
    </>
  );
}
