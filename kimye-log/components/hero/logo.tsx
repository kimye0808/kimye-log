import Image from "next/image";
import classes from "./logo.module.css";

import heroImg from "@/assets/hero.png";
import flowers from "@/assets/flowers.png";
import bee from "@/assets/bee.gif";
import { DiCss3 } from "react-icons/di";
import { DiHtml5 } from "react-icons/di";
import { DiJsBadge } from "react-icons/di";
import { DiReact } from "react-icons/di";
import htmlImg from "@/assets/html.svg";
import cssImg from "@/assets/css.svg";
import jsImg from "@/assets/js.svg";

export default function Logo() {
  return (
    <>
      {/* <Image
        src={flowers}
        alt="logo"
        width="400"
        height="400"
        className={classes["logo"]}
      />
      <Image
        src={bee}
        alt="logo"
        width="200"
        height="200"
        className={`${classes.shape} ${classes.bee}`}
      /> */}
      <Image
        src={heroImg}
        alt="logo"
        width="400"
        height="400"
        className={classes["logo"]}
      />
      {/* <DiCss3 size="32" className={`${classes.shape} ${classes["shape-1"]}`} />
      <DiHtml5 size="35" className={`${classes.shape} ${classes["shape-2"]}`} />
      <DiJsBadge
        size="24"
        className={`${classes.shape} ${classes["shape-3"]}`}
      />*/}
      <DiReact
        size="30"
        color="blue"
        className={`${classes.shape} ${classes["shape-4"]}`}
      />
      <Image
        src={htmlImg}
        alt="html image"
        width={25}
        height={25}
        className={`${classes.shape} ${classes["shape-1"]}`}
      />
      <Image
        src={cssImg}
        alt="html image"
        width={25}
        height={25}
        className={`${classes.shape} ${classes["shape-2"]}`}
      />
      <Image
        src={jsImg}
        alt="html image"
        width={25}
        height={25}
        className={`${classes.shape} ${classes["shape-3"]}`}
      />
    </>
  );
}
