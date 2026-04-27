import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("aman@gmail.in");
  const [password, setPassword] = useState("Aman@123");
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something wend wrong");
      console.log(err?.response?.data || "something wend wrong");
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="floating-label py-5">
                  <span>Email Id</span>
                  <input
                    type="text"
                    placeholder="mail@site.com"
                    className="input input-md"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </label>
                <label className="floating-label py-5">
                  <span>Password</span>
                  <input
                    type="text"
                    placeholder="Password"
                    className="input input-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <p className="text-red-500">{error}</p>
                <button
                  onClick={handleLogin}
                  className="btn mt-4 bg-[#929cea] text-white hover:bg-[#7c86e0] border-none"
                >
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
