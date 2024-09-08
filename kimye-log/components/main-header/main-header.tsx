import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo_black.png";
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
            <Image
              src={logoImg}
              alt="kimye0808's blog logo"
              width="30"
              height="30"
              priority
            />
            Kimye
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
