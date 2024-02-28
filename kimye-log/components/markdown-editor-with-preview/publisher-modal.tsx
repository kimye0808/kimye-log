"use client";
import classes from "./publisher.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleVisible } from "@/lib/features/live-editor/writeSlice";
import ImagePicker from "./image-picker";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toastNotification } from "@/utils/notification";
import { makeSummary } from "@/utils/makeSummary";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

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
  const router = useRouter();
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");

  const title = useAppSelector((state) => state.write.title);
  const tags = useAppSelector((state) => state.write.tags);
  const contents = useAppSelector((state) => state.write.contents);
  const isVisible = useAppSelector((state) => state.write.publishVisible);

  const toastifyInfo = () =>
    toastNotification("Attempting to submit...", "info");
  const toastifyError = () => toastNotification("Failed to submit!", "error");
  const toastifySuccess = () =>
    toastNotification("Submitted successfully!", "success");
  const toastifyWarning = (message: string) =>
    toastNotification("reasons : ", "warning", message);

  /**
   *  본문에서 150자 자동으로 summary 설정
   */
  useEffect(() => {
    setSummary(makeSummary(contents));
  }, [contents]);

  /**
   *  handle submit form
   */
  async function handleSubmit(formData: FormData) {
    let date = formatDate(new Date());
    formData.append("title", title);
    formData.append("tags", JSON.stringify(tags));
    formData.append("contents", contents);
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
