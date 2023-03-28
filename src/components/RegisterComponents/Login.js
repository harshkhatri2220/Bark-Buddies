import React, { useState } from "react";
import logoWhite from "../../images/logoWhite.png";
import { FcGoogle } from 'react-icons/fc'
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setemail] = useState("");
  //   const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`email: ${email} `);
    // Handle authentication logic here
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-500 to-black text-white pt-20 ">
      <div className=" flex items-center  w-full flex-col ">
        <div className="  flex items-center justify-center mt-24 lg:my-8">
          <img className=" w-1/3 rounded-3xl sm:w-1/5 lg:w-1/6" src={logoWhite} alt="" />
        </div>

        <h1 className=" font-bold text-5xl my-10 sm:mt-4 ">Welcome!</h1>

        <div>
          <form onSubmit={handleLogin} className=" flex flex-col">
            <label className=" font-semibold ">
              Email:
              <input
                className=" border-gray-800 border-solid w-full border p-3 px-10 text-black "
                type="text"
                value={email}
                onChange={(event) => setemail(event.target.value)}
              />
            </label>
            <br />
            {/* <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <br /> */}
            <button
              type="submit"
              className=" font-semibold text-lg p-3 border rounded-md bg-green-500 text-white hover:bg-green-700 duration-150"
            >
              Continue
            </button>
          </form>
          <div className=" my-2 flex items-center justify-center">
            <p className=" text-lg">
              Don't have an account? <button className=" text-green-500 hover:text-green-800">  <Link to="/Signup"> Sign up</Link> </button>
            </p>
          </div>
          <hr className=" my-7"/>

            <div className=" flex justify-center items-center my-10">
                <button className=" text-lg font-semibold border border-gray-500 px-11 py-3 hover:border-black hover:bg-gray-500 duration-100 hover:text-black"><FcGoogle className=" inline-block mx-2  " size={25} /> Continue with Google</button>
              
            </div>

        </div>
      </div>
    </div>
  );
};

export default Login;