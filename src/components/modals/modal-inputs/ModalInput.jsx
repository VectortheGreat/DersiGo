import { inputTypes } from "@/utils/inputTypes";

const ModalInput = ({ onchangeFunc, userInfo, userModalQuery }) => {
  return inputTypes.map((input, index) => {
    if (input.name === "email" && userModalQuery === "update") {
      return null;
    }
    return (
      <div key={index} className={input.col === 2 ? "col-span-2 sm:col-span-1" : "col-span-1 sm:col-span-2"}>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {input.label}
        </label>
        {input.type === "select" ? (
          <select
            name={input.name}
            id={input.id}
            onChange={(e) => onchangeFunc(e)}
            value={userInfo[input.name]}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            {input.options.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={input.type}
            name={input.name}
            id={input.id}
            value={userInfo[input.name]}
            onChange={(e) => onchangeFunc(e)}
            placeholder={input.placeholder}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required={input.required ? true : false}
          />
        )}
      </div>
    );
  });
};

export default ModalInput;
