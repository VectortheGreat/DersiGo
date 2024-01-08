"use client";
import { setLimit } from "@/redux/features/paginationSlice";
import { setPosts } from "@/redux/features/postSlice";
import { fetchAllPosts, fetchPostByTag, fetchPosts } from "@/services/PostService";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostListSkeleton from "./PostListSkeleton";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const page = useSelector((state) => state.pagination.page);
  const limit = useSelector((state) => state.pagination.limit);
  const searchParams = useSearchParams();
  const searchParamQuery = searchParams.get("search");
  const subjectParamQuery = searchParams.get("subject");
  const fetchData = async () => {
    try {
      const data = await fetchPosts(page, limit);
      dispatch(setPosts(data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const fetchAllPostData = async () => {
    try {
      if (subjectParamQuery === "post") {
        const data = await fetchAllPosts();
        const lowerCaseSearchQuery = searchParamQuery.toLowerCase();
        const filterSearch = data.filter((post) => post.text.toLowerCase().includes(lowerCaseSearchQuery));
        dispatch(setLimit(50));
        dispatch(setPosts({ data: filterSearch, total: filterSearch.length }));
      } else if (subjectParamQuery === "tag") {
        const data = await fetchPostByTag(searchParamQuery, page);
        dispatch(setLimit(50));
        dispatch(setPosts({ data: data.data, total: data.total }));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (searchParamQuery) {
      fetchAllPostData();
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchParams]);
  if (!posts || posts.page !== page) return <PostListSkeleton />;

  return posts.data.map((post, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <Link href={`/post/${post.id}`}>
          <Image
            src={post.image}
            alt={post.text}
            width={50}
            height={50}
            className="object-cover w-12 h-12 rounded-full"
          />
        </Link>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-sky-600"
      >
        <Link href={`/post/${post.id}`}>{post.text}</Link>
      </th>
      <td className="px-6 py-4">{post.likes}</td>
      <td className="px-6 py-4 text-right">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex mx-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800"
          >
            {tag}
          </span>
        ))}
      </td>
    </tr>
  ));
};

export default PostList;
