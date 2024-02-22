"use client";
import { useRouter } from "next/navigation";
import classes from "./publisher.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Publisher() {
  const router = useRouter();
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
          <button className={`${classes.publish} btn btn-secondary`}>
            Publish
          </button>
        </div>
      </div>
    </>
  );
}
