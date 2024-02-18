"use client";
import Link from "next/link";
import NavLink from "../common/nav-link";
import Image from "next/image";
import classes from "./nav-bar.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { toggle } from "@/lib/features/header/headerSlice";
import { TfiMenu } from "react-icons/tfi";
import logoImg from "@/assets/logo.png";
import useDetectClose from "@/hooks/useDetectClose";
import { useEffect, useRef } from "react";
/**
 * 화면이 클때는 헤더에 잘 보이고 작아지면 버튼 클릭해야 보이는 navigationBar
 */
export default function NavBar() {
  //store에서 보여질지 말지 정보 받기
  const dispatch = useAppDispatch();
  const navbarVisible = useAppSelector((state: RootState) => {
    return state.header.navbarVisible;
  });
  const navbarRef = useRef(null);

  /**
   * toggle navbarVisible in redux store
   */
  function toggleVisible() {
    dispatch(toggle());
  }
  /**
   *   navbar 외부를 클릭할 때 메뉴 닫히게
   */
  useDetectClose(
    navbarRef,
    () => {
      dispatch(toggle()); // navbar 외부를 클릭했으므로 navbarVisible을 false로 만듦
    },
    navbarVisible
  );

  /**
   * 링크를 클릭해서 이동하면 navbar가 닫히게 한다
   */
  function handleLinkClick() {
    toggleVisible();
  }
  /**
   * return
   **/
  return (
    <>
      <nav
        className={`${classes.navbar} ${navbarVisible ? classes.active : ""}`}
        ref={navbarRef}
      >
        <div className={classes["navbar-top"]}>
          <Link href="/">
            <Image src={logoImg} alt="kimye0808 logo" width="20" height="20" />
          </Link>
          <button onClick={toggleVisible}>
            <TfiMenu size="3rem" color="white" />
          </button>
        </div>

        <ul className={classes["navbar-list"]}>
          <li
            className={`${classes["navbar-link"]} hover-3`}
            onClick={handleLinkClick}
          >
            <NavLink href="/">Home</NavLink>
          </li>
          <li
            className={`${classes["navbar-link"]} hover-3`}
            onClick={handleLinkClick}
          >
            <NavLink href="/posts">Posts</NavLink>
          </li>
          <li
            className={`${classes["navbar-link"]} hover-3`}
            onClick={handleLinkClick}
          >
            <NavLink href="/about">About</NavLink>
          </li>
        </ul>

        <p className={classes["copyright-text"]}>
          Copyright 2024 © KimyeLog - kimye0808 &apos;s Blog. Developed by
          kimye0808
        </p>
      </nav>
    </>
  );
}
