import Link from "next/link";

import CardDetail from "../card/card-detail";
import classes from "./posts-list.module.css";
import logoImg from "@/assets/logo.png";
import { getAllPosts } from "@/utils/post-utils";

export default async function PostsList() {
  const postsList = await getAllPosts(); //{ [slug: postSlug, data: data, content: content] };
  return (
    <>
      <ul className={classes["posts-list"]}>
        {postsList?.map((post) => {
          return (
            post && (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <li>
                  <CardDetail
                    summary={post.data.summary}
                    tags={post.data.tags}
                    readingTime={3}
                    title={post.data.title}
                    userImg={logoImg}
                    name={"kimye0808"}
                    date={post.data.date}
                  />
                </li>
              </Link>
            )
          );
        })}
      </ul>
    </>
  );
}
