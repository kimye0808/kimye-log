"use client";
import classes from "./markdown-renderer.module.css";
import rehypeSanitize from "rehype-sanitize";
import { useAppSelector } from "@/lib/hooks";
import MDEditor from "@uiw/react-md-editor";

export default function MarkdownRenderer() {
  const contents = useAppSelector((state) => {
    return state.write.contents;
  });

  //for security against XSS
  const rehypePlugins = [rehypeSanitize];
  return (
    <article className={classes.box}>
      <div className={classes.wrapper}>
        <MDEditor.Markdown
          source={contents}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </article>
  );
}
