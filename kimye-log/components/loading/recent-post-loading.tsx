import classes from "@/components/recent-post/recent-post.module.css";
import Link from "next/link";
import CardEmpty from "../card/card-empty";

export default function RecentPostLoading() {
  const cardLoading = (
    <>
      <li>
        <CardEmpty />
      </li>
      <li>
        <CardEmpty />
      </li>{" "}
      <li>
        <CardEmpty />
      </li>{" "}
    </>
  );
  return (
    <>
      <section className={`${classes.recent} section `}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Recent Post</span>
          </h2>
          <ul className={classes["recent-list"]}>{cardLoading}</ul>
          <Link href="/posts" className={`${classes.btn} btn btn-secondary`}>
            <span className={`${classes} span}`}>Show More Posts</span>
          </Link>
        </div>
      </section>
    </>
  );
}
