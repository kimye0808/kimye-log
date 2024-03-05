import StoreProvider from "@/app/StoreProvider";
import classes from "./posts-list.module.css";
import PostsListContent from "./posts-list-content";
import { PostData } from "@/utils/format-file";
import { RawPostData, formatPostData } from "@/utils/format-file";

export default async function PostsList() {
  let initialList: PostData[];
  try {
    const response = await fetch(
      process.env.URL + "/api/posts?page=1&limit=10"
    );
    if (!response.ok) {
    }
    const result = await response.json();
    initialList = await Promise.all(
      result?.posts.map((post: RawPostData) => formatPostData(post))
    );
  } catch (error) {
    throw new Error("get recent-posts fail");
  }
  return (
    <>
      <section className={`${classes.section} section`}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Posts</span>
          </h2>
          <StoreProvider>
            <PostsListContent initialList={initialList} />
          </StoreProvider>
        </div>
      </section>
    </>
  );
}
