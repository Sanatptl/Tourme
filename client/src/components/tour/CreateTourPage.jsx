import React, { useState } from "react";
import axios from "axios";

function CreateTourPage() {
  const [tourData, setTourData] = useState({
    name: "",
    duration: "",
    maxGroupSize: "",
    difficulty: "",
    summary: "",
    description: "",
    imageCover: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to save the tour data
    axios
      .post("/api/tours", tourData)
      .then((response) => {
        console.log("Tour created:", response.data);
        // Reset form fields
        setTourData({
          name: "",
          duration: "",
          maxGroupSize: "",
          difficulty: "",
          summary: "",
          description: "",
          imageCover: "",
          price: "",
        });
      })
      .catch((error) => {
        console.error("Failed to create tour:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-[65vh]">
      <div className="bg-gradient-to-br from-[#7dd56f] to-[#28b487] h-full w-1/4 absolute left-0 top-0 z-[-1]"></div>
      <h1 className="text-2xl font-bold mb-4 text-center text-[2.5em] text-[#55c57a]">
        Create Tour
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg my-12 sm:max-w-[80%] mx-auto flex flex-col gap-x-5 sm:grid sm:grid-cols-2 sm:content-between relative"
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Tour Name"
            value={tourData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input placeholder:text-2xl placeholder:text-"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="duration"
            placeholder="Duration (in days)"
            value={tourData.duration}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input "
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="maxGroupSize"
            placeholder="Max Group Size"
            value={tourData.maxGroupSize}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input "
          />
        </div>
        <div className="mb-4">
          <select
            name="difficulty"
            value={tourData.difficulty}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>
        <div className="mb-4">
          <textarea
            name="summary"
            placeholder="Summary"
            value={tourData.summary}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input"
          ></textarea>
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Description"
            value={tourData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input"
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="imageCover"
            placeholder="Image Cover URL"
            value={tourData.imageCover}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={tourData.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded py-2 px-3 my-input"
          />
        </div>

        <div className="text-center sm:col-start-2 sm:col-end-2 sm:place-self-end sm:mr-6 ">
          <button
            type="submit"
            className="bg-[#55c57a] hover:bg-blue-600 text-white text-2xl font-bold py-5 px-10 rounded"
          >
            Create Tour
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTourPage;
