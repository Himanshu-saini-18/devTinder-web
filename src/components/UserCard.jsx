import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const [loadingStatus, setLoadingStatus] = useState(null);
  const [error, setError] = useState("");

  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      setLoadingStatus(status);
      setError("");

      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Something Went Wrong"
      );
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <div className="card bg-base-300 w-80 min-h-[520px] shadow-sm mx-10">
      <figure>
        <img
          className="w-full h-80 object-cover"
          src={photoUrl || "https://via.placeholder.com/300"}
          alt={`${firstName || "User"} Profile`}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {age && gender && <p>{age} , {gender}</p>}

        <p>{about}</p>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-soft btn-error"
            disabled={loadingStatus !== null}
            onClick={() => handleSendRequest("ignored", _id)}
          >
            {loadingStatus === "ignored" ? "Ignoring..." : "Ignore"}
          </button>

          <button
            className="btn btn-soft btn-success"
            disabled={loadingStatus !== null}
            onClick={() => handleSendRequest("interested", _id)}
          >
            {loadingStatus === "interested" ? "Sending..." : "Interested"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;