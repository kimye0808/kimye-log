import classes from "./card.module.css";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";

import { IoMdTime } from "react-icons/io";

interface PropsType {
  slug: string;
  postImg: string;
  tags: string[] | null;
  readingTime: number;
  title: string;
  userImg: StaticImageData | string;
  name: string;
  date: string;
}

export default function Card({
  slug,
  postImg,
  tags,
  readingTime,
  title,
  userImg,
  name,
  date,
}: PropsType) {
  return (
    <>
      <div className={`${classes["recent-card"]} card`}>
        <figure className={`${classes["card-banner"]} card`}>
          {postImg && (
            <Image
              src={postImg}
              alt="smile image"
              width={120}
              height={100}
              className={`${classes} img-cover`}
            />
          )}
        </figure>

        <div>
          <div className={`${classes["card-wrapper"]} card-wrapper`}>
            <div className={classes["card-tag"]}>
              {tags?.map((tag) => {
                return (
                  <Link
                    key={tag}
                    href={`/posts?tag=${tag}`}
                    className={`${classes.tag} `}
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
            <div className={`${classes} wrapper`}>
              <IoMdTime />
            </div>
            <span className={`${classes} span`}>{readingTime} mins read</span>
          </div>
        </div>

        <h3 className={`${classes} headline headline-4`}>
          <Link
            href={`/posts/${slug}`}
            className={`${classes["card-title"]} hover-2`}
          >
            {title}
          </Link>
        </h3>

        <div className={`${classes["card-wrapper"]} card wrapper`}>
          <div className={`${classes["profile-card"]} profile-card`}>
            {userImg && (
              <Image
                src={userImg}
                alt="writer image"
                width={20}
                height={20}
                className={`${classes} profile-banner`}
              />
            )}
            <div>
              <p className={`${classes["card-title"]}`}>{name}</p>
              <p className={`${classes["card-subtitle"]}`}>{date}</p>
            </div>
            <Link href={`/posts/${slug}`} className={classes["card-btn"]}>
              Read more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
