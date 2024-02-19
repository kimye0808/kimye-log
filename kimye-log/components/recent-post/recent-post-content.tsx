import classes from "./recent-post.module.css";
import Card from "../card/card";
import logoImg from "@/assets/logo.png";
import { PostData } from "@/utils/post-utils";

interface Propstype {
  postsData: PostData[];
}

export default function RecentPostContent({ postsData }: Propstype) {
  return (
    <>
      <ul className={classes["recent-list"]}>
        {postsData.map((post) => {
          return (
            post && (
              <li key={post.slug}>
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
            )
          );
        })}
      </ul>
    </>
  );
}
