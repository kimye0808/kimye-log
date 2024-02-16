import styles from "./page.module.css";
import Hero from "@/components/hero/hero";
import RecentPost from "@/components/recent-post/recent-post";
import Tags from "@/components/tags/tags";

export default function Home() {
  return (
    <>
      <main>
        <article>
          <Hero />
          <RecentPost />
          <Tags />
        </article>
      </main>
    </>
  );
}
