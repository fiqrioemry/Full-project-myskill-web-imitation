import toast from "react-hot-toast";

export async function toastMessage(success, message) {
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
}
