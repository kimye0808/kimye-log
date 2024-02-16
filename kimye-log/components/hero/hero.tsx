import classes from "./hero.module.css";
import Logo from "./logo";

export default function Hero() {
  return (
    <>
      <section className={classes.hero}>
        <div className={classes.container}>
          <div className={classes["hero-content"]}>
            <p className={classes["hero-subtitle"]}>Hello Everyone!</p>
            <h1 className={`${classes["section-title"]} headline headline-1`}>
              I&apos;m <span className={`${classes} span`}>Kimye0808</span>
            </h1>
            <p className={classes["hero-text"]}>
              I am a student delving into the realm of web development.
              It&apos;s a pleasure to meet you. Looking forward to working
              together.
            </p>
          </div>
          <div className={classes["hero-banner"]}>
            <Logo />
          </div>
        </div>
      </section>
    </>
  );
}
