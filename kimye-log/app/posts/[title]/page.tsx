import PostContent from "@/components/posts/post-detail/post-content";
import PostHeader from "@/components/posts/post-detail/post-header";

interface PropsType {
  params: { title: string };
}

export default function PostDetail({ params }: PropsType) {
  const title = params.title;
  return (
    <>
      <main>
        <article>
          <PostHeader
            title="smile is good"
            tags={["react", "js"]}
            date="2024-02-16"
          />
          <PostContent slug="test1" image="test1.png" content="ddddddd" />
        </article>
      </main>
    </>
  );
}
