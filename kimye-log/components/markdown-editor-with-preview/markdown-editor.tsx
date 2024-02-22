"use client";
import classes from "./markdown-editor-with-preview.module.css";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { writeContents } from "@/lib/features/live-editor/writeSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function MarkdownEditor({ contents }: { contents: string }) {
  const dispatch = useAppDispatch();

  return (
    <div className={classes.contents}>
      <MDEditor
        height={650}
        value={contents}
        textareaProps={{
          placeholder: "포스트 내용을 입력하세요",
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
  );
}
