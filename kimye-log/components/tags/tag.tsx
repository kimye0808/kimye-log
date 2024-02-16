import classes from "./tags.module.css";
import Image from "next/image";

interface PropsType {
  tagName: string;
}
export default function Tag({ tagName }: PropsType) {
  return (
    <>
      <button className={`${classes["tag-btn"]} card`}>
        <p>{tagName}</p>
      </button>
    </>
  );
}
