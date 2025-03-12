import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [quote, setQuote] = useState(null);
  const navigate = useNavigate();

  const userAuthentication = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        {
          username,
          password,
          expiresInMins: 30,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log(response.data, 'API Response');

      if (response.data.accessToken) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/cards');
      } else {
        setError('Failed to authenticate. Please try again.');
      }
    } catch (error) {
      setError('Invalid username or password');
      console.error(error.response?.data || error, 'ERROR');
    }
  };

  const randomQuotes = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/quotes/random');
      console.log(response?.data, "check");
      setQuote(response?.data);
    } catch (error) {
      console.error(error, 'ERROR');
    }
  };

  useEffect(() => {
    randomQuotes();
  }, []);

  return (
    <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 h-full w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="self-start hidden lg:flex flex-col text-gray-300 mb-6">
          <h1 className="my-3 font-semibold text-4xl">Welcome</h1>
          {quote && (
            <>
              <p className="pr-3 text-sm opacity-75">{quote.quote}</p>
              <br />
              <p className="pr-3 text-sm opacity-75">:- {quote.author}</p>
            </>
          )}
        </div>

        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-full max-w-md">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
            </div>
            <form className="space-y-6" onSubmit={userAuthentication}>
              <div>
                <input
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="text-sm text-gray-900 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-100"></span>
                <span className="h-px w-16 bg-gray-100"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
