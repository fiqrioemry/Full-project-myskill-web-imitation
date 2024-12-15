import toast from "react-hot-toast";

export async function toastMessage(success, message) {
  if (success) {
    toast.success(message);
  } else if (message) {
    toast.error(message);
  } else {
    return null;
  }
}
