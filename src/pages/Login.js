import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/amazon-ar21.svg";
import { useRef } from "react";
import { auth } from "../firebase/fireBaseConfig"; // Import your Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "sonner";


const Login = () => {
  const inputEmail = useRef();
  const inputPasssoword = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const email = inputEmail.current.value;
    const password = inputPasssoword.current.value;
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User has successfully logged in
      console.log(userCredential);
      navigate('/')
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unvailable Account!");
    }
  };

  return (
    <section className="auth container mx-auto p-3">
      <Toaster position="top-right"  richColors />
      <form className="flex flex-col space-y-8 w-1/2 mx-auto border-2 p-3 ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-44 mx-auto" />
        </Link>
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
            onClick={handleLogin}
            className="bg-yellow-500 hover:bg-yellow-400 w-full text-xl text-dark p-2 rounded-md"
          >
            Login To Your Account
          </button>
        </div>
        <div>
          <p className="text-center font-medium">
            Do you have an account already?
            <Link className="text-yellow-600 hover:underline" to="/signup">
              signUp
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
