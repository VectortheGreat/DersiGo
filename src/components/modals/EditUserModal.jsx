"use client";
import { toggleUserEditModal, toggleWarningModal } from "@/redux/features/modalSlice";
import { createUser, updateUser } from "@/services/UserService";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ModalInput from "./modal-inputs/ModalInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import WarningModal from "./WarningModal";

const EditUserModal = ({ userDetail }) => {
  const warningModal = useSelector((state) => state.modal.warningModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const userModalQuery = searchParams.get("userModal");
  const [userInfo, setUserInfo] = useState({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    picture: "",
  });
  useEffect(() => {
    if (userModalQuery === "update") {
      setUserInfo((prev) => ({
        ...prev,
        title: userDetail.title,
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        gender: userDetail.gender,
        email: userDetail.email,
        dateOfBirth: userDetail.dateOfBirth.split("T")[0],
        phone: userDetail.phone,
        picture: userDetail.picture,
      }));
    }
  }, [userModalQuery, userDetail]);

  const closeModal = () => {
    dispatch(toggleUserEditModal());
    setUserInfo({
      title: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      dateOfBirth: "",
      phone: "",
      picture: "",
    });
    router.replace(pathName);
  };
  const onchangeFunc = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };
  const submitFunc = async (e) => {
    e.preventDefault();
    try {
      if (userModalQuery === "create") {
        await createUser(
          userInfo.firstName,
          userInfo.lastName,
          userInfo.email,
          userInfo.phone,
          userInfo.gender,
          userInfo.title,
          userInfo.picture,
          userInfo.dateOfBirth
        );
        toast.success("The user created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (userModalQuery === "update") {
        await updateUser(
          userDetail.id,
          userInfo.firstName,
          userInfo.lastName,
          userInfo.phone,
          userInfo.gender,
          userInfo.title,
          userInfo.picture,
          userInfo.dateOfBirth
        );
        toast.success("The user updated successfully", {
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
        throw new Error("userModalQuery is not defined");
      }
      closeModal();
    } catch (error) {
      console.error(error);
      Object.values(error.response.data.data).forEach((value) => {
        toast.error(value, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
  };
  return (
    <>
      {warningModal ? (
        <WarningModal userId={userDetail.id} />
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
                  {userModalQuery === "create" ? <span>Create A New User</span> : <span>Edit User Informations</span>}
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
                  <ModalInput onchangeFunc={onchangeFunc} userInfo={userInfo} userModalQuery={userModalQuery} />
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

export default EditUserModal;
