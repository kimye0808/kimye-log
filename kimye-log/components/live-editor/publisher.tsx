import classes from "./live-editor.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Publisher() {
  return (
    <>
      <div className={classes.publisher}>
        <div className={classes["contents-wrapper"]}>
          <button className={`${classes.exit} hover-2`}>
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
