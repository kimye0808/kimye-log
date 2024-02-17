import classes from "./recent-post.module.css";
import Card from "../card/card";
import logoImg from "@/assets/logo.png";
import Link from "next/link";
import { getAllPosts } from "@/utils/post-utils";

export default async function RecentPost() {
  const postsData = await getAllPosts(); //  [ { slug: postSlug, data: data, content: content }, ...]

  return (
    <>
      <section className={`${classes.recent} section `}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Recent Post</span>
          </h2>
          <ul className={classes["recent-list"]}>
            {postsData.map((post) => {
              return (
                <>
                  <li key={post!.slug}>
                    <Card
                      slug={post!.slug}
                      postImg={`/images/posts/${post?.slug}/${post?.data?.image}`}
                      tags={post?.data?.tags}
                      readingTime={3}
                      title={post?.data?.title}
                      userImg={logoImg}
                      name={"kimye0808"}
                      date={post?.data?.date}
                    />
                  </li>
                </>
              );
            })}
          </ul>
          <Link href="/posts" className={`${classes.btn} btn btn-secondary`}>
            <span className={`${classes} span}`}>Show More Posts</span>
          </Link>
        </div>
      </section>
    </>
  );
}
