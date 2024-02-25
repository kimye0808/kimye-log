"use client";
import classes from "./publisher.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleVisible } from "@/lib/features/live-editor/writeSlice";
import ImagePicker from "./image-picker";
import { useEffect, useState } from "react";

export default function PublisherModal() {
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
    // 코드 블록 제거
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
   * return
   */
  return (
    <>
      <div>
        {isVisible && (
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
                />
              </div>

              <div className={classes["button-wrapper"]}>
                <button
                  type="button"
                  className={`${classes.exit} hover-2`}
                  onClick={() => dispatch(toggleVisible())}
                >
                  뒤로가기
                </button>
                <button className={`${classes.publish} btn btn-secondary`}>
                  submit
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
