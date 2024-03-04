import classes from "./recent-post.module.css";
import Card from "../card/card";
import logoImg from "@/assets/logo.png";
import Link from "next/link";
import { PostData } from "@/utils/format-file";

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
              <li key={post._id}>
                <Link href={`/posts/${post.title}`}>
                  <Card
                    postImg={post.thumbnail}
                    tags={post?.tags}
                    title={post?.title}
                    date={post?.date}
                  />
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </>
  );
}
