import classes from "./recent-post.module.css";
import Card from "../card/card";
import smile from "@/assets/card/smile.jpg";
import teamwork from "@/assets/card/teamwork.jpg";
import soccer from "@/assets/card/soccer.jpg";
import logoImg from "@/assets/logo.png";
import Link from "next/link";

export default function RecentPost() {
  return (
    <>
      <section className={`${classes.recent} section `}>
        <div className={`${classes} container`}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Recent Post</span>
          </h2>
          <ul className={classes["recent-list"]}>
            <li>
              <Card
                postImg={smile}
                tags={["#sports", "#smile"]}
                readingTime={3}
                title={"smile is good"}
                userImg={logoImg}
                name={"kimye0808"}
                date={"24 Feb 2024"}
              />
            </li>
            <li>
              <Card
                postImg={teamwork}
                tags={["#sports", "#smile"]}
                readingTime={3}
                title={"smile is good"}
                userImg={logoImg}
                name={"kimye0808"}
                date={"24 Feb 2024"}
              />
            </li>
            <li>
              <Card
                postImg={soccer}
                tags={["#sports", "#smile"]}
                readingTime={3}
                title={"smile is good"}
                userImg={logoImg}
                name={"kimye0808"}
                date={"24 Feb 2024"}
              />
            </li>
          </ul>
          <Link href="/" className={`${classes.btn} btn btn-secondary`}>
            <span className={`${classes} span}`}>Show More Posts</span>
          </Link>
        </div>
      </section>
    </>
  );
}
