import classes from "./search-tags.module.css";
import Tag from "../tags/tag";
import TagsFlex from "../tags/tags-flex";
import TagsWrapper from "../tags/tags-wrapper";
import { getAllTags } from "@/utils/post-utils";

export default async function SearchAndTags() {
  const allTags = await getAllTags();

  return (
    <>
      <TagsWrapper>
        <div className={classes["tags-wrapper"]}>
          <TagsFlex>
            {allTags?.map((item) => (
              <li key={item.id}>
                <Tag tagName={item.tag}></Tag>
              </li>
            ))}
          </TagsFlex>
        </div>
      </TagsWrapper>
    </>
  );
}
