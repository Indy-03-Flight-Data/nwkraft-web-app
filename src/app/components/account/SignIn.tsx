"use client";

import { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Optional: Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      const response = await axios.post('/api/signin', {
        username,
        password,
      });

      setMessage(response.data.message); // Handle success message
      // Handle successful sign-in (e.g., redirect or store user session)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message || 'An error occurred during sign-in');
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
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
      <button type="submit" disabled={loading}>Sign In</button>
      {message && <p>{message}</p>}
    </form>
  );
}