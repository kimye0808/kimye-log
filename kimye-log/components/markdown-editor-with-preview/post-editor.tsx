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
  const contents = useAppSelector((state) => state.write.contents);
  const tagsArrayRef = useRef<HTMLDivElement>(null);

  /**
   *  tags 배열에 추가하거나 제거한다
   */
  function addTag(tag: string) {
    if (!tags.includes(tag) && tag.trim() !== "") {
      dispatch(setReduxTags((prevTags: string[]) => [...prevTags, tag]));
      addTagElement(tag);
    }
  }
  function deleteTag(tag: string) {
    const isInclude = tags.includes(tag);
    dispatch(
      setReduxTags((prevTags: string[]) => {
        if (!isInclude) {
          return prevTags;
        }
        const newTags = prevTags.filter((item) => {
          return item !== tag;
        });
        return newTags;
      })
    );
    if (!isInclude) {
      deleteTagElement(tag);
    }
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

        <MarkdownEditor contents={contents} />
      </div>
    </article>
  );
}
