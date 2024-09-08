import TagsFlex from "@/components/tags/tags-flex";
import TagWhite from "@/components/tags/tag-white";
import classes from "@/components/post/post-detail/post-header.module.css";

export default function PostHeaderLoading() {
  return (
    <>
      <header className={classes.section}>
        <div className={classes.container}>
          <h1
            className={`${classes.headline} ${classes.loading} headline headline-1 section-title`}
          >
            &nbsp;
          </h1>
          <p className={classes.name}>kimye0808</p>
          <p
            className={`${classes.date} ${classes.loading} ${classes.width100}`}
          >
            &nbsp;
          </p>
          <div
            className={`${classes["tags-wrapper"]} ${classes.loading} ${classes.width100b}`}
          >
            &nbsp;
          </div>
        </div>
      </header>
    </>
  );
}
