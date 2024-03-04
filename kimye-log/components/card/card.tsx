import classes from "./card.module.css";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface PropsType {
  postImg: string;
  tags: string[] | null;
  title: string;
  date: string;
}

export default function Card({ postImg, tags, title, date }: PropsType) {
  return (
    <>
      <div className={`${classes["recent-card"]} card`}>
        <figure className={`${classes["card-banner"]}`}>
          {postImg && (
            <Image
              src={postImg}
              alt="smile image"
              width={300}
              height={100}
              className={`${classes} img-cover`}
              priority
            />
          )}
        </figure>

        <div className={classes["card-content"]}>
          <h3 className={`${classes["card-title"]} headline headline-4`}>
            {title}
          </h3>

          <div className={`${classes["card-wrapper"]} card wrapper`}>
            <div className={`${classes["profile-card"]} profile-card`}>
              <div>
                <p className={`${classes["card-subtitle"]}`}>{date}</p>
              </div>
            </div>
          </div>

          <div>
            <div className={`${classes["card-wrapper"]} card-wrapper`}>
              <div className={classes["card-tag"]}>
                {tags?.map((tag) => (
                  <span key={tag}>{`#${tag}`}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
