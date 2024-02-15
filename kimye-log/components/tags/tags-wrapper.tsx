import classes from "./tags.module.css";

interface PropsType {
  children: React.ReactNode;
}

export default function TagsWrapper({ children }: PropsType) {
  return (
    <>
      <section className={classes.tags}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Tags</span>
          </h2>
          {children}
        </div>
      </section>
    </>
  );
}
