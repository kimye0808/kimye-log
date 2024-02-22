"use client";
import classes from "./live-editor.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { writeContents } from "@/lib/features/live-editor/writeSlice";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const dispatch = useAppDispatch();
  const contents = useAppSelector((state) => {
    return state.write.contents;
  });
  /**
   *  return
   */
  return (
    <article className={classes.box}>
      <div className={classes.wrapper}>
        <textarea
          className={classes.title}
          placeholder="제목"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={150}
        />

        <input
          className={classes.tag}
          type="text"
          placeholder="태그"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
          maxLength={20}
        />

        <MDEditor
          className={classes.contents}
          value={contents}
          textareaProps={{
            placeholder: "포스트 내용을 입력해주세요",
          }}
          onChange={(
            value?: string,
            event?: React.ChangeEvent<HTMLTextAreaElement>
          ) => dispatch(writeContents(value ?? ""))}
          preview="edit"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          visibleDragbar={false}
          autoFocus={true}
          components={{
            toolbar: (command, disabled, executeCommand) => {
              if (command.name === "edit") {
                return (
                  <button
                    className={classes["toolbar-btn"]}
                    aria-label="Edit code"
                    disabled={disabled}
                    onClick={(evn) => {
                      evn.stopPropagation();
                      executeCommand(command, command.groupName);
                    }}
                  >
                    edit
                  </button>
                );
              } else if (command.name === "live") {
                return (
                  <button
                    className={classes["toolbar-btn"]}
                    aria-label="Live code"
                    disabled={disabled}
                    onClick={(evn) => {
                      evn.stopPropagation();
                      executeCommand(command, command.groupName);
                    }}
                  >
                    live
                  </button>
                );
              } else if (command.name === "preview") {
                return (
                  <button
                    className={classes["toolbar-btn"]}
                    aria-label="Preview code"
                    disabled={disabled}
                    onClick={(evn) => {
                      evn.stopPropagation();
                      executeCommand(command, command.groupName);
                    }}
                  >
                    preview
                  </button>
                );
              } else if (command.name === "fullscreen") {
                return (
                  <button
                    className={classes["toolbar-btn"]}
                    aria-label="Fullscreen"
                    disabled={disabled}
                    onClick={(evn) => {
                      evn.stopPropagation();
                      executeCommand(command, command.groupName);
                    }}
                  >
                    fullscreen
                  </button>
                );
              }
            },
          }}
        />
      </div>
    </article>
  );
}
