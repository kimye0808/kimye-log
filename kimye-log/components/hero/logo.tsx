import Image from "next/image";
import classes from "./logo.module.css";

import heroImg from "@/assets/hero.svg";
import { DiCss3 } from "react-icons/di";
import { DiHtml5 } from "react-icons/di";
import { DiJsBadge } from "react-icons/di";
import { DiReact } from "react-icons/di";

export default function Logo() {
  return (
    <>
      <Image
        src={heroImg}
        alt="logo"
        width="400"
        height="400"
        className={classes["logo"]}
      />
      <DiCss3 size="32" className={`${classes.shape} ${classes["shape-1"]}`} />
      <DiHtml5 size="35" className={`${classes.shape} ${classes["shape-2"]}`} />
      <DiJsBadge
        size="24"
        className={`${classes.shape} ${classes["shape-3"]}`}
      />
      <DiReact size="30" className={`${classes.shape} ${classes["shape-4"]}`} />
    </>
  );
}
