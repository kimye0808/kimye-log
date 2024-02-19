import classes from "./tags.module.css";
import Image from "next/image";
import NavLink from "../common/nav-link";

interface PropsType {
  tagName: string;
}
export default function Tag({ tagName }: PropsType) {
  const isAll = tagName === "전체보기" ? true : false;

  return (
    <>
      <NavLink href={isAll ? "/posts" : `/posts?tag=${tagName}`}>
        <button className={`${classes["tag-btn"]}`}>
          <p>{tagName}</p>
        </button>
      </NavLink>
    </>
  );
}
