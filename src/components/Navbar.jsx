import React from 'react';
import { Link, useNavigate } from 'react-router';
import { PlusIcon } from 'lucide-react';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { auth } from '../firebase/firebase.config';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, userLogout, loading } = use(AuthContext);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast.success('Logout success!');
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="text-4xl font-bold text-primary font-mono tracking-tight"
            >
              Notes
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/create" className="btn btn-sm md:btn-md btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm md:btn-md btn-error"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
