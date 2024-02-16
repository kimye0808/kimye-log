import Link from "next/link";

import CardDetail from "../card/card-detail";
import classes from "./posts-list.module.css";
import smile from "@/assets/card/smile.jpg";
import teamwork from "@/assets/card/teamwork.jpg";
import soccer from "@/assets/card/soccer.jpg";
import logoImg from "@/assets/logo.png";

const DUMMY_DATA = {
  title: "smile is good",
  tags: ["react", "nextjs"],
  date: "2024-02-24",
  summary:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At eaque similique quae voluptates impedit. Fuga numquam unde cumque quod ullam amet asperiores, quidem temporibus eos adipisci beatae perferendis, eveniet molestias?",
  image: "test1.png",
  readingTime: 3,
};
export default function PostsList() {
  return (
    <>
      <section className={`${classes.section} section`}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Posts</span>
          </h2>
          <ul className={classes["posts-list"]}>
            <Link href={`/posts/${DUMMY_DATA.title}`}>
              <li>
                <CardDetail
                  summary={DUMMY_DATA.summary}
                  tags={DUMMY_DATA.tags}
                  readingTime={DUMMY_DATA.readingTime}
                  title={DUMMY_DATA.title}
                  userImg={logoImg}
                  name={"kimye0808"}
                  date={DUMMY_DATA.date}
                />
              </li>{" "}
            </Link>
            <Link href={`/posts/${DUMMY_DATA.title}`}>
              <li>
                <CardDetail
                  summary={DUMMY_DATA.summary}
                  tags={DUMMY_DATA.tags}
                  readingTime={DUMMY_DATA.readingTime}
                  title={DUMMY_DATA.title}
                  userImg={logoImg}
                  name={"kimye0808"}
                  date={DUMMY_DATA.date}
                />
              </li>{" "}
            </Link>
          </ul>
        </div>
      </section>
    </>
  );
}
