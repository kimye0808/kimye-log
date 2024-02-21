import StoreProvider from "@/app/StoreProvider";
import classes from "./posts-list.module.css";
import PostsListContent from "./posts-list-content";
import { getAllPosts } from "@/utils/post-utils";
import { PostData } from "@/utils/post-utils";

export default async function PostsList() {
  let initialList: PostData[];
  try {
    initialList = await getAllPosts(); //  [ { slug: postSlug, data: data, content: content }, ...]
  } catch (error) {
    throw new Error("get posts-list fail");
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
