import classes from "./card.module.css";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { IoMdTime } from "react-icons/io";

interface PropsType {
  summary: string;
  tags: string[] | null;
  readingTime: number;
  title: string;
  userImg: StaticImageData | null | string;
  name: string;
  date: string;
}

/**
 * img가 없고 summary가 있는 card
 */
export default function CardDetail({
  summary,
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
        <summary>
          <h3 className={`${classes} headline headline-4`}>
            <p className={`${classes["card-title"]} hover-2`}>{title}</p>
          </h3>
          <p>{summary}</p>
        </summary>

        <div className={`${classes["card-wrapper"]} `}>
          <div className={`${classes["profile-card"]} profile-card`}>
            {userImg && (
              <Image
                src={userImg}
                alt="writer image"
                width={20}
                height={20}
                className={classes[`${classes} profile-banner`]}
              />
            )}
            <div>
              <p className={`${classes["card-title"]}`}>{name}</p>
              <p className={`${classes["card-subtitle"]}`}>{date}</p>
            </div>
          </div>
        </div>

        <div>
          <div className={`${classes["card-wrapper"]} card-wrapper`}>
            <div className={classes["card-tag"]}>
              {tags?.map((tag) => {
                return (
                  <p key={tag} className={`${classes} span hover-2`}>
                    {tag}&nbsp;
                  </p>
                );
              })}
            </div>
            <div className={`${classes} wrapper`}>
              <IoMdTime />
            </div>
            <span className={`${classes} span`}>{readingTime} mins read</span>
          </div>
        </div>
      </div>
    </>
  );
}
