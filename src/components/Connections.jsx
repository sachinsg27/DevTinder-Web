import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.Connections);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      setError(null); // clear previous error
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex justify-center items-center">
        <p className="text-red-400 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="text-white text-center mt-6">No Connections Found!</h1>
    );

  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">
        Connections
      </h1>

      <div className="flex flex-col gap-6 items-center">
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, about, photoUrl, _id } =
            connection;

          return (
            <div
              key={_id}
              className="flex bg-[#1E293B] text-white p-4 rounded-lg shadow w-full max-w-3xl"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-36 h-36 object-cover rounded-lg mr-6"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-1">
                  {firstName} {lastName}
                </h2>

                {(age || gender) && (
                  <p className="text-sm text-gray-300 mb-1">
                    {age + " " + gender}
                  </p>
                )}

                <p className="text-sm text-gray-400">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
