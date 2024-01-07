"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserEditModal } from "@/redux/features/modalSlice";
import EditUserModal from "../modals/EditUserModal";
import { useRouter } from "next/navigation";
import { fetchPostByUser } from "@/services/PostService";
import { useEffect, useState } from "react";
import UserDetailPostTable from "./UserDetailPostTable";

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
      console.log(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    fetchUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="flex flex-col lg:flex-row text-white">
        {modal && <EditUserModal userDetail={userDetail} />}
        <div className="flex-shrink-0 md:w-1/4">
          <Image
            src={userDetail.picture}
            alt={userDetail.firstName}
            width={190}
            height={190}
            className="object-contain mx-auto h-full"
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
            <p className="mr-4">
              <span className="font-bold">E-mail: </span>
              <span className="text-gray-400">{userDetail.email}</span>
            </p>
            <p>
              <span className="font-bold">Gender: </span>
              <span className="text-gray-400">{userDetail.gender}</span>
            </p>
            <p>
              <span className="font-bold">Birth Date: </span>
              <span className="text-gray-400">{userDetail.dateOfBirth}</span>
            </p>
            <p>
              <span className="font-bold">Phone: </span>
              <span className="text-gray-400">{userDetail.phone}</span>
            </p>
            <p>
              <span className="font-bold">Register Date: </span>
              <span className="text-gray-400">{userDetail.registerDate}</span>
            </p>
            <p>
              <span className="font-bold">Last Update: </span>
              <span className="text-gray-400">{userDetail.updatedDate}</span>
            </p>

            <p className="text-white mb-6">
              <span className="font-bold">Location: </span>
              <span className="text-gray-400">
                {userDetail.location.street}, {userDetail.location.city}, {userDetail.location.state},
                {userDetail.location.country}
              </span>
            </p>
          </div>
        </div>
      </div>
      {userPosts.length !== 0 && (
        <div>
          <h1>
            {userDetail.firstName} {userDetail.lastName}'s Posts
          </h1>
          <UserDetailPostTable userPosts={userPosts} />
        </div>
      )}
    </div>
  );
};

export default UserDetailComp;
