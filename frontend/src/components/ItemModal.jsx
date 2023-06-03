import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageDetails } from "../store/imageSlice";
import Loader from "./Loader";
import Message from "./Message";

const ItemModal = ({ show, onHide, itemId }) => {
  const dispatch = useDispatch();

  const { imageDetails, loadingDetails, errorDetails } = useSelector(
    state => state.image
  );

  useEffect(() => {
    dispatch(getImageDetails(itemId));
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        show ? "" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="category-modal"
            onClick={onHide}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Details on the image
            </h3>

            <ul className="mb-4 overflow-x-auto">
              {loadingDetails ? (
                <Loader />
              ) : errorDetails ? (
                <Message message="There are no available details on this image " />
              ) : (
                Object.entries(imageDetails).map(([key, value], index) => (
                  <li key={index} className="whitespace-nowrap">
                    <span className="underline">{`${key}`}</span>
                    {`: ${value}`}
                  </li>
                ))
              )}
            </ul>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onHide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  itemId: PropTypes.number,
};

export default ItemModal;
