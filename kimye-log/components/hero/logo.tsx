import Image from "next/image";
import classes from "./logo.module.css";

import heroImg from "@/assets/hero.webp";
import { DiReact } from "@react-icons/all-files/di/DiReact";
import htmlImg from "@/assets/html.svg";
import cssImg from "@/assets/css.svg";
import jsImg from "@/assets/js.svg";

export default function Logo() {
  return (
    <div className={classes.container}>
      <Image
        src={heroImg}
        alt="logo"
        width={400}
        height={400}
        className={classes.logo}
        priority
      />
      <DiReact
        size={30}
        color="blue"
        className={`${classes.shape} ${classes.shape4}`}
      />
      <Image
        src={htmlImg}
        alt="html image"
        width={30}
        height={30}
        className={`${classes.shape} ${classes.shape1}`}
      />
      <Image
        src={cssImg}
        alt="css image"
        width={30}
        height={30}
        className={`${classes.shape} ${classes.shape2}`}
      />
      <Image
        src={jsImg}
        alt="js image"
        width={30}
        height={30}
        className={`${classes.shape} ${classes.shape3}`}
      />
    </div>
  );
}
