"use client";
import { setPage } from "@/redux/features/paginationSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const PageComp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.pagination.limit);
  const users = useSelector((state) => state.user.users);
  console.log(users?.data);
  const maxPage = Math.ceil(users?.data?.length / limit);

  const changePage = (e) => {
    router.push(`?page=${e.target.textContent}`);
    dispatch(setPage(e.target.textContent));
  };

  const pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(
      <span key={i} className="cursor-pointer hover:text-sky-600" onClick={changePage}>
        {i}
      </span>
    );
  }
  return <div className="space-x-3">{pages}</div>;
};

export default PageComp;
