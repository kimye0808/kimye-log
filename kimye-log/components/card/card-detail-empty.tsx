import TagEmpty from "../tags/tag-empty";
import classes from "./card-detail-empty.module.css";
export default function CardDetailEmpty() {
  return (
    <>
      <div className={classes["loading-wrapper"]}>
        <summary>
          <h3 className={`${classes.loading2}`}>&nbsp;</h3>
          <p className={`${classes.loading}`}>&nbsp;</p>
          <p className={`${classes.loading2}`}>&nbsp;</p>
        </summary>

        <div className={`${classes["card-wrapper"]}  wrapper`}>
          <div className={`${classes["profile-card"]} profile-card`}>
            <div
              className={`${classes["loading-profile"]} ${classes.loading} profile-banner`}
            />
            <div>
              <p
                className={`${classes["card-title"]} ${classes.p} ${classes.loading}`}
              ></p>
              <p
                className={`${classes["card-subtitle"]} ${classes.p} ${classes.loading}`}
              ></p>
            </div>
          </div>
        </div>

        <div>
          <div className={`${classes["card-wrapper"]} card-wrapper`}>
            <div className={classes["card-tag"]}>
              <TagEmpty />
              <TagEmpty />
            </div>

            <span
              className={`${classes.loading} ${classes["reading-time"]} span`}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
}
