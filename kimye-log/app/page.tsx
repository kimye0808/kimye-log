import styles from "./page.module.css";
import Hero from "@/components/hero/hero";
import RecentPost from "@/components/recent-post/recent-post";
import Tags from "@/components/tags/tags";
import { Suspense } from "react";
import RecentPostLoading from "@/components/loading/recent-post-loading";
import TagsGridLoading from "@/components/loading/tags-grid-loading";
import classes from "./page.module.css";

export default function Home() {
  return (
    <>
      <main>
        <article>
          <Hero />
          <div className={classes.contents}>
            <Suspense fallback={<RecentPostLoading />}>
              <RecentPost />
            </Suspense>
            <Suspense fallback={<TagsGridLoading />}>
              <Tags />
            </Suspense>
          </div>
        </article>
      </main>
    </>
  );
}
