"use client";
import classes from "./markdown-renderer.module.css";
import rehypeSanitize from "rehype-sanitize";
import { useAppSelector } from "@/lib/hooks";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef } from "react";

export default function MarkdownRenderer() {
  const autoScrollRef = useRef<HTMLDivElement>(null);
  const contents = useAppSelector((state) => {
    return state.write.contents;
  });

  /**
   *  글이 추가되면 자동으로 맨밑으로 스크롤한다
   */
  const scrollToBottom = () => {
    autoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  //for security against XSS
  const rehypePlugins = [rehypeSanitize];
  return (
    <article className={classes.box}>
      <div className={classes.wrapper}>
        <MDEditor.Markdown
          source={contents}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <div ref={autoScrollRef}></div>
      </div>
    </article>
  );
}
