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
            <li>
              <Tag tagName={"전체보기"} />
            </li>
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
