import PostContent from "@/components/post/post-detail/post-content";
import PostHeader from "@/components/post/post-detail/post-header";
import { getPostData } from "@/utils/post-utils";

import PostHeaderLoading from "@/components/loading/postl-header-loading";
import PostContentLoading from "@/components/loading/postl-content-loading";

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
