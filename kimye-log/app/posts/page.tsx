import SearchAndTags from "@/components/search-post/search-tags";
import PostsList from "@/components/posts/posts-list";

export default function Posts() {
  return (
    <>
      <main>
        <article>
          <SearchAndTags />
          <PostsList />
        </article>
      </main>
    </>
  );
}
