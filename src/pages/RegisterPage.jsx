import React from 'react';
import { use } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import Footer from '../components/Footer';
import { ArrowLeftIcon } from 'lucide-react';

const RegisterPage = () => {
  const { createUser, setUser, googleLogin, verifyEmail } = use(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const data = await createUser(email, password); // create user
      // Update the displayName in Firebase
      await updateProfile(data.user, { displayName: name });
      setUser(data.user);
      await verifyEmail();
      toast.success('Register Successful. Please verify your email.');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      setUser(result.user);
      toast.success('Login Successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="py-10 md:py-20 lg:py-30 px-4">
      <div className="max-w-md mx-auto bg-base-100 p-8 rounded-lg shadow-lg pb-10 relative">
        <Link to="/" className="btn btn-sm rounded-xs absolute left-0 top-0">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Home
        </Link>
        <h2 className="text-2xl font-bold mb-8 text-center mt-3">
          Create an account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered w-full mb-6"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-6"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <button className="btn btn-primary w-full my-4">Register</button>
        </form>
        <div className="divider">OR</div>
        <div className="flex justify-center">
          <button onClick={handleGoogleLogin} className="btn btn-active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="26"
              height="26"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Login with Google
          </button>
        </div>
        <p className="text-center mt-3 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
