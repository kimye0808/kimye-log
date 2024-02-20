import classes from "./tags.module.css";
import Tag from "./tag";
import { getAllTags } from "@/utils/post-utils";

/**
 * home page에 보이는 태그들
 */
export default async function Tags() {
  const allTags = await getAllTags();
  return (
    <>
      <section className={classes.tags}>
        <div className={`${classes} container`}>
          <h2
            className={`${classes.headline} headline headline-2 section-title`}
          >
            <span className={`${classes} span`}>Tags</span>
          </h2>
          <ul className={`${classes["grid-list"]} grid-list`}>
            {allTags?.map((item) => (
              <li key={item.id}>
                <Tag tagName={item.tag} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
