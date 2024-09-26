"use client";
import { Commands } from "@uiw/react-markdown-editor/cjs/components/ToolBar";
import { EditorSelection } from "@codemirror/state";
import { useRef, useState } from "react";
import { storage } from "@/firebase/firebase";
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import { formatFilePath } from "@/utils/format-file";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@uiw/react-codemirror";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setReduxImages } from "@/lib/features/live-editor/writeSlice";
import { toastNotification } from "@/utils/notification";

const codeBlock: Commands = {
  name: "codeBlock",
  keyCommand: "codeBlock",
  button: { "aria-label": "Insert Code Block" },
  icon: (
    <svg viewBox="0 0 48 48" fill="none" height="15" width="15">
      <path
        d="M21 6H9a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V21M24 34v8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m32 6-4 4 4 4m6-8 4 4-4 4M14 42h20"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(
      view.state.selection.main.from,
      view.state.selection.main.to
    );
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `\`\`\`\n${txt}\n\`\`\``,
      },
      selection: EditorSelection.range(main.from + 3, main.from + 5),
    });
  },
};

const link: Commands = {
  name: "link",
  keyCommand: "link",
  button: { "aria-label": "Add link text" },
  icon: (
    <svg fill="currentColor" viewBox="0 0 640 512" height="16" width="16">
      <path d="M172.5 131.1c55.6-55.59 148-55.59 203.6 0 50 50 57.4 129.7 16.3 187.2l-1.1 1.6c-10.3 14.3-30.3 17.7-44.6 7.4-14.4-10.3-17.8-30.3-7.5-44.6l1.1-1.6c22.9-32.1 19.3-76-8.6-103.9-31.4-31.4-82.5-31.4-114 0L105.5 289.5c-31.51 30.6-31.51 82.5 0 114 27.8 27.9 71.8 31.5 103.8 8.6l1.6-2c14.4-9.4 34.4-6.1 44.6 8.3 10.3 14.4 7 34.4-7.4 44.7l-1.6 1.1c-58.4 41.1-136.3 34.5-186.29-15.4-56.469-56.5-56.469-148.1 0-204.5L172.5 131.1zm295 248.9c-56.5 56.5-148 56.5-204.5 0-50-50-56.5-128.8-15.4-186.3l1.1-1.6c9.4-14.3 29.4-17.7 44.6-7.4 14.4 9.4 17.8 29.4 7.5 44.6l-1.1 1.6c-22.9 31.2-19.3 76 8.6 103.9 31.4 31.4 82.5 31.4 114 0l112.2-112.3c31.5-31.5 31.5-83.4 0-114-27.8-27.87-71.8-31.51-103.8-8.6l-1.6 1.1c-14.4 10.3-34.4 6.1-44.6-7.42-10.3-14.38-7-34.37 7.4-44.64l1.6-1.12C451 6.731 529.8 13.25 579.8 63.24c56.5 56.46 56.5 148.06 0 204.46L467.5 380z" />
    </svg>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    if (!state || !view) return;
    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(
      view.state.selection.main.from,
      view.state.selection.main.to
    );
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `[${txt}](링크url)`,
      },
      selection: EditorSelection.range(main.from + 3 + txt.length, main.to + 3),
      // selection: { anchor: main.from + 4 },
    });
  },
};

/**
 *  markdown editor 의 toolbar 배열을 리턴하는 컴포넌트 함수
 */
export function ToolbarFeatures() {
  const toastError = () => toastNotification("Image upload failed", "error");
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const images = useAppSelector((state) => state.write.images);
  function handlePickClick() {
    imageInputRef.current?.click();
  }
  const toastifyWarning = () =>
    toastNotification(
      "새로고침 및 페이지 이동 시도시 사진이 지워집니다",
      "warning"
    );

  let editorState: EditorState | undefined;
  let editorView: EditorView | undefined;
  /**
   *  firebase storage에 파일을 저장하고 url을 받고 에디터 및 리덕스에 반영한다
   */
  async function submitToStorage(file: File, fileName: string) {
    // 파일명을 포함한 전체 경로 생성
    const formatPath = formatFilePath(fileName);
    const fileRef = ref(storage, "images/" + formatPath);
    let url: string = "";
    try {
      await uploadBytes(fileRef, file); // uploadString 대신 uploadBytes 사용
      url = await getDownloadURL(fileRef);
    } catch (error) {
      toastError();
      console.error(error);
    }

    if (!editorState || !editorView) return;

    const main = editorView.state.selection.main;
    editorView.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `![${fileName}](${url})`,
      },
      selection: EditorSelection.range(main.from + 4, main.to + 4),
    });

    const newImages = [...images, url];
    dispatch(setReduxImages(newImages));
    toastifyWarning();
  }

  /**
   *  handle input change event
   */
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      const pickedImage = fileReader.result as string;

      if (pickedImage) {
        try {
          const fileName = file.name;
          await submitToStorage(file, fileName);
        } catch (error) {
          toastError();
          console.error(error);
        }
      }
    };
  }

  /**
   * toolbar에 추가할 이미지 버튼
   */
  const markdownImage: Commands = {
    name: "image",
    keyCommand: "image",
    button: { "aria-label": "Add image text" },
    icon: (
      <>
        <input
          style={{ display: "none" }}
          type="file"
          id={"thumbnail"}
          accept="image/png, image/jpeg"
          name={"thumbnail"}
          ref={imageInputRef}
          onChange={handleImageChange}
        />
        <svg fill="currentColor" viewBox="0 0 16 16" height="14" width="14">
          <path
            fillRule="evenodd"
            d="M1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h.94a.76.76 0 0 1 .03-.03l6.077-6.078a1.75 1.75 0 0 1 2.412-.06L14.5 10.31V2.75a.25.25 0 0 0-.25-.25H1.75zm12.5 11H4.81l5.048-5.047a.25.25 0 0 1 .344-.009l4.298 3.889v.917a.25.25 0 0 1-.25.25zm1.75-.25V2.75A1.75 1.75 0 0 0 14.25 1H1.75A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25zM5.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM7 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
          />
        </svg>
      </>
    ),
    //버튼 클릭시 execute 자동으로 실행
    execute: ({ state, view }) => {
      if (!state || !view) return;
      handlePickClick();
      editorState = state;
      editorView = view;
    },
  };

  return [
    "bold",
    "italic",
    "header",
    "strike",
    "underline",
    "quote",
    "olist",
    "ulist",
    "todo",
    link,
    markdownImage,
    "code",
    codeBlock,
  ] as Commands[];
}
