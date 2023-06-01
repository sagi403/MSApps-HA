import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "./store/imageSlice";

const App = () => {
  const dispatch = useDispatch();

  const { images } = useSelector(state => state.image);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-4xl text-red-900 bg-blue-500">App</h1>
      {images && images.map(image => <h1 key={image}>{image}</h1>)}
    </div>
  );
};

export default App;
