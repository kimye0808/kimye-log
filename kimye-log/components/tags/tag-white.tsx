import classes from "./tags.module.css";
import Link from "next/link";

interface PropsType {
  tagName: string;
}
export default function TagWhite({ tagName }: PropsType) {
  return (
    <>
      <Link href={`/posts?tag=${tagName}`}>
        <button className={`${classes["tag-btn2"]}`}>
          <p>{tagName}</p>
        </button>
      </Link>
    </>
  );
}
