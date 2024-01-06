"use client";
import { toggleUserEditModal } from "@/redux/features/modalSlice";
import { IoPersonAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import EditUserModal from "./modals/EditUserModal";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const CaptionComp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const pathName = path.split("/")[1];
  const userModal = useSelector((state) => state.modal.userEditModal);
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);
  const openModal = () => {
    dispatch(toggleUserEditModal());
    router.push("?userModal=create");
  };
  const [searchInput, setSearchInput] = useState("");
  const submitSearch = (e) => {
    e.preventDefault();
    router.push(`?page=${page + 1}&limit=${limit}&search=${searchInput}`, { scroll: false });
  };

  return (
    <div className="flex justify-between">
      {userModal && <EditUserModal />}
      <div>
        <span>All {pathName}</span>
        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All {pathName} from Database</p>
      </div>
      <div className="flex space-x-4 items-center">
        <IoPersonAddOutline className="w-8 h-8 hover:text-sky-800 duration-300 cursor-pointer" onClick={openModal} />
        <form onSubmit={(e) => submitSearch(e)}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Search ${pathName}`}
              onChange={(e) => setSearchInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptionComp;
