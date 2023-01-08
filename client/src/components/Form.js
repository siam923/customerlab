import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form({ states }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    postcode: "",
    // state: "",
    errors: [],
  });
  const navigate = useNavigate();

  const checkState = (postcode) => {
    for (let i = 0; i < states.length; i++) {
      if (states[i].postcode === postcode) {
        return true;
      }
    }
    return false;
  };

  const { name, dob, address, postcode, errors } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkState(postcode)) {
      try {
        const result = await axios.post("http://localhost:8000/api/submit", {
          name,
          dob,
          address,
          postcode,
        });
        window.location.reload();
      } catch (err) {
        console.error(err.response.data.errors);
        setFormData({ ...formData, errors: err.response.data.errors });
      }
    } else {
      alert("The postcode is not available. Pleas add state from the navbar");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dob"
        >
          DOB
        </label>
        <input
          name="dob"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dob"
          type="date"
          value={dob}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address"
        >
          Address
        </label>
        <input
          name="address"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          value={address}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="postcode"
        >
          Postcode
        </label>
        <input
          name="postcode"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="postcode"
          type="text"
          value={postcode}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save data
        </button>
      </div>
      {errors.length > 0 && (
        <div>
          <p>Errors:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default Form;
