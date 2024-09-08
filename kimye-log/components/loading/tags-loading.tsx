import classes from "./tags-loading.module.css";
import TagsFlex from "../tags/tags-flex";
import TagsWrapper from "../tags/tags-wrapper";
import TagEmpty from "../tags/tag-empty";

export default function TagsLoading() {
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
          <TagsFlex>{tagsLoading}</TagsFlex>
        </div>
      </TagsWrapper>
    </>
  );
}
