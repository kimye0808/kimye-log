import CardDetail from "../card/card-detail";
import classes from "./posts-list.module.css";
import smile from "@/assets/card/smile.jpg";
import teamwork from "@/assets/card/teamwork.jpg";
import soccer from "@/assets/card/soccer.jpg";
import logoImg from "@/assets/logo.png";

export default function PostsList() {
  return (
    <>
      <section className={`${classes.section} section`}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Posts</span>
          </h2>
          <ul className={classes["posts-list"]}>
            <li>
              <CardDetail
                summary={
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At eaque similique quae voluptates impedit. Fuga numquam unde cumque quod ullam amet asperiores, quidem temporibus eos adipisci beatae perferendis, eveniet molestias?"
                }
                tags={["#sports", "#smile"]}
                readingTime={3}
                title={"smile is good"}
                userImg={logoImg}
                name={"kimye0808"}
                date={"24 Feb 2024"}
              />
            </li>{" "}
            <li>
              <CardDetail
                summary={
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At eaque similique quae voluptates impedit. Fuga numquam unde cumque quod ullam amet asperiores, quidem temporibus eos adipisci beatae perferendis, eveniet molestias?"
                }
                tags={["#sports", "#smile"]}
                readingTime={3}
                title={"smile is good"}
                userImg={logoImg}
                name={"kimye0808"}
                date={"24 Feb 2024"}
              />
            </li>{" "}
            <li>
              <CardDetail
                summary={
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At eaque similique quae voluptates impedit. Fuga numquam unde cumque quod ullam amet asperiores, quidem temporibus eos adipisci beatae perferendis, eveniet molestias?"
                }
                tags={["#sports", "#smile"]}
                readingTime={3}
                title={"smile is good"}
                userImg={logoImg}
                name={"kimye0808"}
                date={"24 Feb 2024"}
              />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
