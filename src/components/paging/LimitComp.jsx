"use client";
import { setLimit } from "@/redux/features/paginationSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const LimitComp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const limitQuery = searchParams.get("limit");

  const changeLimit = (e) => {
    router.push(`?limit=${e.target.value}`);
    dispatch(setLimit(e.target.value));
  };
  return (
    <select onChange={changeLimit}>
      <option value="10">10</option>
      <option value="20" selected>
        20
      </option>
      <option value="50">50</option>
    </select>
  );
};

export default LimitComp;
