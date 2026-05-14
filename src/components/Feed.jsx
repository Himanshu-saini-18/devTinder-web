import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";
const Feed = () => {
;
  const dispatch = useDispatch();

  const { feed, loading, error } = useSelector((store) => store.feed);
  useEffect(() => {
    if (!feed) {
      dispatch(fetchFeed());
    }
  }, [dispatch, feed]);

  if(loading){
    return(
      <h1 className="flex justify-center mt-10">
        Loading Feed...
      </h1>
    )
  }
  if(error){
    return (
      <h1 className="flex justify-center mt-10 text-red-500">
        {error}
      </h1>
    );
  }

  if (!feed) return null;
  if (feed.length <= 0)
    return <h1 className="flex justify-center mx-10 mt-3">No New Users Founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center mx-10 mt-3 ">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
