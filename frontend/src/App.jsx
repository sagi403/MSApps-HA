import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { test } from "./store/imageSlice";

const App = () => {
  const dispatch = useDispatch();

  const { check } = useSelector(state => state.image);

  useEffect(() => {
    dispatch(test());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-4xl text-red-900 bg-blue-500">App</h1>
      {check && (
        <h1 className="text-4xl text-red-900 bg-blue-500">Redux Working</h1>
      )}
    </div>
  );
};

export default App;
