import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getImages, resetStatus } from "../store/imageSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategoryModal from "../components/CategoryModal";
import ItemModal from "../components/ItemModal";

const Homepage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const pageUrl = +new URLSearchParams(location.search).get("pageNumber") || 1;
  const categoryUrl =
    new URLSearchParams(location.search).get("category") || "category";

  const [currentPage, setCurrentPage] = useState(pageUrl);
  const [category, setCategory] = useState(categoryUrl);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemId, setItemId] = useState("");

  const { images, loading, error } = useSelector(state => state.image);

  useEffect(() => {
    dispatch(getImages({ page: currentPage, category }));
    navigate(`/?pageNumber=${currentPage}&category=${category}`);

    return () => dispatch(resetStatus());
  }, [navigate, dispatch, currentPage, category]);

  const handleNext = () => {
    if (images?.urls.length === 9) {
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
        <button
          onClick={() => setShowCategoryModal(true)}
          className="btn"
          type="button"
        >
          Category
        </button>
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
          {images?.urls &&
            images?.urls.map(image => (
              <div key={image.id} className="w-full h-64">
                <img
                  src={image.url}
                  alt={image.url}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => {
                    setShowItemModal(true);
                    setItemId(image.id);
                  }}
                />
              </div>
            ))}
        </div>
      )}
      {showCategoryModal && (
        <CategoryModal
          show={showCategoryModal}
          onHide={() => setShowCategoryModal(false)}
          onCategoryPick={category => {
            setCategory(category);
            setCurrentPage(1);
          }}
        />
      )}
      {showItemModal && (
        <ItemModal
          show={showItemModal}
          onHide={() => setShowItemModal(false)}
          itemId={itemId}
        />
      )}
    </div>
  );
};

export default Homepage;
