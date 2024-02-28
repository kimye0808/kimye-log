import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "info" | "error" | "warning" | "success";

const toastColors = {
  info: "#3498db",
  error: "#FA5858",
  warning: "#f39c12",
  success: "#2ecc71",
};

export const toastNotification = (
  msg: string,
  type: ToastType,
  message?: string
) => {
  if (message) {
    msg = msg + message;
  }
  toast[type](msg, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style: {
      background: toastColors[type],
      color: "#fff",
    },
  });
};

export const promiseNotification = <T>(
  promise: Promise<T>,
  options: {
    pending: string;
    success: string;
    error: string;
  } = {
    pending: "Loading...",
    success: "Success!",
    error: "Error!",
  }
) => {
  toast.promise(
    promise,
    {
      pending: options.pending,
      success: options.success,
      error: options.error,
    },
    {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    }
  );
};
