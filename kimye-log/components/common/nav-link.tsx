"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();
  let isPath = false;
  //path "/"는 home버튼 클릭과 같기 때문에 해당 경우 고려

  // href가 "/"이고 path가 "/"이 아닌 경우 또는 path가 href로 시작하는 경우 active 클래스 추가
  if (href === "/") {
    if (path === "/") {
      isPath = true;
    }
  } else {
    if (path.startsWith(href)) {
      isPath = true;
    }
  }
  return (
    <Link
      href={href}
      className={
        isPath ? `${classes.link} ${classes.active}` : `${classes.link}`
      }
    >
      {children}
    </Link>
  );
}
