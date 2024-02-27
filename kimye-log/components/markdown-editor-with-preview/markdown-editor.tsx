"use client";
import classes from "./markdown-editor-with-preview.module.css";
import {
  setReduxContents,
  setReduxLineNumber,
} from "@/lib/features/live-editor/writeSlice";
import { useAppDispatch } from "@/lib/hooks";
import { throttle } from "lodash";

import { EditorView } from "@codemirror/view";
import dynamic from "next/dynamic";

import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Commands } from "@uiw/react-markdown-editor/cjs/components/ToolBar";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * markdown editor는 동적으로 추가한다
 */
const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Editor() {
  const dispatch = useAppDispatch();
  const [contents, setContents] = useState("");

  /**
   *  마지막 라인의 숫자를 알아낸다
   */
  const throttleLineChange = useMemo(
    () =>
      throttle((lineno: number) => dispatch(setReduxLineNumber(lineno)), 1000),
    [dispatch]
  );
  useEffect(() => {
    // 내용이 바뀔 때마다 맨 마지막 cm-line 요소의 인덱스를 업데이트
    const cmLineElements = document.querySelectorAll(".cm-line");
    if (cmLineElements.length > 0) {
      throttleLineChange(cmLineElements.length - 1);
    }
  }, [contents, throttleLineChange]);

  /**
   *  contents를 업데이트하고 redux의 contents는 throttle한다
   */
  const throttleChange = useMemo(
    () => throttle((value: string) => dispatch(setReduxContents(value)), 1000),
    [dispatch]
  );
  const handleChange = useCallback(
    (value: string) => {
      setContents(value);
      throttleChange(value);
    },
    [throttleChange]
  );

  /**
   *  toolbar에 추가할 요소들
   */
  const toolbarFeatures: Commands[] = [
    "bold",
    "italic",
    "header",
    "strike",
    "underline",
    "quote",
    "olist",
    "ulist",
    "todo",
    "link",
    "image",
    "code",
    "codeBlock",
  ];

  return (
    <div className={classes.contents}>
      <MarkdownEditor
        height="630px"
        value={contents}
        placeholder={"포스트 내용을 입력하세요"}
        extensions={[EditorView.lineWrapping]}
        onChange={handleChange}
        enablePreview={false}
        toolbars={toolbarFeatures}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false,
          searchKeymap: false,
        }}
      />
    </div>
  );
}
