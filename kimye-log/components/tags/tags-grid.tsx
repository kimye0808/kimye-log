import classes from "./tags.module.css";

interface PropsType {
  children: React.ReactNode;
}

export default function TagsGrid({ children }: PropsType) {
  return (
    <>
      <ul className={`${classes["grid-list"]} grid-list`}>{children}</ul>
    </>
  );
}
