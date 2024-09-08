import classes from "./search-tags.module.css";
import Tag from "../tags/tag";
import TagsFlex from "../tags/tags-flex";
import TagsWrapper from "../tags/tags-wrapper";
import { TagData } from "@/utils/format-file";

interface TagType {
  id: string;
  tag: string;
}
/**
 * posts 페이지에 보여주는 검색바 + 태그 부분
 */
export default async function SearchAndTags() {
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
      <TagsWrapper>
        <div className={classes["tags-wrapper"]}>
          <TagsFlex>
            <li>
              <Tag keyVal={"all"} tagName={"all"} count={0} />
            </li>
            {allTags?.map((item) => (
              <li key={item.id}>
                <Tag keyVal={item.id} tagName={item.tag} count={item.count} />
              </li>
            ))}
          </TagsFlex>
        </div>
      </TagsWrapper>
    </>
  );
}
