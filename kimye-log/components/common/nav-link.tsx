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
  const pathLength = path.length;
  const pathAfterSlash = path.slice(1);

  //path "/"는 home버튼 클릭과 같기 때문에 해당 경우 고려
  let pathContent: string;
  if (pathLength === 1 && pathAfterSlash === "") {
    pathContent = "/";
  } else {
    pathContent = pathAfterSlash;
  }

  return (
    <Link
      href={href}
      className={
        pathContent.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
