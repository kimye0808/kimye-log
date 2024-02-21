import classes from "./search-tags.module.css";
import Tag from "../tags/tag";
import TagsFlex from "../tags/tags-flex";
import TagsWrapper from "../tags/tags-wrapper";
import { getAllTags } from "@/utils/post-utils";

interface TagType {
  id: string;
  tag: string;
}
/**
 * posts 페이지에 보여주는 검색바 + 태그 부분
 */
export default async function SearchAndTags() {
  let allTags: TagType[];
  try {
    allTags = await getAllTags();
  } catch (error) {
    throw new Error("get all-tags fail");
  }

  return (
    <>
      <TagsWrapper>
        <div className={classes["tags-wrapper"]}>
          <TagsFlex>
            <li>
              <Tag keyVal={"all"} tagName={"all"} />
            </li>
            {allTags?.map((item) => (
              <li key={item.id}>
                <Tag keyVal={item.id} tagName={item.tag}></Tag>
              </li>
            ))}
          </TagsFlex>
        </div>
      </TagsWrapper>
    </>
  );
}
