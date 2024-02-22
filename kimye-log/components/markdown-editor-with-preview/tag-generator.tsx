"use client";
import React, { useState } from "react";
import classes from "./markdown-editor-with-preview.module.css";

interface TagGeneratorType {
  addTag: (tag: string) => void;
}

export default function TagGenerators({ addTag }: TagGeneratorType) {
  const [tag, setTag] = useState("");

  /**
   *  input enter시 태그를 추가한다
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTag(tag);
      setTag("");
    }
  };

  /**
   *  input이 focus를 잃었을때도 태그를 추가한다
   */
  const handleBlur = () => {
    if (tag.trim() !== "") {
      addTag(tag);
      setTag("");
    }
  };

  /**
   *  return
   */
  return (
    <input
      className={classes["tag-input"]}
      type="text"
      placeholder="태그를 입력하세요"
      value={tag}
      onChange={(event) => setTag(event.target.value)}
      maxLength={20}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
}
