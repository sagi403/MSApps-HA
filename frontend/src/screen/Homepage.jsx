import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../store/imageSlice";

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const { images } = useSelector(state => state.image);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  const handleNext = () => {
    if (images.length === 9) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
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
    </div>
  );
};

export default Homepage;
