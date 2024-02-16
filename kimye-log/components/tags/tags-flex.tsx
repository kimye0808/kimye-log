import classes from "./tags.module.css";

interface PropsType {
  children: React.ReactNode;
}

export default function TagsFlex({ children }: PropsType) {
  return (
    <>
      <ul className={classes["tags-flex"]}>{children}</ul>
    </>
  );
}
