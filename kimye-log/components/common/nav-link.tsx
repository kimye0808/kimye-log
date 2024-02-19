"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import classes from "./nav-link.module.css";
import { useEffect } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname(); // /posts?a = 1  => /posts
  const search = useSearchParams(); //  /posts?a = 1 => get('a') === 1
  let isPath = false;

  const qParam = search.get("q");
  const tagParam = search.get("tag");
  const isNavbar = typeof children === "string";

  /**
   * 해당 navlink 버튼이 url 조건에 맞는가
   * href(link버튼에 적힌 내용)  path(page) qParam(q= "") tagParam(tag= "")
   */
  if (href === "/") {
    if (path === "/") {
      isPath = true;
    }
  } else if (isNavbar) {
    //navbar는 따로 처리: post의 '전체 보기'와 navbar post 중복 방지
    if (path === href) {
      isPath = true;
    }
  } else {
    if (qParam && href === "/posts") {
      isPath = true;
    } else if (tagParam) {
      const startIndex = href.indexOf("tag=");
      if (startIndex !== -1) {
        const content = href.slice(startIndex + 4);
        if (content === tagParam) {
          isPath = true;
        }
      }
    } else if (href === "/posts" && path === "/posts") {
      isPath = true;
    }
  }

  // console.log("href:", href, "path:", path, "issame:", href === path);

  return (
    <Link
      href={href}
      className={
        isNavbar && isPath
          ? `${classes.link} ${classes.active2}`
          : isPath
          ? `${classes.link} ${classes.active}`
          : `${classes.link}`
      }
    >
      {children}
    </Link>
  );
}
