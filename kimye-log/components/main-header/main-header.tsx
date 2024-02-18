import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import NavBar from "./nav-bar";
import MenuButton from "./menu-button";
import StoreProvider from "@/app/StoreProvider";

export default function MainHeader() {
  return (
    <>
      <header className={classes.header}>
        <div className={`${classes.container} container`}>
          <Link className={classes.logo} href="/">
            <Image src={logoImg} alt="logo" />
            Kimye0808
          </Link>
          <StoreProvider>
            <NavBar />
            <MenuButton />
          </StoreProvider>
        </div>
      </header>
    </>
  );
}
