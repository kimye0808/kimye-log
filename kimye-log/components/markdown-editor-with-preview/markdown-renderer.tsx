"use client";
import classes from "./markdown-renderer.module.css";
import rehypeSanitize from "rehype-sanitize";
import { useAppSelector } from "@/lib/hooks";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useEffect, useRef } from "react";

export default function MarkdownRenderer() {
  const autoScrollRef = useRef<HTMLDivElement>(null);
  const contents = useAppSelector((state) => {
    return state.write.contents;
  });
  const lastLine = useAppSelector((state) => {
    return state.write.lastLine;
  });

  useEffect(() => {
    // 마지막 줄로 스크롤
    if (autoScrollRef.current) {
      autoScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [lastLine]); // contents가 변경될 때마다 스크롤

  //security for XSS
  const rehypePlugins = [rehypeSanitize];
  return (
    <article className={classes.box}>
      <div className={classes.wrapper}>
        <MarkdownEditor.Markdown
          source={contents}
          style={{ whiteSpace: "pre-wrap" }}
          rehypePlugins={rehypePlugins}
        />
        <div ref={autoScrollRef}></div>
      </div>
    </article>
  );
}
