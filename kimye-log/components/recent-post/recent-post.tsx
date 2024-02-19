import classes from "./recent-post.module.css";
import Link from "next/link";
import { getAllPosts } from "@/utils/post-utils";
import RecentPostContent from "./recent-post-content";

export default async function RecentPost() {
  let postsData = await getAllPosts(); //  [ { slug: postSlug, data: data, content: content }, ...]
  return (
    <>
      <section className={`${classes.recent} section `}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Recent Post</span>
          </h2>
          <RecentPostContent postsData={postsData} />
          <Link href="/posts" className={`${classes.btn} btn btn-secondary`}>
            <span className={`${classes} span}`}>Show More Posts</span>
          </Link>
        </div>
      </section>
    </>
  );
}
