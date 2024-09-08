import TagEmpty from "../tags/tag-empty";
import classes from "./card-empty.module.css";

export default function CardEmpty() {
  return (
    <>
      <div className={`${classes["loading-wrapper"]}`}>
        <figure className={`${classes.loading} ${classes.image}`}>
          &nbsp;
        </figure>

        <div className={classes["card-content"]}>
          <p className={`${classes.loading} ${classes.width100}`}>&nbsp;</p>

          <div>
            <div className={"profile-card"}>
              <div>
                <p className={`${classes["loading"]} ${classes.width100b}`}>
                  &nbsp;
                </p>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`${classes["card-wrapper"]} ${classes.end} card-wrapper`}
            >
              <div className={classes["card-tag"]}>
                <TagEmpty />
                <TagEmpty />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
