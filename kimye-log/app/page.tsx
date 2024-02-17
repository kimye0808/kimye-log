import styles from "./page.module.css";
import Hero from "@/components/hero/hero";
import RecentPost from "@/components/recent-post/recent-post";
import Tags from "@/components/tags/tags";
import { Suspense } from "react";
import RecentPostLoading from "@/components/loading/recent-post-loading";
import TagsGridLoading from "@/components/loading/tags-grid-loading";

export default function Home() {
  return (
    <>
      <main>
        <article>
          <Hero />
          <Suspense fallback={<RecentPostLoading />}>
            <RecentPost />
          </Suspense>
          <Suspense fallback={<TagsGridLoading />}>
            <Tags />
          </Suspense>
        </article>
      </main>
    </>
  );
}
