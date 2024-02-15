import classes from "./tags.module.css";
import Tag from "./tag";

export default function Tags() {
  return (
    <>
      <section className={classes.tags}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Tags</span>
          </h2>
          <ul className={`${classes["grid-list"]} grid-list`}>
            <li>
              <Tag tagName={"fur"} />
            </li>
            <li>
              <Tag tagName={"fur"} />
            </li>
            <li>
              <Tag tagName={"fur"} />
            </li>
            <li>
              <Tag tagName={"fur"} />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
