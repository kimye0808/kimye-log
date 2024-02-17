import TagEmpty from "../tags/tag-empty";
import classes from "./card-empty.module.css";

export default function CardEmpty() {
  return (
    <>
      <div className={`${classes["loading-wrapper"]}`}>
        <figure className={`${classes.loading} ${classes.image}`}>
          &nbsp;
        </figure>

        <div>
          <div
            className={`${classes["card-wrapper"]} ${classes.end} card-wrapper`}
          >
            <div className={classes["card-tag"]}>
              <TagEmpty />
              <TagEmpty />
            </div>
            <TagEmpty />
          </div>
        </div>

        <p className={`${classes.loading}`}>&nbsp;</p>

        <div>
          <div className={"profile-card"}>
            <figure className={`${classes.loading} ${classes.logo}`}>
              &nbsp;
            </figure>
            <div>
              <p className={`${classes["loading"]} ${classes.width100b}`}>
                &nbsp;
              </p>
              <p className={`${classes["loading"]} ${classes.width100b}`}>
                &nbsp;
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
