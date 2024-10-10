"use client";

import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [specialKey, setSpecialKey] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Optional: Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      const response = await axios.post('/api/signup', {
        username,
        password,
        specialKey,
      });

      setMessage(response.data.message); // Handle success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message || 'An error occurred while creating the account');
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Special Key"
        value={specialKey}
        onChange={(e) => setSpecialKey(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Create Account</button>
      {message && <p>{message}</p>}
    </form>
  );
}
