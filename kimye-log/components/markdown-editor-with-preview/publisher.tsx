"use client";
import { useRouter } from "next/navigation";
import classes from "./publisher.module.css";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import { useAppDispatch } from "@/lib/hooks";
import { toggleVisible } from "@/lib/features/live-editor/writeSlice";

export default function Publisher() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  /**
   *  publish 버튼 누르면 팝업창
   */
  function handleClickPublish() {
    dispatch(toggleVisible());
  }

  /**
   *  return
   */
  return (
    <>
      <div className={classes.publisher}>
        <div className={classes["contents-wrapper"]}>
          <button
            type="button"
            className={`${classes.exit} hover-2`}
            onClick={() => router.back()}
          >
            <IoMdArrowRoundBack />
            나가기
          </button>
          <button
            className={`${classes.publish} btn btn-secondary`}
            onClick={handleClickPublish}
          >
            Publish
          </button>
        </div>
      </div>
    </>
  );
}
