"use client";
import classes from "./image-picker.module.css";
import React, { useRef, useState } from "react";
import Image from "next/image";

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState<any>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInputRef.current?.click();
  }

  /**
   *  이미지 파일 읽고 dataurl로 변환 후 set
   */
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={"임시"}>포스트 미리보기</label>

      <div className={classes.preview}>
        {!pickedImage && <p>No image picked yet</p>}
        {pickedImage && (
          <Image src={pickedImage} alt="The image selected by the user" fill />
        )}
        <button
          className={`${classes.button} btn btn-secondary`}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
      <input
        className={classes.input}
        type="file"
        id={"임시"}
        accept="image/png, image/jpeg"
        name={"임시"}
        ref={imageInputRef}
        onChange={handleImageChange}
        required //이미지 선택시에만 제출 가능
      />
    </div>
  );
}