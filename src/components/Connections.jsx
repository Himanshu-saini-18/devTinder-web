import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",

        { withCredentials: true },
      );

      dispatch(addConnnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connection Found!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl  text-white">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, age, about, photoUrl, gender } =
          connection;

        return (
          <div key={_id} className=" m-4 p-4  rounded-lg bg-base-200 flex w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
