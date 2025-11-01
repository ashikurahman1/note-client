import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';

import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Loader2Icon } from 'lucide-react';
import Footer from '../components/Footer';

const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
      } catch (error) {
        console.log('Error Fetching', error);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error('Faild to load Notes..');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [user, authLoading]);

  if (loading || authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {rateLimited && <RateLimitedUI />}

      <main className="w-full lg:w-10/12 mx-auto p-4 m-6 flex-1">
        {user && (
          <div className="mb-8 text-center">
            <h1 className="text-xl md:text-2xl font-semibold">
              Welcome back,{' '}
              <span className="text-primary text-xl md:text-2xl">
                {user.displayName
                  ? user.displayName.split(' ').slice(0, 2).join(' ')
                  : user.email.split('@')[0]}
              </span>{' '}
            </h1>
            <p className="text-gray-500 mt-1">Here are your latest notes:</p>
          </div>
        )}

        {notes.length === 0 && !rateLimited && <NotesNotFound />}

        {notes.length > 0 && !rateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {notes.map((note, index) => (
              <NoteCard key={index} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
