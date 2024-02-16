import classes from "./tags.module.css";
import Image from "next/image";

interface PropsType {
  tagName: string;
}
export default function TagWhite({ tagName }: PropsType) {
  return (
    <>
      <button className={`${classes["tag-btn2"]}`}>
        <p>{tagName}</p>
      </button>
    </>
  );
}
