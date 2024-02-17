import TagsFlex from "@/components/tags/tags-flex";
import TagWhite from "@/components/tags/tag-white";
import classes from "./post-header.module.css";

interface PostHeaderProps {
  title: string;
  tags: string[];
  date: string;
}

export default function PostHeader({ title, tags, date }: PostHeaderProps) {
  return (
    <>
      <header className={classes.section}>
        <div className={classes.container}>
          <h1
            className={`${classes.headline} headline headline-1 section-title`}
          >
            {title}
          </h1>
          <p className={classes.name}>kimye0808</p>
          <p className={classes.date}>{date}</p>
          <div className={classes["tags-wrapper"]}>
            <TagsFlex>
              {tags?.map((tag) => {
                return (
                  <li key={tag}>
                    <TagWhite tagName={tag} />
                  </li>
                );
              })}
            </TagsFlex>
          </div>
        </div>
      </header>
    </>
  );
}
