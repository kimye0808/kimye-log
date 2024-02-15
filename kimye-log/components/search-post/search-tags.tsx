import classes from "./search-tags.module.css";
import { FiSearch } from "react-icons/fi";
import Tag from "../tags/tag";
import TagsFlex from "../tags/tags-flex";
import TagsWrapper from "../tags/tags-wrapper";

export default function SearchAndTags() {
  return (
    <>
      <section className={classes.section}>
        <div className={classes.container}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Search</span>
          </h2>
          <div className={classes["search-bar"]}>
            <input type="text" placeholder="포스트를 검색하세요" />
            <FiSearch size={20} color="grey" className={classes.icon} />
          </div>
        </div>
        <TagsWrapper>
          <div className={classes["tags-wrapper"]}>
            <TagsFlex>
              <li>
                <Tag tagName={"react"} />
              </li>
              <li>
                <Tag tagName={"javascript"} />
              </li>
              <li>
                <Tag tagName={"javascript"} />
              </li>
              <li>
                <Tag tagName={"nextjs"} />
              </li>
              <li>
                <Tag tagName={"css"} />
              </li>
            </TagsFlex>
          </div>
        </TagsWrapper>
      </section>
    </>
  );
}
