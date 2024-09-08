import PostContentLoading from "@/components/loading/postl-content-loading";
import PostHeaderLoading from "@/components/loading/postl-header-loading";

export default function Loading() {
  return (
    <>
      <main>
        <article>
          <PostHeaderLoading />
          <PostContentLoading />
        </article>
      </main>
    </>
  );
}
