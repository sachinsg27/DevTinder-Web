import React, { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setSuccess("✅ Profile updated successfully!");

      // Auto-clear success after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
        {/* Edit Form */}
        <div className="w-full md:max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-5">
          <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
            Edit Profile
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <label
                htmlFor="firstName"
                className="w-28 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <label
                htmlFor="lastName"
                className="w-28 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Photo URL */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <label
                htmlFor="photoUrl"
                className="w-28 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <label
                htmlFor="age"
                className="w-28 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <label
                htmlFor="gender"
                className="w-28 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* About */}
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
              <label
                htmlFor="about"
                className="w-28 text-sm font-medium text-gray-700 dark:text-gray-200 pt-1"
              >
                About
              </label>
              <textarea
                id="about"
                rows="3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Write something about yourself..."
              ></textarea>
            </div>

            {/* Notifications */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">{success}</p>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        <div className="w-full md:max-w-sm">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
