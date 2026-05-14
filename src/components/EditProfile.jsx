import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "20");
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast,setShowToast] = useState(false);

  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, gender, photoUrl },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      },2000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center mx-10">
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-center mb-6">
                Edit Profile
              </h2>

              {/* First Name + Last Name */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>

              {/* Age + Gender */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Age"
                    className="input input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>

              {/* Photo URL */}
              <label className="form-control mb-4">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Photo URL"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              {/* About */}
              <label className="form-control mb-4">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  placeholder="Write about yourself"
                  className="textarea textarea-bordered w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={saveProfile}
                className="btn bg-[#929cea] text-white hover:bg-[#7c86e0] border-none w-full mt-4"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
     {showToast && (
       <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      </div>
     )}
    </>
  );
};

export default EditProfile;
