import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getImages, resetStatus } from "../store/imageSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Homepage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const page = +new URLSearchParams(location.search).get("pageNumber") || 1;

  const [currentPage, setCurrentPage] = useState(page);

  const { images, loading, error } = useSelector(state => state.image);

  useEffect(() => {
    dispatch(getImages(currentPage));
    navigate(`/?pageNumber=${currentPage}`);

    return () => dispatch(resetStatus());
  }, [navigate, dispatch, currentPage]);

  const handleNext = () => {
    if (images.length === 9) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="m-6">
      <div className="flex justify-between my-5">
        <button onClick={handlePrev} className="btn">
          Prev
        </button>
        <button className="btn">Category</button>
        <button onClick={handleNext} className="btn">
          Next
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images &&
            images.map(image => (
              <div key={image.id} className="w-full h-64">
                <img
                  src={image.url}
                  alt={image.url}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
