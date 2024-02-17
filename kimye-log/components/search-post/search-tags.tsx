import classes from "./search-tags.module.css";
import Tag from "../tags/tag";
import TagsFlex from "../tags/tags-flex";
import TagsWrapper from "../tags/tags-wrapper";

export default function SearchAndTags() {
  return (
    <>
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
    </>
  );
}
