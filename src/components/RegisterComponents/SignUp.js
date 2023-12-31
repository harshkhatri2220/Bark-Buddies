import React, { useEffect, useState } from "react";
import logoWhite from "../../images/logoWhite.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../database/firebase-config";
import { setDoc,getDoc, doc, Timestamp } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState();

  
  const register = async () => {

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (userDetail) => {

          await setDoc(doc(db, "profiles", userDetail.user.uid), {
            name: userName ? userName : userDetail.user.displayName,
            email: email ? email : null,
            photoURL: userDetail.user.photoURL? userDetail.user.photoURL : null,
            phone: phone ? phone : null ,
            userId : userDetail.user.uid,
            created: Timestamp.now(),

          }).then( async () => {

            await setDoc(doc(db,"userChats", userDetail.user.uid), {});

            navigate("/home")
          }
          );
        }
      );
    } catch (err) {
      setErr(true);
      console.error(err);
    }
    
  };

  // ----- signIn with google ----- //
  const signInWithgoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((user) => {
        addDataToFirestore(user);
        navigate("/home");
      });
    } catch (err) {
      setErr(true);
      console.error(err);
    }
  };

  // ----- Add data tp forestore function ------//
  const addDataToFirestore = async (userDetails) => {
    // console.log("Created user:", userDetails.user.uid );
      const docRef = doc(db, "profiles", userDetails.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
      
      } else {
        await setDoc(doc(db, "profiles", userDetails.user.uid), {
          name: userName ? userName : userDetails.user.displayName,
          email: email ? email : userDetails.user.email,
          photoURL: userDetails.user.photoURL? userDetails.user.photoURL : null,
          phone: phone ? phone : null ,
          created: Timestamp.now(),
          userID : userDetails.user.uid
        }).then( async () => {
            await setDoc(doc(db,"userChats", userDetails.user.uid), {});
        })
      }
  };

  return (
    <div className=" min-h-screen   bg-[#524439] text-white   w-full z-0 flex justify-center items-center">
      <div className=" flex items-center  justify-center w-full flex-col   h-full  md:h-[80vh] md:justify-evenly">
        <h1 className=" font-bold text-5xl   ">Welcome!</h1>
        <div className="flex items-center  md:flex-row flex-col pt-[1.4rem] justify-center md:p-0 md:w-[80%]">
          <div className=" md:border-r-2 md:pr-12 w-full md:w-1/2">
            <p className=" text-lg">Please fill the information below :</p>
            <div className=" flex flex-col pt-8 md:w-[80%]">
              <label className=" font-semibold ">
                <input
                  required
                  className="text-white border-white-800 bg-transparent border-solid border-b-4 outline-none w-full h-8"
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setUserName(event.target.value)}
                />
              </label>
              <br />
              <label className=" font-semibold ">
                
                <input
                  required
                  aria-autocomplete="none"
                  autoComplete="none"
                  className=" border-white-800 bg-transparent border-solid border-b-4 outline-none w-full h-8"
                  type="text"
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <br />
              <label className=" font-semibold ">
                <input
                  required
                  aria-autocomplete="none"
                  autoComplete="none"
                  className=" border-white-800 bg-transparent border-solid border-b-4 outline-none w-full h-8 "
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <br />
              <label className=" font-semibold ">
                <input
                  required
                  aria-autocomplete="none"
                  autoComplete="none"
                  className=" border-white-800 bg-transparent border-solid border-b-4 outline-none w-full h-8 "
                  type="number"
                  placeholder="Phone number"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </label>

              <br />

              <button
                onClick={register}
                type="submit"
                className=" font-semibold text-lg p-3 p-{0.5rem} border rounded-md bg-green-500 text-white hover:bg-green-700 duration-150"
              >
                Continue
              </button>
            </div>
            {err ? <p className="text-red-600">*something went wrong</p> : null}
            {/* <div className=" mt-8 flex items-center justify-center">
              Already have an account?{" "}
              <button className=" text-green-500 hover:text-green-800">
                {" "}
                <Link to="/login"> &nbsp; log in</Link>{" "}
              </button>
            </div> */}
          </div>
          
          <h1 className=" md:hidden pt-[2rem] ">OR</h1>

          <div className="md:w-1/2 hidden  md:flex flex-col">
            <div className=" hidden   md:flex items-center justify-center mt-24 lg:my-8">
              <img
                className=" w-1/3 rounded-3xl sm:w-1/5 lg:w-1/6"
                src={logoWhite}
                alt=""
              />
            </div>
            <div className=" flex justify-center items-center my-10">
              <button
                onClick={signInWithgoogle}
                className=" text-lg font-semibold border border-gray-500 px-11 py-3 hover:border-black hover:bg-gray-500 duration-100 hover:text-black"
              >
                <FcGoogle className=" inline-block mx-2  " size={25} /> Continue
                with Google
              </button>
            </div>
          </div>
          <div className=" flex justify-center items-center my-10 md:hidden">
              <button
                onClick={signInWithgoogle}
                className=" text-lg font-semibold border border-gray-500 px-11 py-3 hover:border-black hover:bg-gray-500 duration-100 hover:text-black"
              >
                <FcGoogle className=" inline-block mx-2  " size={25} /> Continue
                with Google
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
