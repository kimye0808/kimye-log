"use client";
import classes from "./markdown-editor-with-preview.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import {
  setReduxTitle,
  setReduxTags,
  setReduxContents,
} from "@/lib/features/live-editor/writeSlice";
import MarkdownEditor from "./markdown-editor";
import TagGenerators from "./tag-generator";

export default function PostEditor() {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.write.title);
  const tags = useAppSelector((state) =>
    Array.isArray(state.write.tags) ? state.write.tags : []
  );
  const tagsArrayRef = useRef<HTMLDivElement>(null);

  /**
   *  tags 배열에 추가하거나 제거한다
   */
  function addTag(tag: string) {
    if (!tags.includes(tag) && tag.trim() !== "") {
      const newTags = [...tags, tag];
      dispatch(setReduxTags(newTags));
      addTagElement(tag);
    }
  }
  function deleteTag(tag: string) {
    const isInclude = tags.includes(tag);
    let newTags: string[];
    if (!isInclude) {
      newTags = tags;
      deleteTagElement(tag);
    } else {
      newTags = tags.filter((item) => item !== tag);
    }
    dispatch(setReduxTags(newTags));
  }
  /**
   *  tags array DOM element를  추가하거나 제거한다
   */
  function addTagElement(tag: string) {
    const newTagElement = document.createElement("div");
    newTagElement.textContent = tag;
    newTagElement.className = classes.tag;
    newTagElement.addEventListener("click", () => deleteTag(tag));

    const firstChild = tagsArrayRef.current?.firstChild;

    if (firstChild) {
      tagsArrayRef.current?.insertBefore(newTagElement, firstChild);
    } else {
      tagsArrayRef.current?.appendChild(newTagElement);
    }
  }
  function deleteTagElement(tag: string) {
    const tagElements = tagsArrayRef.current?.querySelectorAll("div");
    tagElements?.forEach((element) => {
      if (element.textContent === tag) {
        element.remove();
      }
    });
  }
  /**
   *  return
   */
  return (
    <>
      <article className={classes.box}>
        <div className={classes.wrapper}>
          <textarea
            className={classes.title}
            placeholder="제목"
            value={title}
            onChange={(event) => dispatch(setReduxTitle(event.target.value))}
            maxLength={150}
          />
          <div ref={tagsArrayRef} className={classes["tags-array"]}>
            <TagGenerators addTag={addTag} />
          </div>

          <MarkdownEditor />
        </div>
      </article>
    </>
  );
}
