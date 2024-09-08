import classes from "@/components/post/post-detail/post-content.module.css";

export default function PostContentLoading() {
  return (
    <>
      <section className={`${classes.section}  section`}>
        <div className={`${classes.container} container`}>
          <figure
            className={`${classes.loading} ${classes.end} ${classes["img-loading"]}`}
          >
            &nbsp;
          </figure>
          <code>
            <p
              className={`${classes.loading} ${classes.width100} ${classes.end}`}
            >
              &nbsp;
            </p>
            <p
              className={`${classes.loading} ${classes.width85} ${classes.end}`}
            >
              &nbsp;
            </p>
            <p
              className={`${classes.loading} ${classes.width70} ${classes.end}`}
            >
              &nbsp;
            </p>
          </code>
        </div>
      </section>
    </>
  );
}
