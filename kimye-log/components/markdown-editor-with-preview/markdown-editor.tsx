"use client";
import classes from "./markdown-editor-with-preview.module.css";
import {
  setReduxContents,
  setReduxLineNumber,
} from "@/lib/features/live-editor/writeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { EditorView } from "@codemirror/view";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { ToolbarFeatures } from "./toolbar/toolbar";

import { deleteAllImagesInContents } from "@/utils/storage-util";
import { toastNotification } from "@/utils/notification";

/**
 * markdown editor는 동적으로 추가한다
 */
const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Editor() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const [contents, setContents] = useState("");
  const [isContentsChanged, setIsContentsChanged] = useState(false);
  const initialPopState = useRef<boolean>(false);
  const errorNotification = () =>
    toastNotification("Failed to delete images!", "error");
  const images = useAppSelector((state) => state.write.images);
  /**
   *  처음 mount이후에 현재 페이지를 기록한다(뒤로가기용)
   */
  useEffect(() => {
    if (!initialPopState.current) {
      history.pushState(null, "");
      initialPopState.current = true;
      toastNotification(
        "새로고침 및 다른 페이지로 이동시 글이 저장되지 않습니다.",
        "info"
      );
    }
  }, []);

  /**
   *  포스트 내용이 바뀌었을때 포스트 이탈 시도시 컨펌창
   */
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (isContentsChanged) {
        try {
          await deleteAllImagesInContents(images);
        } catch (error) {
          errorNotification();
          console.error(error);
        }
      }
    };
    const handlePopstate = async () => {
      if (isContentsChanged) {
        const confirmResult = window.confirm(
          "작성 중인 내용이 있습니다. 이 페이지를 떠나시겠습니까?"
        );
        if (!confirmResult) {
          history.pushState(null, "");
          return;
        } else {
          try {
            await deleteAllImagesInContents(images);
          } catch (error) {
            errorNotification();
            console.error(error);
          }
          history.go(-1);
        }
      } else {
        try {
          await deleteAllImagesInContents(images);
        } catch (error) {
          errorNotification();
          console.error(error);
        }
        history.go(-1);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [images, isContentsChanged, pathName, router]);

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
      setIsContentsChanged(true);
      setContents(value);
      throttleChange(value);
    },
    [throttleChange]
  );

  return (
    <div className={classes.contents}>
      <MarkdownEditor
        height="700px"
        value={contents}
        placeholder={"포스트 내용을 입력하세요"}
        extensions={[EditorView.lineWrapping]}
        onChange={handleChange}
        enablePreview={false}
        toolbars={ToolbarFeatures()}
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
