import classes from "./tags.module.css";
import Tag from "./tag";
import { TagData } from "@/utils/format-file";

/**
 * home page에 보이는 태그들
 */
export default async function Tags() {
  let allTags: TagData[];
  try {
    const response = await fetch(process.env.URL + "/api/tags", {
      next: { tags: ["tags"] },
    });
    if (!response.ok) {
    }
    const result = await response.json();
    allTags = result.tags;
  } catch (error) {
    throw new Error("get recent-posts fail");
  }
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
                <Tag keyVal={item.tag} tagName={item.tag} count={item.count} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
