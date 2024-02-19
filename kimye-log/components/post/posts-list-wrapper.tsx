import StoreProvider from "@/app/StoreProvider";
import classes from "./posts-list.module.css";

/**
 * loading을 위한 postlist wrapper
 */
export default async function PostsListWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className={`${classes.section} section`}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Posts</span>
          </h2>
          {children}
        </div>
      </section>
    </>
  );
}
