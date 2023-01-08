import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import axios from "axios";
import Form from "./components/Form";
import Table from "./components/Table";
import AddStateForm from "./components/AddStateForm";

function App() {
  const [customers, setCustomers] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/data");
      setCustomers(result.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/states");
      setStates(result.data.states);

      console.log(states);
    };
    fetchData();
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl">
              <Link to="/">My App</Link>
            </div>
            <Link
              className="px-4 py-2 font-bold text-white bg-purple-700 rounded-full"
              to="/add-state"
            >
              Add State
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto max-w-4xl pt-8">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Form states={states} />
                <Table customers={customers} />
              </>
            }
          />
          <Route path="/add-state" exact element={<AddStateForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
