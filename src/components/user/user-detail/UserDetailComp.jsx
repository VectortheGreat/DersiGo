"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserEditModal } from "@/redux/features/modalSlice";
import UserModal from "../../modals/UserModal";
import { useRouter } from "next/navigation";
import { fetchPostByUser } from "@/services/PostService";
import { useEffect, useState } from "react";
import UserDetailPostTable from "./UserDetailPostTable";
import UserDetailPostTableSkeleton from "./UserDetailPostTableSkeleton ";
import { userDetailTypes } from "@/types/userDetailTypes";

const UserDetailComp = ({ userDetail }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.userEditModal);
  const router = useRouter();
  const [userPosts, setUserPosts] = useState([]);
  const openModal = () => {
    dispatch(toggleUserEditModal());
    router.push("?userModal=update");
  };
  const fetchUserPosts = async () => {
    try {
      const data = await fetchPostByUser(userDetail.id);
      setUserPosts(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    fetchUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  Object.values(userDetail.location).map((location, index) => {
    console.log(index, location);
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row text-white bg-gray-800 rounded-md p-6">
        {modal && <UserModal userDetail={userDetail} />}
        <div className="flex-shrink-0 md:w-1/4">
          <Image
            src={userDetail.picture}
            alt={userDetail.firstName}
            width={400}
            height={400}
            className="object-contain mx-auto h-full rounded-md"
          />
        </div>
        <div className="lg:flex flex-col justify-center px-4 lg:ml-8 lg:w-full mt-4 lg:mt-0">
          <div className="lg:flex justify-between items-center mb-3">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gray-400">
                {userDetail.title.toUpperCase()} {userDetail.firstName} {userDetail.lastName}
              </span>
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
            {userDetailTypes.map((type, index) => (
              <p key={index} className="mr-4">
                <span className="font-bold">{type.label}</span>
                <span className="text-gray-400">
                  {type.isDate && userDetail[type?.name] ? userDetail[type.name].split("T")[0] : userDetail[type.name]}
                </span>
              </p>
            ))}

            <p className="text-white mb-6">
              <span className="font-bold">Location: </span>
              {Object.values(userDetail).map((value, index) => (
                <span key={index} className="text-gray-400">
                  {value.street}, {value.city}, {value.state}, {value.country}, GMT{value.timezone}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {userPosts.length !== 0 ? (
        <UserDetailPostTable userPosts={userPosts} userName={userDetail.firstName} />
      ) : (
        <UserDetailPostTableSkeleton />
      )}
    </>
  );
};

export default UserDetailComp;
