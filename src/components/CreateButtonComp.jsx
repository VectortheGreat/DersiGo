"use client";
import { toggleUserEditModal } from "@/redux/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import EditUserModal from "./modals/EditUserModal";
import { useRouter } from "next/navigation";

const CreateButtonComp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userModal = useSelector((state) => state.modal.userEditModal);
  const openModal = () => {
    dispatch(toggleUserEditModal());
    router.push("?userModal=create");
  };
  return (
    <div className="flex justify-between">
      {userModal && <EditUserModal />}
      <div>
        <span>All users</span>
        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All users from Database</p>
      </div>
      <p className="hover:text-sky-800 duration-300 cursor-pointer text-sm lg:text-lg" onClick={openModal}>
        Add New User
      </p>
    </div>
  );
};

export default CreateButtonComp;
