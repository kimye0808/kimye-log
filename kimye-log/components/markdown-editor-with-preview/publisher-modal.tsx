"use client";
import classes from "./publisher.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setReduxImages,
  toggleVisible,
} from "@/lib/features/live-editor/writeSlice";
import ImagePicker from "./image-picker";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toastNotification } from "@/utils/notification";
import { makeSummary } from "@/utils/make-summary";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/format-file";
import {
  deleteImageFromStorage,
  getImagePath,
  getImageUrlsFromMarkdowon,
  getMarkdownImagesFromContents,
} from "@/utils/storage-util";
import xss from "xss";
import slugify from "slugify";
/**
 *  Submit Buttons
 */
function Submit() {
  const dispatch = useAppDispatch();
  const status = useFormStatus();

  return (
    <div className={classes["button-wrapper"]}>
      <button
        type="button"
        className={`${classes.exit} hover-2`}
        onClick={() => dispatch(toggleVisible())}
        disabled={status.pending}
      >
        뒤로가기
      </button>

      <button
        className={`${classes.publish} btn btn-secondary`}
        disabled={status.pending}
      >
        {status.pending ? "Loading" : "Submit"}
      </button>
    </div>
  );
}

/**
 *  publisher에서 publish 클릭시 나오는 창
 */
export default function PublisherModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [pickedImage, setPickedImage] = useState<string | null>(null); //미리보기용도
  const [summary, setSummary] = useState<string>("");

  const title = useAppSelector((state) => state.write.title);
  const tags = useAppSelector((state) => state.write.tags);
  const thumbnail = useAppSelector((state) => state.write.thumbnail);
  const contents = useAppSelector((state) => state.write.contents);
  const isVisible = useAppSelector((state) => state.write.publishVisible);
  const images = useAppSelector((state) => state.write.images);

  const toastifyInfo = () =>
    toastNotification("Attempting to submit...", "info");
  const toastifyError = () => toastNotification("Failed to submit!", "error");
  const toastifySuccess = () =>
    toastNotification("Submitted successfully!", "success");
  const toastifyWarning = (message: string) =>
    toastNotification("reasons : ", "warning", message);

  useEffect(() => {
    if (isVisible) {
      if (title === "" || contents === "") {
        toastNotification("The title or content is empty", "error");
      }
    }
  }, [isVisible, contents, title]);
  /**
   *  본문에서 150자 자동으로 summary 설정, 150자가 되면 useEffect 중지
   */
  useEffect(() => {
    const result = makeSummary(contents);
    if (result.length < 150) {
      setSummary(result);
    }
    return () => {};
  }, [contents]);

  /**
   *  본문에서 ![*](url)형태를 찾아서 스토리지에 올렸지만 사용하지 않는 이미지들을 찾는다
   */
  function getUnusedImages() {
    const imageMarkdowns = getMarkdownImagesFromContents(contents);
    const imageUrls = getImageUrlsFromMarkdowon(imageMarkdowns);
    const nonMatchingImagesUrl: string[] | null = images.filter(
      (image) => !imageUrls?.includes(image)
    );
    const nonMatchingImages = nonMatchingImagesUrl.map((url) => {
      const filePath = getImagePath(url);
      return filePath;
    });
    return nonMatchingImages;
  }

  /**
   *  스토리지에 올렸지만 사용하지 않는 이미지들을 삭제한다
   */
  async function deleteUnusedImages() {
    const nonMatchingImages = getUnusedImages();

    if (nonMatchingImages.length > 0) {
      for (const image of nonMatchingImages) {
        try {
          await deleteImageFromStorage(image);
        } catch (error) {
          toastNotification("Cannot delete unused images in storages", "error");
          throw new Error("Error to delete an unused image in storage");
        }
      }
      const updatedImages = images.filter(
        (image) => !nonMatchingImages.includes(image)
      );
      dispatch(setReduxImages(updatedImages));
    }
  }

  /**
   *  handle submit form
   */
  async function handleSubmit(formData: FormData) {
    deleteUnusedImages();
    let date = formatDate(new Date());
    formData.append(
      "slug",
      slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g })
    );
    formData.append("title", title);
    formData.append("tags", JSON.stringify(tags));
    formData.append("thumbnail", thumbnail || "");
    formData.append("contents", xss(contents));
    formData.append("date", date);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toastifyError();
        const responseData = await response.json();
        toastifyWarning(responseData?.message);
        throw new Error(`${responseData?.message}`);
      }

      toastifySuccess();
      router.push("/posts");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  }
  /**
   * return
   */
  return (
    <div>
      {isVisible && (
        <form action={handleSubmit}>
          <section className={classes.modal}>
            <div className={classes.wrapper}>
              <ImagePicker
                pickedImage={pickedImage}
                handleImage={(item: string | null) => setPickedImage(item)}
              />

              <div className={classes.summary}>
                <textarea
                  placeholder="포스트 요약을 적으세요"
                  value={summary}
                  maxLength={150}
                  onChange={(event) => setSummary(event.target.value)}
                  name="summary"
                />
              </div>

              <Submit />
            </div>
          </section>
        </form>
      )}
    </div>
  );
}
