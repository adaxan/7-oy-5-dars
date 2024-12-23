import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/counterSlice";

function Home() {
  const counter = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  function handleIncrement() {
    dispatch(increment(1));
  }

  function handleDecrement() {
    dispatch(decrement(1));
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Counter: {counter}</h2>
      <div className="flex space-x-4">
        <button
          onClick={handleIncrement}
          className="btn btn-warning"
        >
          Increment
        </button>
        <button
          onClick={handleDecrement}
          className="btn btn-secondary"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Home;