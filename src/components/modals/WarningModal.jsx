"use client";
import { togglePostEditModal, toggleUserEditModal, toggleWarningModal } from "@/redux/features/modalSlice";
import { deletePost } from "@/services/PostService";
import { deleteUser } from "@/services/UserService";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const WarningModal = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const pathName = path.split("/")[1];
  const deleteFunc = async () => {
    try {
      if (pathName === "user") {
        await deleteUser(userId);
        dispatch(toggleUserEditModal());
      } else if (pathName === "post") {
        await deletePost(userId);
        dispatch(togglePostEditModal());
      } else {
        throw new Error("Invalid Pathname");
      }
      dispatch(toggleWarningModal());
      toast.success(`The ${pathName} deleted successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push(`/${pathName}s`);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex items-center justify-center">
      <div className="relative p-4 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Are you sure about to delete the post?
            </h3>
          </div>
          {/* Modal body */}

          <div className="p-4 md:p-5">
            <div className="grid gap-2 mb-4 grid-cols-2">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                onClick={deleteFunc}
              >
                Yes
              </button>

              <button
                type="submit"
                className="text-white inline-flex items-center bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-700"
                onClick={() => dispatch(toggleWarningModal())}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
