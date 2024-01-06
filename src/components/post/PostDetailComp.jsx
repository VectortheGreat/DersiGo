"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import PostModal from "../modals/PostModal";
import { togglePostEditModal } from "@/redux/features/modalSlice";

const PostDetailComp = ({ postDetail }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.postEditModal);
  const publishDate = postDetail.publishDate.split("T")[0];
  const publishHour = postDetail.publishDate.split("T")[1].split(".")[0];
  const router = useRouter();
  const openModal = () => {
    dispatch(togglePostEditModal());
    router.push("?postModal=update");
  };
  return (
    <div className="flex flex-col lg:flex-row text-white">
      {modal && <PostModal postDetail={postDetail} />}
      <div className="flex-shrink-0 md:w-1/4">
        <Image
          src={postDetail.image}
          alt={postDetail.text}
          width={500}
          height={500}
          className="rounded-lg object-cover lg:h-auto"
        />
      </div>
      <div className="lg:flex flex-col justify-center px-4 lg:ml-8 lg:w-full mt-4 lg:mt-0">
        <div className="lg:flex justify-between items-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-400">{postDetail.text}</span>
          </h2>
          <div className="flex space-x-4 mt-2">
            <button
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-500 duration-500"
              onClick={openModal}
            >
              Düzenle
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {postDetail.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex mx-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800"
            >
              {tag}
            </span>
          ))}
          <p className="mr-4">
            <span className="font-bold">Likes: </span>
            <span className="text-gray-400">{postDetail.likes}</span>
          </p>
          <p>
            <span className="font-bold">Publish Date: </span>
            <span className="text-gray-400">
              {publishDate} / {publishHour}
            </span>
          </p>
          <p>
            <span className="font-bold">Link: </span>
            <Link href={postDetail.link} className="text-gray-400 hover:text-sky-600" target="_blank">
              {postDetail.link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailComp;
