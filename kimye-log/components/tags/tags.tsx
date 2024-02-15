import classes from "./tags.module.css";
import fur from "@/assets/fur.svg";
import Image from "next/image";

export default function Tags() {
  return (
    <>
      <section className={classes.tags}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Popular Tags</span>
          </h2>
          <ul className={`${classes["grid-list"]} gird-list`}>
            <li>
              <button className={`${classes["tag-btn"]} card`}>
                <Image src={fur} alt="fur" />
                <p>sports </p>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
