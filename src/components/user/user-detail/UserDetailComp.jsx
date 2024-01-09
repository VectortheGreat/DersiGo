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
import { fetchUser } from "@/services/UserService";

const UserDetailComp = ({ paramsId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  //* States
  const [userPosts, setUserPosts] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [userDetail, setUserDetail] = useState({});
  const [triggerFetchUserDetail, setTriggerFetchUserDetail] = useState(false);
  const modal = useSelector((state) => state.modal.userEditModal);

  const openModal = () => {
    dispatch(toggleUserEditModal());
    router.push("?userModal=update");
  };

  const onSubmitSuccess = () => {
    setTriggerFetchUserDetail(true);
  };

  const fetchUserPosts = async () => {
    try {
      const data = await fetchPostByUser(paramsId);
      setUserPosts(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const fetchUserDetail = async () => {
    const data = await fetchUser(paramsId);
    setUserDetail(data);
  };
  useEffect(() => {
    fetchUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchUserDetail();
    setTriggerFetchUserDetail(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFetchUserDetail]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row text-white bg-gray-800 rounded-md p-6">
        {modal && <UserModal userDetail={userDetail} onSubmitSuccess={onSubmitSuccess} />}
        <div className="flex-shrink-0 md:w-1/4">
          {userDetail.picture ? (
            <Image
              src={userDetail.picture}
              alt={userDetail.firstName}
              width={400}
              height={400}
              className="object-contain mx-auto h-full rounded-md"
            />
          ) : (
            <Image
              src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png"
              alt={userDetail.firstName}
              width={400}
              height={400}
              className="object-contain mx-auto h-full rounded-md"
            />
          )}
        </div>

        {/* User Detail Body */}
        <div className="lg:flex flex-col justify-center px-4 lg:ml-8 lg:w-full mt-4 lg:mt-0">
          <div className="lg:flex justify-between items-center mb-3">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gray-400">
                {userDetail?.title?.toUpperCase()} {userDetail.firstName} {userDetail.lastName}
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
            {userDetailTypes.map(
              (type, index) =>
                userDetail[type.name] && (
                  <p key={index} className="mr-4">
                    <span className="font-bold">{type.label}</span>
                    <span className="text-gray-400">
                      {type.isDate && userDetail[type?.name]
                        ? userDetail[type.name].split("T")[0]
                        : userDetail[type.name]}
                    </span>
                  </p>
                )
            )}
            {userDetail.location && (
              <p className="text-white mb-6">
                <span className="font-bold">Location: </span>
                {Object.values(userDetail).map((value, index) => {
                  if (value && value.street) {
                    const locationValues = [
                      value.street,
                      value.city,
                      value.state,
                      value.country,
                      `GMT${value.timezone}`,
                    ].filter(Boolean);
                    const locationString = locationValues.join(", ");
                    return (
                      <span key={index} className="text-gray-400">
                        {locationString}
                      </span>
                    );
                  }
                  return null;
                })}
              </p>
            )}
          </div>
        </div>
      </div>
      {showSkeleton ? (
        <UserDetailPostTableSkeleton />
      ) : (
        <UserDetailPostTable userPosts={userPosts} userName={userDetail.firstName} />
      )}
    </>
  );
};

export default UserDetailComp;
