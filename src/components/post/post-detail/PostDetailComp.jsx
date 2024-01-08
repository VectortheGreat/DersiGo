"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import PostModal from "../../modals/PostModal";
import { togglePostEditModal } from "@/redux/features/modalSlice";
import { useEffect, useState } from "react";
import { fetchPost } from "@/services/PostService";

const PostDetailComp = ({ paramsId }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.postEditModal);
  const [postDetail, setPostDetail] = useState({});
  const publishDate = postDetail?.publishDate?.split("T")[0];
  const publishHour = postDetail?.publishDate?.split("T")[1].split(".")[0];
  const [triggerFetchUserDetail, setTriggerFetchUserDetail] = useState(false);
  const router = useRouter();
  const openModal = () => {
    dispatch(togglePostEditModal());
    router.push("?postModal=update");
  };
  const onSubmitSuccess = () => {
    setTriggerFetchUserDetail(true);
  };
  const fetchPostDetail = async () => {
    const data = await fetchPost(paramsId);
    setPostDetail(data);
  };
  useEffect(() => {
    fetchPostDetail();
    setTriggerFetchUserDetail(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFetchUserDetail]);
  return (
    <div className=" flex-col lg:flex-row text-white">
      {modal && <PostModal postDetail={postDetail} onSubmitSuccess={onSubmitSuccess} />}
      <div className="flex justify-center">
        {postDetail.image ? (
          <Image src={postDetail.image} alt={postDetail.text} width={100} height={100} className=" w-3/6 h-full" />
        ) : (
          <Image
            src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png"
            alt={postDetail?.firstName}
            width={400}
            height={400}
            className="object-contain mx-auto h-full rounded-md"
          />
        )}
      </div>
      <div className="lg:flex flex-col justify-center px-4 lg:ml-8 lg:w-full mt-4 lg:mt-3">
        <div className="lg:flex justify-between items-start">
          <h2 className="text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-400">{postDetail.text}</span>
          </h2>
          <button
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-500 duration-500"
            onClick={openModal}
          >
            Düzenle
          </button>
        </div>
        <div className="space-y-5">
          <div className="flex justify-start space-x-3 mt-3">
            <Link href={`/user/${postDetail.owner?.id}`} className="hover:text-sky-600">
              Posted by {postDetail.owner?.firstName}
            </Link>
            <div>
              {postDetail.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex mx-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="mr-4">
            <span className="font-bold">Likes: </span>
            <span className="text-gray-400">{postDetail?.likes}</span>
          </p>
          <p>
            <span className="font-bold">Publish Date: </span>
            <span className="text-gray-400">
              {publishDate} / {publishHour}
            </span>
          </p>
          {postDetail?.link && (
            <p>
              <span className="font-bold">Link: </span>
              <Link href={postDetail?.link} className="text-gray-400 hover:text-sky-600" target="_blank">
                {postDetail?.link}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailComp;
