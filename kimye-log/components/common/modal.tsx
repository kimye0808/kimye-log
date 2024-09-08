"use client";
import classes from "./modal.module.css";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className={`${classes.exit} hover-2`}
        onClick={() => {
          router.back();
        }}
      >
        취소
      </button>
      <div>{children}</div>
    </>
  );
}
