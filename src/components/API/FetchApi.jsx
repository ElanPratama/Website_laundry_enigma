import React, { useState } from 'react';

function LoginAPI() {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indication
  const [error, setError] = useState(false); // State for error indication
  const [success, setSuccess] = useState(false); // State for success indication

  const apiGet = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(false);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8010/proxy/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type'    : 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          username: username, // Use the username state
          password: password, // Use the password state
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setMessage('Login successful!'); // Update the message state on success
      setSuccess(true); // Set success state
    } catch (error) {
      console.error('Error:', error);
      setMessage('Login failed. Please try again.'); // Update the message state on error
      setError(true); // Set error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={apiGet}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                <input 
                  type="text" 
                  name="username" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update state on input change
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="username" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state on input change
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? 'Loading...' : 'Sign in'} {/* Change button text based on loading state */}
              </button>
              {error && <p className="text-red-500">{message}</p>} {/* Display error message if login failed */}
              {success && <p className="text-green-500">{message}</p>} {/* Display success message if login successful */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginAPI;
