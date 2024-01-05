"use client";
import { selectPageValue, setLimit } from "@/redux/features/paginationSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LimitComp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);

  const changeLimit = (e) => {
    dispatch(setLimit(e.target.value));
    dispatch(selectPageValue(1));
  };

  useEffect(() => {
    router.push(`?page=${page + 1}&limit=${limit}`, { scroll: false });
  }, [limit]);

  return (
    <select
      onChange={changeLimit}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="10">10</option>

      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  );
};

export default LimitComp;
