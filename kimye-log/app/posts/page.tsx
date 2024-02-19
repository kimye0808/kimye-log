import SearchAndTags from "@/components/search-post/search-tags";
import PostsList from "@/components/post/posts-list";
import PostsListWrapper from "@/components/post/posts-list-wrapper";
import SearchTagsWrapper from "@/components/search-post/search-tags-wrapper";

export default function Posts() {
  return (
    <>
      <main>
        <article>
          <SearchTagsWrapper>
            <SearchAndTags />
          </SearchTagsWrapper>

          <PostsList />
        </article>
      </main>
    </>
  );
}
