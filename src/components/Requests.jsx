import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
       dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) return <h1 className="flex justify-center my-10">No Request Found!</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl  text-white">Connection Requests</h1>
      {requests.map((request) => {
        
        const { _id, firstName, lastName, age, about, photoUrl, gender } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" m-4 p-4 justify-between items-center  rounded-lg bg-base-200 flex w-2/3 mx-auto"
          >
            <div>
              <img
                className="h-20 w-20 rounded-full "
                alt="photo"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button class="btn btn-outline btn-success mx-2" onClick={()=> reviewRequest("accepted",request._id)}>Accept</button>
              <button class="btn btn-outline btn-error mx-2" onClick={()=> reviewRequest("rejected",request._id)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
