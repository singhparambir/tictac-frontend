import React from "react";
import { createCheckoutSession } from "../services/stripeService";

const StartPage = () => {

 const handleStart = async () => {
    try {
      const { url } = await createCheckoutSession();
      window.location.href = url; 
    } catch (error) {
      console.error("Error starting game checkout:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Tic Tac Toe
        </h1>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-semibold px-10 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartPage;
