import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleConnectivityChange = () => {
  if (!navigator.onLine) {
    toast.error("You are offline!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else {
    toast.success("You are online!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

window.addEventListener("online", handleConnectivityChange);
window.addEventListener("offline", handleConnectivityChange);

export default function NoInternetToast() {
  return <ToastContainer />;
}
