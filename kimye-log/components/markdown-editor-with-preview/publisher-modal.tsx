"use client";
import classes from "./publisher.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleVisible } from "@/lib/features/live-editor/writeSlice";
import ImagePicker from "./image-picker";
import { useState } from "react";

export default function PublisherModal() {
  const [summary, setSummary] = useState<string>("");
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => {
    return state.write.publishVisible;
  });

  return (
    <>
      <div>
        {isVisible && (
          <section className={classes.modal}>
            <div className={classes.wrapper}>
              <ImagePicker />
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
