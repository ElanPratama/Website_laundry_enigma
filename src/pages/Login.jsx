import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginAPI() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Untuk navigasi

  const apiGet = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setMessage('');
  
    try {
      const response = await fetch('http://localhost:8010/proxy/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Kesalahan HTTP! status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json.data.token); // Lihat respons API
      const decode = jwtDecode(json.data.token)
      console.log({decode})
      console.log(decode.role)
      console.log(json.data)
      
      // Simpan token dan peran
        localStorage.setItem('token', json.data.token);
        localStorage.setItem('role', decode.role);
        
        setMessage('Login berhasil!');
        setSuccess(true);
        navigate(decode.role === 'admin' ? '/admin' : '/employee'); // Alihkan berdasarkan peran
       
      
    } catch (error) {
      console.error(error.message);
      setMessage('Login gagal. Silakan coba lagi.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Masuk ke akun Anda
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={apiGet}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pengguna</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kata Sandi</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {loading ? 'Memuat...' : 'Masuk'}
          </button>
          {error && <p className="text-red-500">{message}</p>}
          {success && <p className="text-green-500">{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default LoginAPI;
