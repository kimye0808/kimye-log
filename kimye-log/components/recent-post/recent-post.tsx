import classes from "./recent-post.module.css";
import Link from "next/link";
import { getAllPosts } from "@/utils/post-utils";
import RecentPostContent from "./recent-post-content";
import { PostData, RawPostData, formatPostData } from "@/utils/format-file";
/**
 * Home Page에서 뜨는 posts
 */
export default async function RecentPost() {
  let postsData: PostData[];
  try {
    const response = await fetch(
      process.env.URL + "/api/posts?page=1&limit=10",
      { next: { tags: ["posts"] } }
    );
    if (!response.ok) {
    }
    const result = await response.json();
    postsData = await Promise.all(
      result?.posts.map((post: RawPostData) => formatPostData(post))
    );
  } catch (error) {
    throw new Error("get recent-posts fail");
  }

  return (
    <>
      <section className={`${classes.recent} section `}>
        <div className={`${classes} container`}>
          <h2
            className={`${classes.headline} headline headline-2 section-title`}
          >
            <span className={`${classes} span`}>Recent Post</span>
          </h2>
          <RecentPostContent postsData={postsData} />
          <Link href="/posts" className={`${classes.btn} btn btn-secondary`}>
            <span>Show More Posts</span>
          </Link>
        </div>
      </section>
    </>
  );
}
