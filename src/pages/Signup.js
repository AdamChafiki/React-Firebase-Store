import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/amazon-ar21.svg";
import { useRef } from "react";
import { auth, provider } from "../firebase/fireBaseConfig";
import { Toaster, toast } from "sonner";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Signup = (e) => {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPasssoword = useRef();

  const navigate = useNavigate();

  const handleGoogleAccount = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((data) => {
      navigate("/");
    });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const username = inputName.current.value;
    const email = inputEmail.current.value;
    const password = inputPasssoword.current.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set the user's display name and photoURL
      await updateProfile(userCredential.user, {
        displayName: username, // Replace with the user's actual name
        photoURL:
          "https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg", // Replace with the user's actual profile picture URL
      });
      toast("Accounted Created Successfully", { type: "success" });
      setTimeout(()=>{
        navigate("/login");
      },2000)

      // Rest of your code
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="auth container mx-auto p-3">
      <Toaster position="top-center" duration={2000} />
      <form className="flex flex-col space-y-8 w-1/2 mx-auto border-2 p-3 ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-44 mx-auto" />
        </Link>
        <div className="flex items-center border-2 p-2">
          <input
            type="text"
            placeholder="Username"
            ref={inputName}
            className="border-none w-full focus:outline-none p-2 text-base"
          />
        </div>
        <div className="flex items-center border-2 p-2">
          <input
            type="email"
            ref={inputEmail}
            placeholder="Email"
            className="border-none w-full focus:outline-none p-2 text-base"
          />
        </div>
        <div className="flex items-center border-2 p-2">
          <input
            ref={inputPasssoword}
            type="password"
            placeholder="Password"
            className="border-none w-full focus:outline-none p-2 text-base"
          />
        </div>
        <div className="w-1/2 flex flex-col mx-auto  space-y-6">
          <button
            onClick={handleCreateAccount}
            className="bg-yellow-500 hover:bg-yellow-400 w-full text-xl text-dark p-2 rounded-md"
          >
            Create Account
          </button>
          <span className="text-center">or</span>
          <button
            onClick={handleGoogleAccount}
            className="  flex items-center justify-center border-2 border-black bg-white  w-full text-xl text-black p-2 rounded-md"
          >
            Continue With <FcGoogle className="ms-2" />
          </button>
        </div>
        <div>
          <p className="text-center font-medium">
            Do you have an account already?
            <Link className="text-yellow-600 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Signup;
