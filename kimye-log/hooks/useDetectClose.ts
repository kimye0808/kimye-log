import { useEffect, MutableRefObject } from "react";

// useDetectClose hook 정의
export default function useDetectClose(
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  visible: boolean
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        visible &&
        !ref.current.contains(event.target as HTMLElement)
      ) {
        callback();
      }
    }
    if (visible) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback, visible]);
}
