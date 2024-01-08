const UserDetailSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row text-white bg-gray-800 rounded-md p-6">
      <div className="flex-shrink-0 md:w-1/4">
        <div className="w-40 h-40 bg-gray-500 rounded-md"></div>
      </div>
      <div className="lg:flex flex-col justify-center px-4 lg:ml-8 lg:w-full mt-4 lg:mt-0">
        <div className="lg:flex justify-between items-center mb-3">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-400">Loading User Data</span>
          </h2>
          <div className="flex space-x-4 mt-2">
            <div className="bg-gray-700 text-white py-2 px-4 rounded"></div>
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <p key={index} className="mr-4">
              <span className="font-bold text-gray-400">Loading...</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailSkeleton;
