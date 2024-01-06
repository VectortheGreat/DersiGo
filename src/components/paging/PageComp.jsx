"use client";
import { changePageValue, selectPageValue } from "@/redux/features/paginationSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PageComp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("search");
  const pageParams = searchParams.get("page");
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);
  const users = useSelector((state) => state.user.users);
  const maxPage = Math.ceil(users?.total / limit);
  const lastPageQuery = page + 1 - maxPage;
  // console.log("users", users);
  // console.log("limit", limit);
  // console.log("page", page);
  // console.log("maxPage", maxPage);
  // console.log("lastPageQuery", lastPageQuery);
  // console.log("pageParams", pageParams);

  const changePage = (e) => {
    if (e.target.getAttribute("name") === "number") {
      dispatch(selectPageValue(e.target.textContent));
    } else {
      dispatch(
        changePageValue(
          e.target.getAttribute("name") === "previous" ? -1 : e.target.getAttribute("name") === "next" ? 1 : 0
        )
      );
    }
  };

  const pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(
      <li name="number" key={i}>
        <span
          name="number"
          className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${
            i === parseInt(pageParams)
              ? "cursor-default dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200"
              : "cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
          onClick={changePage}
        >
          {i}
        </span>
      </li>
    );
  }
  useEffect(() => {
    const pageUrl = searchQueryParams
      ? `?page=${page + 1}&limit=${limit}&search=${searchQueryParams}`
      : `?page=${page + 1}&limit=${limit}`;
    router.push(pageUrl, { scroll: false });
  }, [page]);

  return (
    <nav className="space-x-3">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li name="previous" onClick={page > 0 ? changePage : null}>
          <div
            name="previous"
            className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border border-e-0 rounded-s-lg dark:border-gray-700 dark:text-gray-400 text-gray-500  dark:bg-gray-800 ${
              page > 0
                ? " cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                : "cursor-default"
            }`}
          >
            <span name="previous" className="sr-only">
              Previous
            </span>
            <svg
              name="previous"
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                name="previous"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </div>
        </li>
        {pages}
        <li name="next" onClick={lastPageQuery < 0 ? changePage : null}>
          <span
            name="next"
            className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border rounded-e-lg dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 text-gray-500 ${
              lastPageQuery < 0
                ? "cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                : "cursor-default"
            }`}
          >
            <span name="next" className="sr-only">
              Next
            </span>
            <svg
              name="next"
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                name="next"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageComp;
