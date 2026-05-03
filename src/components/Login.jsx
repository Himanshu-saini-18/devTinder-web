import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("aman@gmail.in");
  const [password, setPassword] = useState("Aman@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-slate-800 text-slate-100">
      <div className="relative isolate px-6 py-12 lg:px-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(131,58,180,0.45),_transparent_50%)] opacity-80" />
        <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex rounded-full bg-violet-500/15 px-4 py-1 text-sm font-semibold text-violet-200 ring-1 ring-violet-300/20">
              Welcome back to DevTinder
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Your next match is just a login away.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Sign in to explore curated profiles, connect instantly, and discover meaningful conversations with people who share your vibe.
            </p>
            <div className="grid max-w-xl gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_-40px_rgba(99,102,241,0.65)]">
                <p className="text-sm text-slate-400">Fast login</p>
                <p className="mt-2 text-xl font-semibold text-white">Secure auth with cookies</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_-40px_rgba(79,70,229,0.5)]">
                <p className="text-sm text-slate-400">Designed for matches</p>
                <p className="mt-2 text-xl font-semibold text-white">Polished UI, instant feel</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-violet-500/20 backdrop-blur-xl ring-1 ring-white/10">
              <div className="mb-8 space-y-2 text-center">
                <h2 className="text-3xl font-semibold text-white">Log in to continue</h2>
                <p className="text-sm text-slate-300">Enter your account details and get back to your connections.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block space-y-2 text-sm">
                  <span className="font-medium text-slate-200">Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </label>
                <label className="block space-y-2 text-sm">
                  <span className="font-medium text-slate-200">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <a href="#" className="font-medium text-violet-200 hover:text-white">Forgot password?</a>
                  <span className="text-slate-400">Need help?</span>
                </div>
                {error && <p className="rounded-2xl bg-rose-500/15 px-4 py-3 text-sm text-rose-200 ring-1 ring-rose-500/20">{error}</p>}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-violet-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-violet-400"
                >
                  Login
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-400">
                New here? <a href="#" className="font-semibold text-white hover:text-violet-200">Create an account</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
