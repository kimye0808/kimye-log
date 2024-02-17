import classes from "./posts-list-loading.module.css";
import CardDetailEmpty from "../card/card-detail-empty";

export default function PostsListLoading() {
  const postsListLoading = (
    <>
      <li>
        <CardDetailEmpty />
      </li>
      <li>
        <CardDetailEmpty />
      </li>
      <li>
        <CardDetailEmpty />
      </li>
    </>
  );
  return (
    <>
      <ul className={classes["posts-list"]}>{postsListLoading}</ul>
    </>
  );
}
