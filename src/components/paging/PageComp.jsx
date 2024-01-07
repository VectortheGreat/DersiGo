"use client";
import { changePageValue, selectPageValue } from "@/redux/features/paginationSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PageComp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const path = usePathname();
  const pathName = path.split("/")[1];
  const searchQueryParams = searchParams.get("search");
  const subjectQueryParams = searchParams.get("subject");
  const pageParams = searchParams.get("page");
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);
  const users = useSelector((state) => state.user.users);
  const posts = useSelector((state) => state.post.posts);
  const [maxPage, setMaxPage] = useState(0);
  const [lastPageQuery, setLastPageQuery] = useState(0);

  useEffect(() => {
    if (pathName === "users") {
      setMaxPage(Math.ceil(users?.total / limit));
      setLastPageQuery(page + 1 - maxPage);
    } else if (pathName === "posts") {
      setMaxPage(Math.ceil(posts?.total / limit));
      setLastPageQuery(page + 1 - maxPage);
    }
  }, [pathName, posts, users]);
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
  const maxPagesToShow = 5;
  const start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const end = Math.min(maxPage, start + maxPagesToShow - 1);
  for (let i = start; i <= end; i++) {
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
      ? `?page=${page + 1}&limit=${limit}&search=${searchQueryParams}&subject=${subjectQueryParams}`
      : `?page=${page + 1}&limit=${limit}`;
    router.push(pageUrl, { scroll: false });
  }, [page, limit, router, searchQueryParams, subjectQueryParams]);

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
