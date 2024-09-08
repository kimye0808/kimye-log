import { useEffect, useState, useRef, MutableRefObject } from "react";

interface PropsType {
  initialState: boolean;
}

/**
 * ref 바깥을 누르면 open flag를 false로 만드는 hook
 */
const useDetectClose = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null) as MutableRefObject<HTMLElement | null>;

  const toggleIsOpen = () => {
    setIsOpen(true);
  };
  /**
   *DOM에 핸들러 추가할때 사용할 콜백
   */
  const handleClick = (event: React.SyntheticEvent | MouseEvent) => {
    console.log(event.target);
    console.log("ref current", ref.current);
    console.log(isOpen);
    if (!ref.current?.contains(event.target as HTMLElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return { isOpen, ref, toggleIsOpen };
};

export default useDetectClose;
