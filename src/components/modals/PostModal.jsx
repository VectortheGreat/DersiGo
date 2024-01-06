import { useDispatch, useSelector } from "react-redux";
import WarningModal from "./WarningModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { togglePostEditModal, toggleWarningModal } from "@/redux/features/modalSlice";
import { createPost, updatePost } from "@/services/PostService";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import PostModalInput from "./modal-inputs/PostModalInput";
import { toast } from "react-toastify";

const PostModal = ({ postDetail }) => {
  const warningModal = useSelector((state) => state.modal.warningModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const postModalQuery = searchParams.get("postModal");
  const [postInfo, setPostInfo] = useState({
    image: "",
    likes: 0,
    owner: "",
    text: "",
    tags: "",
  });
  useEffect(() => {
    if (postModalQuery === "update") {
      setPostInfo((prev) => ({
        ...prev,
        image: postDetail.image,
        likes: postDetail.likes,
        owner: postDetail.owner,
        text: postDetail.text,
        tags: postDetail.tags,
      }));
    }
  }, [postModalQuery, postDetail]);

  const closeModal = () => {
    dispatch(togglePostEditModal());
    setPostInfo({
      image: "",
      likes: "",
      owner: "",
      text: "",
      tags: "",
    });
    router.replace(pathName);
  };
  const onchangeFunc = (e) => {
    setPostInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };
  const submitFunc = async (e) => {
    e.preventDefault();
    try {
      if (postModalQuery === "create") {
        await createPost(
          postInfo.image,
          postInfo.likes,
          postInfo.text,
          postInfo && Array.isArray(postInfo.tags) ? postInfo.tags : postInfo.tags.split(","),
          postInfo.owner
        );
        toast.success("The post created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (postModalQuery === "update") {
        await updatePost(
          postDetail.id,
          postInfo.image,
          postInfo.likes,
          postInfo.text,
          postInfo && Array.isArray(postInfo.tags) ? postInfo.tags : postInfo.tags.split(",")
        );
        toast.success("The post updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error("postModalQuery is not defined");
      }
      closeModal();
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
    <>
      {warningModal ? (
        <WarningModal userId={postDetail.id} />
      ) : (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-start w-full h-screen bg-black bg-opacity-50 overflow-auto"
        >
          <div className="relative p-4 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {postModalQuery === "create" ? <span>Create A New Post</span> : <span>Edit Post Informations</span>}
                </h1>
                <div className="flex items-center space-x-1">
                  <FaRegTrashAlt
                    className="cursor-pointer end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto dark:hover:bg-gray-600 dark:hover:text-white duration-300"
                    size={20}
                    onClick={() => dispatch(toggleWarningModal())}
                  ></FaRegTrashAlt>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white duration-300"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
              </div>
              {/* Modal body */}

              <form className="p-4 md:p-5" onSubmit={(e) => submitFunc(e)}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <PostModalInput onchangeFunc={onchangeFunc} postInfo={postInfo} postModalQuery={postModalQuery} />
                </div>
                {/* <div>{message && <div className="text-rose-600">{message}</div>}</div> */}
                <div className="col-span-2 flex justify-center">
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 duration-300"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
