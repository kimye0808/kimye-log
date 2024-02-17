import classes from "./search-tags.module.css";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <>
      <div className={classes["search-bar"]}>
        <input type="text" placeholder="포스트를 검색하세요" />
        <FiSearch size={20} color="grey" className={classes.icon} />
      </div>
    </>
  );
}
