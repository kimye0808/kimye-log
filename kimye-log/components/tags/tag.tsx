import classes from "./tags.module.css";
import Image from "next/image";
import NavLink from "../common/nav-link";

interface PropsType {
  keyVal: string;
  tagName: string;
  count: number;
}
export default function Tag({ keyVal, tagName, count }: PropsType) {
  const isAll = keyVal === "all" ? true : false;

  return (
    <>
      <NavLink href={isAll ? "/posts" : `/posts?tag=${tagName}`}>
        <button className={`${classes["tag-btn"]}`}>
          {isAll ? <p className={`${classes["tag-content"]}`}>{`${tagName}`}</p> : <p className={`${classes["tag-content"]}`}>{`${tagName}(${count})`}</p>}
        </button>
      </NavLink>
    </>
  );
}
