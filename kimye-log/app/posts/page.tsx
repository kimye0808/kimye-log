import SearchAndTags from "@/components/search-post/search-tags";
import PostsList from "@/components/post/posts-list";
import PostsListWrapper from "@/components/post/posts-list-wrapper";
import SearchTagsWrapper from "@/components/search-post/search-tags-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Software Engineer Kimye0808's Development Blog",
};

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
