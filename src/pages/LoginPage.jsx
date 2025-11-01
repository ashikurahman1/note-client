import { use } from 'react';
import { useNavigate, Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Footer from '../components/Footer';
import { ArrowLeftIcon } from 'lucide-react';

const LoginPage = () => {
  const { userLoginwithEmail, googleLogin, setUser } = use(AuthContext);
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false); // new state for checkbox

  const handleSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await userLoginwithEmail(email, password, remember); // pass remember
      const token = await result.user.getIdToken();

      localStorage.setItem('token', token); // store token separately
      if (remember) {
        localStorage.setItem('user', JSON.stringify(result.user)); // persist user if checked
      } else {
        localStorage.removeItem('user');
      }

      const res = await fetch('/api/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log(data);
      toast.success('Login Successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Invalid email or password');
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
    <div className="py-10 md:py-20 px-4 ">
      <div className="max-w-md mx-auto bg-base-100 p-8 shadow-lg pb-10 relative">
        <Link to="/" className="btn btn-sm rounded-xs absolute left-0 top-0">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Home
        </Link>

        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Remember Me checkbox */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="checkbox"
            />
            <span className="text-sm">Remember Me</span>
          </label>

          <button className="btn btn-primary w-full my-4">Login</button>
        </form>

        <div className="divider">OR</div>
        <div className="flex justify-center">
          <button onClick={handleGoogleLogin} className="btn btn-active">
            {/* Google SVG Icon */}
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
          Don’t have an account?{' '}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
