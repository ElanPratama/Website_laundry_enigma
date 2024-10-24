import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Buat instance dari useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const registerData = {
      name: name,
      email: email,
      username: username,
      password: password,
      role: role,
    };
  
    try {
      const response = await fetch('http://localhost:8010/proxy/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
  
      const data = await response.json();
      console.log('Server Response:', data);
  
      if (response.ok) {
        setSuccess(`Registrasi berhasil! ID Pengguna: ${data.data.id}`);
        setError(''); // Reset pesan error jika berhasil

        // Arahkan pengguna ke halaman login setelah registrasi berhasil
        navigate('/login'); 
      } else {
        setError(data.status.description || 'Registrasi gagal. Cek kembali data Anda.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Terjadi kesalahan. Coba lagi nanti.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <div className="bg-green-200 p-4 rounded text-green-800"><p>{success}</p></div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm">Nama</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-200"
              required
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
