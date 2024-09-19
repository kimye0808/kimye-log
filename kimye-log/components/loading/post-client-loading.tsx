"use client";

import { usePathname } from "next/navigation";
import PostHeaderLoading from "@/components/loading/postl-header-loading";
import PostContentLoading from "@/components/loading/postl-content-loading";
import SearchTagsWrapper from "@/components/search-post/search-tags-wrapper";
import TagsLoading from "@/components/loading/tags-loading";
import PostsListWrapper from "@/components/post/posts-list-wrapper";
import PostsListLoading from "@/components/loading/posts-list-loading";

export default function PostClientLoading() {
  const pathname = usePathname();

  // 하위 경로인 [slug]로 이동 중일 때 상위의 loading을 표시하지 않음
  if (pathname.startsWith("/posts/") && pathname !== "/posts") {
    return (
      <>
        <article>
          <PostHeaderLoading />
          <PostContentLoading />
        </article>
      </>
    );
  }

  return (
    <>
      <article>
        <SearchTagsWrapper>
          <TagsLoading />
        </SearchTagsWrapper>

        <PostsListWrapper>
          <PostsListLoading />
        </PostsListWrapper>
      </article>
    </>
  );
}
