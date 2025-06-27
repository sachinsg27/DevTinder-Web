import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.Requests);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      setError(null); // clear previous error if any
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to load requests. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex justify-center items-center">
        <p className="text-red-400 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!requests) return null;

  if (requests.length === 0)
    return <h1 className="text-white text-center mt-6">No Requests Found!</h1>;

  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-6 items-center">
        {requests.map((request) => {
          const { fromUserId, _id } = request;
          const { firstName, lastName, age, gender, about, photoUrl } =
            fromUserId || {};

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row bg-[#1E293B] text-white p-4 rounded-lg shadow w-full max-w-3xl"
            >
              <div className="flex justify-center sm:justify-start">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg"
                />
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col justify-center text-center sm:text-left">
                <h2 className="text-2xl font-semibold mb-1">
                  {firstName} {lastName}
                </h2>

                {(age || gender) && (
                  <p className="text-sm text-gray-300 mb-1">
                    {age + " " + gender}
                  </p>
                )}

                <p className="text-sm text-gray-400">{about}</p>

                <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                  <button className="btn bg-green-600 hover:bg-green-700 text-white btn-sm sm:btn-md">
                    Accept
                  </button>
                  <button className="btn bg-red-600 hover:bg-red-700 text-white btn-sm sm:btn-md">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
