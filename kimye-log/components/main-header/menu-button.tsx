"use client";
import { useAppDispatch } from "@/lib/hooks";
import { toggle } from "@/lib/features/header/headerSlice";
import { TfiMenu } from "react-icons/tfi";

export default function MenuButton() {
  //store에서 navbar 보여질지 말지 정보 받기
  const dispatch = useAppDispatch();
  /**
   * toggle navbarVisible in redux store
   */
  function toggleVisible() {
    dispatch(toggle());
  }

  return (
    <>
      <button onClick={toggleVisible}>
        <TfiMenu size="3rem" />
      </button>
    </>
  );
}
