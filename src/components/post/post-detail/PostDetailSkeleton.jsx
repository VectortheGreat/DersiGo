const PostDetailSkeleton = () => {
  const spans = ["Likes", "Publish Date", "Link"];
  return (
    <div className="flex-col lg:flex-row text-white">
      <div className="flex justify-center">
        <div className="w-3/6 h-full bg-gray-500"></div>
      </div>
      <div className="lg:flex flex-col justify-center px-4 lg:ml-8 lg:w-full mt-4 lg:mt-3">
        <div className="lg:flex justify-between items-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-400">Loading...</span>
          </h2>
          <div className="bg-gray-700 text-white py-2 px-4 rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="flex space-x-1">
            <div className="w-16 h-4 bg-gray-500 rounded-full"></div>
            <div className="w-16 h-4 bg-gray-500 rounded-full"></div>
          </div>
          {spans.map((span, index) => (
            <p key={index} className="mr-4">
              <span className="font-bold">{span}: </span>
              <span className="text-gray-400">Loading...</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
