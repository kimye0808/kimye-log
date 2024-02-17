import classes from "./tags-loading.module.css";
import TagsGrid from "../tags/tags-grid";
import TagsWrapper from "../tags/tags-wrapper";
import TagEmpty from "../tags/tag-empty";

export default function TagsGridLoading() {
  const tagsLoading = (
    <>
      <li>
        <TagEmpty />
      </li>
      <li>
        <TagEmpty />
      </li>
      <li>
        <TagEmpty />
      </li>
      <li>
        <TagEmpty />
      </li>
      <li>
        <TagEmpty />
      </li>
    </>
  );
  return (
    <>
      <TagsWrapper>
        <div className={classes["taggs-wrapper"]}>
          <TagsGrid>{tagsLoading}</TagsGrid>
        </div>
      </TagsWrapper>
    </>
  );
}
