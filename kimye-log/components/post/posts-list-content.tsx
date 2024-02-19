"use client";
import Link from "next/link";
import CardDetail from "../card/card-detail";
import classes from "./posts-list.module.css";
import logoImg from "@/assets/logo.png";
import { PostData } from "@/utils/post-utils";
import { useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import {
  searchPostByInput,
  searchPostByTag,
} from "@/lib/features/search/searchSllice";
import PostsListLoading from "../loading/posts-list-loading";

interface Propstype {
  initialList: PostData[];
}

export default function PostsListContent({ initialList }: Propstype) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const searchResult = useAppSelector((state) => {
    return state.search.posts;
  });
  const fetchingStatus = useAppSelector((state) => {
    return state.search.loading;
  });
  const searchQuery = searchParams.get("q");
  const tagQuery = searchParams.get("tag");
  /**
   * fetching status를 체크하고 lazy-loading 부분을 보여줄지 결정한다.
   */
  let isLoading = false;
  switch (fetchingStatus) {
    case "pending":
      isLoading = true;
      break;
    case "fulfilled":
    default:
      break;
  }
  /**
   * /posts?q=검색어 이면 dispatch
   * /posts?tag=태그이름 이면 dispatch
   * /posts면 서버에서 fetch했던 data
   */
  useEffect(() => {
    if (searchQuery) {
      dispatch(searchPostByInput(searchQuery));
    } else if (tagQuery) {
      dispatch(searchPostByTag(tagQuery));
    } else {
      // dispatch(fetchRecentPosts());
    }
  }, [dispatch, searchQuery, tagQuery]);

  let postsList = Array.from(searchResult);
  if (!searchQuery && !tagQuery) {
    postsList = initialList;
  }

  /**
   * return
   */
  return (
    <>
      {isLoading ? (
        <PostsListLoading />
      ) : (
        <ul className={classes["posts-list"]}>
          {postsList?.map((post) => {
            return (
              post && (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <li>
                    <CardDetail
                      summary={post?.data?.summary}
                      tags={post?.data?.tags}
                      readingTime={3}
                      title={post?.data?.title}
                      userImg={logoImg}
                      name={"kimye0808"}
                      date={post?.data?.date}
                    />
                  </li>
                </Link>
              )
            );
          })}
        </ul>
      )}
    </>
  );
}
