import Image from "next/image";
import classes from "./logo.module.css";

import heroImg from "@/assets/hero.png";

import { DiReact } from "@react-icons/all-files/di/DiReact";
import htmlImg from "@/assets/html.svg";
import cssImg from "@/assets/css.svg";
import jsImg from "@/assets/js.svg";

export default function Logo() {
  return (
    <>
      <Image
        src={heroImg}
        alt="logo"
        width="400"
        height="400"
        className={classes["logo"]}
        priority
      />

      <DiReact
        size="30"
        color="blue"
        className={`${classes.shape} ${classes["shape-4"]}`}
      />
      <Image
        src={htmlImg}
        alt="html image"
        width="30"
        height="30"
        className={`${classes.shape} ${classes["shape-1"]}`}
      />
      <Image
        src={cssImg}
        alt="html image"
        width="30"
        height="30"
        className={`${classes.shape} ${classes["shape-2"]}`}
      />
      <Image
        src={jsImg}
        alt="html image"
        width="30"
        height="30"
        className={`${classes.shape} ${classes["shape-3"]}`}
      />
    </>
  );
}
