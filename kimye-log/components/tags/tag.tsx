import classes from "./tags.module.css";
import Image from "next/image";
import NavLink from "../common/nav-link";

interface PropsType {
  keyVal: string;
  tagName: string;
}
export default function Tag({ keyVal, tagName }: PropsType) {
  const isAll = keyVal === "all" ? true : false;

  return (
    <>
      <NavLink href={isAll ? "/posts" : `/posts?tag=${tagName}`}>
        <button className={`${classes["tag-btn"]}`}>
          {isAll ? <p>{`${tagName}`}</p> : <p>{`#${tagName}`}</p>}
        </button>
      </NavLink>
    </>
  );
}
