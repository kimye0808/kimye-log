"use client";
import classes from "./publisher.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleVisible } from "@/lib/features/live-editor/writeSlice";
import ImagePicker from "./image-picker";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function PublisherModal() {
  const status = useFormStatus();

  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");

  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.write.title);
  const tags = useAppSelector((state) => state.write.tags);
  const contents = useAppSelector((state) => state.write.contents);
  const isVisible = useAppSelector((state) => state.write.publishVisible);

  /**
   *  본문에서 150자 자동으로 summary 설정
   */
  useEffect(() => {
    let pureText = contents.replace(/```[^```]*```/g, "");
    pureText = pureText.replace(/`[^`]*`/g, "");
    pureText = pureText.replace(/\[.*?\]\(.*?\)/g, "");
    pureText = pureText.replace(/^>\s+.+/gm, "");
    pureText = pureText.replace(/^\d+\.\s+.+/gm, "");
    pureText = pureText.replace(/^- \[ \].+/gm, "");
    pureText = pureText.replace(/^- \[x\].+/gm, "");
    pureText = pureText.replace(/^\|.*?\|$/gm, "");
    pureText = pureText.replace(/^#+\s+.+/gm, "");
    pureText = pureText.replace(/!\[.*?\]\(.*?\)/g, "");
    pureText = pureText.replace(/\*\*[^*]*\*\*/g, "");
    pureText = pureText.replace(/\*[^*]*\*/g, "");
    pureText = pureText.replace(/~~[^~]*~~/g, "");
    pureText = pureText.trim();
    setSummary(pureText.substring(0, 150));
  }, [contents]);

  /**
   *  handle submit form
   */
  async function handleSubmit(formData: FormData) {
    formData.append("title", title);
    formData.append("tags", JSON.stringify(tags));
    formData.append("contents", contents);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(`${responseData?.message}`);
      }
      console.log("Post submitted successfully!");
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
                disabled={status.pending}
              />

              <div className={classes.summary}>
                <textarea
                  placeholder="포스트 요약을 적으세요"
                  value={summary}
                  maxLength={150}
                  onChange={(event) => setSummary(event.target.value)}
                  name="summary"
                  disabled={status.pending}
                />
              </div>

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
                  {status.pending ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}
