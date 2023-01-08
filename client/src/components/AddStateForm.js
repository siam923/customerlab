import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddStateForm() {
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make POST request to /api/state endpoint
    console.log(state, postcode);
    axios
      .post("http://localhost:8000/api/state", {
        state,
        postcode,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/"); // redirect to home page
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="state"
          >
            State:
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="postcode"
          >
            Postcode:
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="postcode"
            value={postcode}
            onChange={(event) => setPostcode(event.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add State
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddStateForm;
