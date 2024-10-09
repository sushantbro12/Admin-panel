import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full max-h-screen">
        <h2 className="text-2xl font-bold">Login to account</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter your email & password to login
        </p>

        <form>
          <div>
            <label className="block font-semibold ml-3 mt-8 " htmlFor="email">
              Email Address<span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              id="email"
              className=" m-2 px-2 py-2 border rounded-lg border-gray-300 w-full"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div>
            <label className="block font-semibold ml-3" htmlFor="password">
              Password<span className="text-red-500"> *</span>
            </label>
            <input
              className=" m-2 px-2 py-2 border rounded-lg border-gray-300 w-full"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className=" w-full border bg-blue-600 text-white font-bold py-2 px-4 rounded-lg my-5 hover:text-blue-600 hover:bg-slate-100 hover:border-blue-600 "
            type="submit">
            Login
          </button>
        </form>

        <div className="flex items-center justify-center mt-4 mb-8">
          <span className="text-gray-400">Or continue with social account</span>
        </div>

        <div className="flex justify-center items-center mb-8">
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-3 hover:bg-blue-600 hover:text-white ">
            <FcGoogle size={20} />
            <span className="font-semibold">Sign in with Google</span>
          </button>
        </div>

        <p className="text-center text-gray-500">
          You don't have an account yet?
          <Link className="text-blue-500 hover:underline" to="/register">
            {" "}
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
