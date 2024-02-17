import SearchAndTags from "@/components/search-post/search-tags";
import PostsListWrapper from "@/components/post/posts-list-wrapper";
import SearchTagsWrapper from "@/components/search-post/search-tags-wrapper";
import PostsListLoading from "@/components/loading/posts-list-loading";

export default function Loading() {
  return (
    <>
      <main>
        <article>
          <SearchTagsWrapper>
            <SearchAndTags />
          </SearchTagsWrapper>

          <PostsListWrapper>
            <PostsListLoading />
          </PostsListWrapper>
        </article>
      </main>
    </>
  );
}
