import SearchAndTags from "@/components/search-post/search-tags";
import PostsListWrapper from "@/components/post/posts-list-wrapper";
import SearchTagsWrapper from "@/components/search-post/search-tags-wrapper";
import PostsListLoading from "@/components/loading/posts-list-loading";
import TagsLoading from "@/components/loading/tags-loading";

export default function Loading() {
  return (
    <>
      <main>
        <article>
          <SearchTagsWrapper>
            <TagsLoading />
          </SearchTagsWrapper>

          <PostsListWrapper>
            <PostsListLoading />
          </PostsListWrapper>
        </article>
      </main>
    </>
  );
}
